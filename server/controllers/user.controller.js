import prisma from '../prisma/index.js';

const upsertUser = async (req, res) => {
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
};

const getProfile = async (req, res) => {
    const clerkUserId = req.auth.userId;
    try {
        const user = await prisma.user.findUnique({
            where: { clerkUserId },
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
};

export { upsertUser, getProfile };
