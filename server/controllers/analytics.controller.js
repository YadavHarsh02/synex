import prisma from '../prisma/index.js';

const getSummary = async (req, res) => {
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
};

const getTrends = async (req, res) => {
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
};

export { getSummary, getTrends };
