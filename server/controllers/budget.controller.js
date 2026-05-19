import prisma from '../prisma/index.js';

const getBudgets = async (req, res) => {
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
};

const createOrUpdateBudget = async (req, res) => {
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
};

const deleteBudget = async (req, res) => {
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
};

export { getBudgets, createOrUpdateBudget, deleteBudget };
