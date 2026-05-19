import express from 'express';
const router = express.Router();
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import { getBudgets, createOrUpdateBudget, deleteBudget } from '../controllers/budget.controller.js';

router.get('/', ClerkExpressRequireAuth(), getBudgets);
router.post('/', ClerkExpressRequireAuth(), createOrUpdateBudget);
router.delete('/:id', ClerkExpressRequireAuth(), deleteBudget);

export default router;
