import { Inngest } from "inngest";
import prisma from "../prisma/index.js";
import { Resend } from "resend";
import { GoogleGenAI } from "@google/genai";

const resend = new Resend(process.env.RESEND_API_KEY);

export const inngest = new Inngest({ id: "my-app" });

// 1. Cron Dispatcher Function
const weeklyMarketingCron = inngest.createFunction(
    {
        id: "weekly-marketing-cron",
        name: "Marketing Cron Dispatcher",
        triggers: [{ cron: "0 9 * * *" }] // Every day at 9 AM
    },
    async ({ step }) => {
        const users = await step.run("fetch-users", async () => {
            return prisma.user.findMany({
                select: {
                    clerkUserId: true,
                    email: true
                }
            });
        });

        const events = users.map((user) => ({
            name: "marketing/send.email",
            data: {
                userId: user.clerkUserId,
                email: user.email
            }
        }));

        if (events.length > 0) {
            await step.sendEvent("dispatch-emails", events);
        }

        return { dispatched: events.length };
    }
);

// 2. Individual Marketing Email Sender (Gemini + Resend)
const sendIndividualMarketingEmail = inngest.createFunction(
    {
        id: "send-individual-marketing-email",
        name: "Send Individual Marketing Email",
        triggers: [{ event: "marketing/send.email" }]
    },
    async ({ event, step }) => {
        const { userId, email } = event.data;

        // Step 2.1: Fetch user transaction & budget statistics
        const stats = await step.run("fetch-user-stats", async () => {
            const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1;
            const currentYear = currentDate.getFullYear();
            const startOfMonth = new Date(currentYear, currentMonth - 1, 1);

            const user = await prisma.user.findUnique({
                where: { clerkUserId: userId }
            });

            if (!user) {
                throw new Error(`User not found: ${userId}`);
            }

            // Get transactions for last 7 days (weekly report)
            const transactions = await prisma.transaction.findMany({
                where: {
                    userId: userId,
                    date: { gte: lastWeek }
                },
                include: {
                    category: true
                }
            });

            // Get monthly budgets
            const budgets = await prisma.budget.findMany({
                where: {
                    userId: userId,
                    month: currentMonth,
                    year: currentYear
                },
                include: {
                    category: true
                }
            });

            // Get month transactions to calculate budget progress
            const monthTransactions = await prisma.transaction.findMany({
                where: {
                    userId: userId,
                    date: { gte: startOfMonth }
                },
                include: {
                    category: true
                }
            });

            // Compute statistics
            const totalSpent = transactions
                .filter(t => t.type === "EXPENSE")
                .reduce((sum, t) => sum + Number(t.amount), 0);

            const totalIncome = transactions
                .filter(t => t.type === "INCOME")
                .reduce((sum, t) => sum + Number(t.amount), 0);

            const topCategories = transactions
                .filter(t => t.type === "EXPENSE")
                .reduce((acc, t) => {
                    const catName = t.category.name;
                    acc[catName] = (acc[catName] || 0) + Number(t.amount);
                    return acc;
                }, {});

            // Calculate budget status
            const monthExpensesByCategory = monthTransactions
                .filter(t => t.type === "EXPENSE")
                .reduce((acc, t) => {
                    const catName = t.category.name;
                    acc[catName] = (acc[catName] || 0) + Number(t.amount);
                    return acc;
                }, {});

            const budgetStatus = budgets.map(b => {
                const spent = monthExpensesByCategory[b.category.name] || 0;
                const limit = Number(b.amount);
                return {
                    category: b.category.name,
                    limit,
                    spent,
                    exceeded: spent > limit
                };
            });

            return {
                userName: user.name || "there",
                currency: user.currency || "USD",
                totalSpent,
                totalIncome,
                netSaved: totalIncome - totalSpent,
                topCategories,
                budgetStatus,
                transactionCount: transactions.length
            };
        });

        // Step 2.2: Call Gemini to write the creative email
        const emailContent = await step.run("generate-creative-email", async () => {
            const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
            
            const prompt = `
                You are a witty, supportive, and creative financial copywriter for Synex, a personal finance tracking platform.
                Analyze the following weekly financial summary for a user named "${stats.userName}":
                - Total Spent: ${stats.totalSpent} ${stats.currency}
                - Total Income: ${stats.totalIncome} ${stats.currency}
                - Net Saved: ${stats.netSaved} ${stats.currency}
                - Weekly Category Breakdown: ${JSON.stringify(stats.topCategories)}
                - Monthly Budgets Status: ${JSON.stringify(stats.budgetStatus)}
                - Number of transactions logged: ${stats.transactionCount}
                
                Generate a weekly summary email. 
                - If they saved money (netSaved > 0), celebrate their discipline with high energy and creative humor.
                - If they spent more than they earned, provide a gentle, supportive, and motivating nudge (no shaming!).
                - If they exceeded any budgets, highlight it clearly and offer actionable tips to rein in spending.
                - If they logged 0 transactions, send a playful reactivation nudge to start tracking again.
                
                Keep the tone modern, friendly, and startup-like.
                Respond ONLY with a JSON object matching this schema:
                {
                  "subject": "A creative, personalized subject line containing emojis",
                  "html": "A beautiful, responsive HTML email body with inline CSS using professional deep-blue/purple fintech styling. Include the summary details in a visually appealing card."
                }
            `;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    responseMimeType: "application/json"
                }
            });

            try {
                return JSON.parse(response.text);
            } catch (err) {
                console.error("Failed to parse Gemini JSON output:", response.text);
                throw new Error("Invalid JSON format from Gemini API");
            }
        });

        // Step 2.3: Send the email using Resend
        await step.run("send-email", async () => {
            const { data, error } = await resend.emails.send({
                from: "Synex <onboarding@agents.unzap.xyz>",
                to: [email],
                subject: emailContent.subject,
                html: emailContent.html
            });

            if (error) {
                throw new Error(`Resend failed: ${JSON.stringify(error)}`);
            }

            return data;
        });

        return { success: true, emailSentTo: email };
    }
);

// Add the functions to the exported array:
export const functions = [
    weeklyMarketingCron,
    sendIndividualMarketingEmail
];