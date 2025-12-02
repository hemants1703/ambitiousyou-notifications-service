import z from "zod";

export const sendEmailValidator = z.object({
  to: z.email(),
  subject: z.string().min(1),
  text: z.string().min(1),
  html: z.string().min(1),
});

export const sendWelcomeEmailValidator = z.object({
  to: z.email(),
  username: z.string().min(1),
});

export const sendEmailVerificationEmailValidator = z.object({
  to: z.email(),
  username: z.string().min(1),
  verificationLink: z.string().url(),
});

export const sendPasswordResetEmailValidator = z.object({
  to: z.email(),
  username: z.string().min(1),
  passwordResetLink: z.string().min(1),
});

export const sendPasswordResetUpdateEmailValidator = z.object({
  to: z.email(),
  username: z.string().min(1),
});

export const sendPasswordUpdateConfirmationEmailValidator = z.object({
  to: z.email(),
  username: z.string().min(1),
});
