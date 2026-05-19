import express from 'express';
const router = express.Router();
import { ClerkExpressWithAuth, ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import { upsertUser, getProfile } from '../controllers/user.controller.js';

router.post('/upsert', ClerkExpressWithAuth(), upsertUser);
router.get('/profile', ClerkExpressRequireAuth(), getProfile);

export default router;
