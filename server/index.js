require('dotenv').config();
require('dotenv').config({ path: '.env.local', override: true });
const express = require('express');
const cors = require('cors');
const { ClerkExpressWithAuth, ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');
const prisma = require('./prisma');

const app = express();
const PORT = process.env.PORT || 8000;

console.log('Clerk Key Loaded:', !!process.env.CLERK_SECRET_KEY);

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Routes

// 1. User Profile / Onboarding
app.post('/api/user/upsert', ClerkExpressWithAuth(), async (req, res) => {
    if (!req.auth || !req.auth.userId) {
        return res.status(401).json({ error: 'Unauthorized', detail: 'No userId in auth' });
    }
    const clerkUserId = req.auth.userId;
    const { email, name, currency } = req.body;

    try {
        const user = await prisma.user.upsert({
            where: { clerkUserId },
            update: {
                email,
                name,
                currency: currency || undefined,
                onboardingCompleted: currency ? true : undefined
            },
            create: {
                clerkUserId,
                email,
                name,
                currency: currency || 'USD',
                onboardingCompleted: !!currency
            },
        });
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to upsert user' });
    }
});

app.get('/api/user/profile', ClerkExpressRequireAuth(), async (req, res) => {
    const clerkUserId = req.auth.userId;
    try {
        const user = await prisma.user.findUnique({
            where: { clerkUserId },
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
});

// 2. Transactions
app.get('/api/transactions', ClerkExpressRequireAuth(), async (req, res) => {
    const clerkUserId = req.auth.userId;
    try {
        const transactions = await prisma.transaction.findMany({
            where: { user: { clerkUserId } },
            orderBy: { date: 'desc' },
            include: { category: true }
        });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
});

app.post('/api/transactions', ClerkExpressRequireAuth(), async (req, res) => {
    const clerkUserId = req.auth.userId;
    const { title, amount, type, categoryId, date, note, paymentMethod, recurring } = req.body;

    try {
        let finalCategoryId = categoryId;

        // Map frontend payment method to database PaymentMethod enum
        const mappedPaymentMethod = {
            'CASH': 'CASH',
            'CREDIT_CARD': 'CREDIT_CARD',
            'DEBIT_CARD': 'DEBIT_CARD',
            'BANK_TRANSFER': 'BANK_TRANSFER',
            'CRYPTO': 'CRYPTO',
            'OTHER': 'OTHER',
            'CREDIT CARD': 'CREDIT_CARD',
            'DEBIT CARD': 'DEBIT_CARD',
            'BANK TRANSFER': 'BANK_TRANSFER',
            'APPLE PAY': 'OTHER',
            'PAYPAL': 'OTHER'
        }[(paymentMethod || 'CASH').toUpperCase().trim()] || 'OTHER';

        // If no categoryId provided, find or create a "General" category for the user
        if (!finalCategoryId) {
            const category = await prisma.category.upsert({
                where: {
                    name_userId: {
                        name: 'General',
                        userId: clerkUserId
                    }
                },
                update: {},
                create: {
                    name: 'General',
                    type: type || 'EXPENSE',
                    userId: clerkUserId
                }
            });
            finalCategoryId = category.id;
        }

        const transaction = await prisma.transaction.create({
            data: {
                title,
                amount,
                type,
                date: new Date(date),
                note,
                paymentMethod: mappedPaymentMethod,
                isRecurring: !!recurring,
                user: { connect: { clerkUserId } },
                category: { connect: { id: finalCategoryId } }
            }
        });
        res.json(transaction);
    } catch (error) {
        console.error("Transaction Error:", error);
        res.status(500).json({ error: 'Failed to create transaction' });
    }
});

// 3. Budgets
app.get('/api/budgets', ClerkExpressRequireAuth(), async (req, res) => {
    const clerkUserId = req.auth.userId;
    try {
        const budgets = await prisma.budget.findMany({
            where: { user: { clerkUserId } },
            include: { category: true }
        });
        res.json(budgets);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch budgets' });
    }
});

// 4. Analytics / Dashboard
app.get('/api/analytics/summary', ClerkExpressRequireAuth(), async (req, res) => {
    const clerkUserId = req.auth.userId;
    try {
        const transactions = await prisma.transaction.findMany({
            where: { user: { clerkUserId } }
        });

        const totalIncome = transactions
            .filter(t => t.type === 'INCOME')
            .reduce((sum, t) => sum + Number(t.amount), 0);

        const totalExpense = transactions
            .filter(t => t.type === 'EXPENSE')
            .reduce((sum, t) => sum + Number(t.amount), 0);

        res.json({
            totalBalance: totalIncome - totalExpense,
            totalIncome,
            totalExpense,
            transactionCount: transactions.length
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch analytics' });
    }
});

app.get('/api/analytics/trends', ClerkExpressRequireAuth(), async (req, res) => {
  const clerkUserId = req.auth.userId;
  try {
    const transactions = await prisma.transaction.findMany({
      where: { user: { clerkUserId } },
      orderBy: { date: 'asc' }
    });

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const trendMap = {};

    transactions.forEach(t => {
      const date = new Date(t.date);
      const monthName = months[date.getMonth()];
      
      if (!trendMap[monthName]) {
        trendMap[monthName] = { name: monthName, income: 0, expense: 0 };
      }

      if (t.type === 'INCOME') {
        trendMap[monthName].income += Number(t.amount);
      } else {
        trendMap[monthName].expense += Number(t.amount);
      }
    });

    res.json(Object.values(trendMap));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trends' });
  }
});

// 5. Categories
app.get('/api/categories', ClerkExpressRequireAuth(), async (req, res) => {
    const clerkUserId = req.auth.userId;
    try {
        const categories = await prisma.category.findMany({
            where: {
                OR: [
                    { userId: clerkUserId },
                    { userId: null } // System-wide default categories
                ]
            }
        });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

// 6. Create / Update Budget
app.post('/api/budgets', ClerkExpressRequireAuth(), async (req, res) => {
    const clerkUserId = req.auth.userId;
    const { amount, categoryId, month, year } = req.body;

    try {
        const budget = await prisma.budget.upsert({
            where: {
                userId_categoryId_month_year: {
                    userId: clerkUserId,
                    categoryId,
                    month: parseInt(month),
                    year: parseInt(year)
                }
            },
            update: {
                amount: parseFloat(amount)
            },
            create: {
                amount: parseFloat(amount),
                month: parseInt(month),
                year: parseInt(year),
                user: { connect: { clerkUserId } },
                category: { connect: { id: categoryId } }
            },
            include: { category: true }
        });
        res.json(budget);
    } catch (error) {
        console.error("Budget save error:", error);
        res.status(500).json({ error: 'Failed to save budget' });
    }
});

// 7. Delete Transaction
app.delete('/api/transactions/:id', ClerkExpressRequireAuth(), async (req, res) => {
    const clerkUserId = req.auth.userId;
    const { id } = req.params;

    try {
        const tx = await prisma.transaction.findUnique({
            where: { id }
        });

        if (!tx || tx.userId !== clerkUserId) {
            return res.status(404).json({ error: 'Transaction not found or unauthorized' });
        }

        await prisma.transaction.delete({
            where: { id }
        });

        res.json({ success: true, message: 'Transaction deleted successfully' });
    } catch (error) {
        console.error("Transaction delete error:", error);
        res.status(500).json({ error: 'Failed to delete transaction' });
    }
});

// 8. Delete Budget
app.delete('/api/budgets/:id', ClerkExpressRequireAuth(), async (req, res) => {
    const clerkUserId = req.auth.userId;
    const { id } = req.params;

    try {
        const budget = await prisma.budget.findUnique({
            where: { id }
        });

        if (!budget || budget.userId !== clerkUserId) {
            return res.status(404).json({ error: 'Budget not found or unauthorized' });
        }

        await prisma.budget.delete({
            where: { id }
        });

        res.json({ success: true, message: 'Budget deleted successfully' });
    } catch (error) {
        console.error("Budget delete error:", error);
        res.status(500).json({ error: 'Failed to delete budget' });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'healthy' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
