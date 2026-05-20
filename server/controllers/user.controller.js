import prisma from '../prisma/index.js';
import { sendWelcomeEmailInternal } from './email.controller.js';

const upsertUser = async (req, res) => {
    console.log('Incoming headers:', req.headers);
    console.log('Incoming auth:', req.auth);
    if (!req.auth || !req.auth.userId) {
        return res.status(401).json({ error: 'Unauthorized', detail: 'No userId in auth' });
    }
    const clerkUserId = req.auth.userId;
    const { email, name, currency } = req.body;

    try {
        const existingUser = await prisma.user.findUnique({
            where: { clerkUserId }
        });
        const isNewUser = !existingUser;

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

        if (isNewUser && email) {
            sendWelcomeEmailInternal(email).catch((error) => {
                console.error('Failed to send welcome email to new user:', error);
            });
        }

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
