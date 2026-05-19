import dotenv from 'dotenv';
dotenv.config();
dotenv.config({ path: '.env.local', override: true });
import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = process.env.PORT || 8000;

console.log('Clerk Key Loaded:', !!process.env.CLERK_SECRET_KEY);

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
const ai = new GoogleGenAI({});

// Routes
import userRoutes from './routes/user.routes.js';
import transactionRoutes from './routes/transaction.routes.js';
import budgetRoutes from './routes/budget.routes.js';
import analyticsRoutes from './routes/analytics.routes.js';
import categoryRoutes from './routes/category.routes.js';
import emailRoutes from './routes/email.routes.js';
import { serve } from 'inngest/express';
import { inngest, functions } from './inngest/index.js';

app.use('/api/user', userRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/send-email', emailRoutes);
app.use(
    "/api/inngest",
    serve({
        client: inngest,
        functions,
    })
);


// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'healthy' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
