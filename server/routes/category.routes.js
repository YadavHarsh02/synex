import express from 'express';
const router = express.Router();
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import { getCategories } from '../controllers/category.controller.js';

router.get('/', ClerkExpressRequireAuth(), getCategories);

export default router;
