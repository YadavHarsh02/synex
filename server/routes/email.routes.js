import express from 'express';
const router = express.Router();
import { sendEmail, sendWelcomeEmail } from '../controllers/email.controller.js';

router.post('/', sendEmail);
router.post('/welcome', sendWelcomeEmail);

export default router;
