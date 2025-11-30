import { Router } from "express";
import {
  sendEmail,
  sendEmailVerificationEmail,
  sendPasswordResetEmail,
  sendPasswordResetUpdateEmail,
  sendWelcomeEmail,
} from "../controllers/mailController";

const router = Router();

router.post("/send", sendEmail);
router.post("/send-welcome", sendWelcomeEmail);

// Password Reset
router.post("/send-password-reset", sendPasswordResetEmail);
router.post("/send-password-reset-update", sendPasswordResetUpdateEmail);

router.post("/send-email-verification", sendEmailVerificationEmail);
export default router;
