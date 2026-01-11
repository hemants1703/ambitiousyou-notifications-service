import { Router } from "express";
import {
  sendEmail,
  sendEmailVerificationEmail,
  sendPasswordResetLinkEmail,
  sendPasswordResetConfirmationEmail,
  sendWelcomeEmail,
  sendPasswordUpdateConfirmationEmail,
} from "../controllers/mailController";

const router = Router();

router.post("/send", sendEmail);
router.post("/send-welcome", sendWelcomeEmail);
router.post("/send-email-verification", sendEmailVerificationEmail);

// Password Reset
router.post("/send-password-reset-link", sendPasswordResetLinkEmail);
router.post("/send-password-reset-confirmation", sendPasswordResetConfirmationEmail);

// Password Update
router.post("/send-password-update-confirmation", sendPasswordUpdateConfirmationEmail);

export default router;
