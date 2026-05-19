import prisma from '../prisma/index.js';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const getTransactions = async (req, res) => {
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
};

const createTransaction = async (req, res) => {
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

        // Email sending logic
        try {
            // Get user's email
            const user = await prisma.user.findUnique({
                where: { clerkUserId }
            });

            if (user && user.email) {
                const now = new Date();
                const currentMonth = now.getMonth() + 1;
                const currentYear = now.getFullYear();
                const startOfMonth = new Date(currentYear, currentMonth - 1, 1);
                const endOfMonth = new Date(currentYear, currentMonth, 1);

                // Month's summary
                const monthlyTransactions = await prisma.transaction.findMany({
                    where: {
                        userId: clerkUserId,
                        date: { gte: startOfMonth, lt: endOfMonth }
                    }
                });

                let monthIncome = 0;
                let monthExpense = 0;
                monthlyTransactions.forEach(t => {
                    if (t.type === 'INCOME') monthIncome += Number(t.amount);
                    if (t.type === 'EXPENSE') monthExpense += Number(t.amount);
                });

                // Budget remaining for this category
                const categoryBudget = await prisma.budget.findFirst({
                    where: {
                        userId: clerkUserId,
                        categoryId: finalCategoryId,
                        month: currentMonth,
                        year: currentYear
                    }
                });

                let budgetRemainingHtml = '';
                if (categoryBudget) {
                    let categorySpent = 0;
                    monthlyTransactions.forEach(t => {
                        if (t.categoryId === finalCategoryId && t.type === 'EXPENSE') {
                            categorySpent += Number(t.amount);
                        }
                    });
                    const remaining = Number(categoryBudget.amount) - categorySpent;
                    budgetRemainingHtml = `<p><strong>Category Budget Remaining:</strong> ${remaining < 0 ? 0 : remaining} ${user.currency || 'USD'} (out of ${Number(categoryBudget.amount)} ${user.currency || 'USD'})</p>`;
                }

                const transactionDate = new Date(transaction.date).toLocaleDateString();

                await resend.emails.send({
                    from: "Synex <onboarding@agents.unzap.xyz>",
                    to: [user.email],
                    subject: `New Transaction Added: ${transaction.title}`,
                    html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
                            <h2 style="color: #333;">Transaction Added Successfully!</h2>
                            <p>Hi ${user.name || 'there'},</p>
                            <p>You have successfully added a new transaction to your Synex account.</p>
                            
                            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 6px; margin: 20px 0;">
                                <h3 style="margin-top: 0; color: #555;">Transaction Details</h3>
                                <p><strong>Title:</strong> ${transaction.title}</p>
                                <p><strong>Amount:</strong> ${transaction.amount} ${user.currency || 'USD'}</p>
                                <p><strong>Type:</strong> ${transaction.type}</p>
                                <p><strong>Date:</strong> ${transactionDate}</p>
                                <p><strong>Payment Method:</strong> ${transaction.paymentMethod}</p>
                            </div>

                            ${budgetRemainingHtml}

                            <div style="background-color: #f0f7ff; padding: 15px; border-radius: 6px; margin: 20px 0;">
                                <h3 style="margin-top: 0; color: #0056b3;">This Month's Overview</h3>
                                <p><strong>Total Income:</strong> ${monthIncome} ${user.currency || 'USD'}</p>
                                <p><strong>Total Expenses:</strong> ${monthExpense} ${user.currency || 'USD'}</p>
                                <p><strong>Net Balance:</strong> ${monthIncome - monthExpense} ${user.currency || 'USD'}</p>
                            </div>

                            <p style="color: #777; font-size: 12px; margin-top: 30px;">
                                Thank you for using Synex to track your finances!
                            </p>
                        </div>
                    `
                });
            }
        } catch (emailError) {
            console.error("Failed to send transaction email:", emailError);
        }

        res.json(transaction);
    } catch (error) {
        console.error("Transaction Error:", error);
        res.status(500).json({ error: 'Failed to create transaction' });
    }
};

const deleteTransaction = async (req, res) => {
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
};

export { getTransactions, createTransaction, deleteTransaction };
