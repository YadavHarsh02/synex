import express from 'express';
const router = express.Router();
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import { getTransactions, createTransaction, deleteTransaction } from '../controllers/transaction.controller.js';

router.get('/', ClerkExpressRequireAuth(), getTransactions);
router.post('/', ClerkExpressRequireAuth(), createTransaction);
router.delete('/:id', ClerkExpressRequireAuth(), deleteTransaction);

export default router;
