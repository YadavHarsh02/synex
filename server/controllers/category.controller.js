import prisma from '../prisma/index.js';

const getCategories = async (req, res) => {
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
};

export { getCategories };
