import z from "zod";

export const sendEmailValidator = z.object({
  address: z.email(),
  // displayName: z.string().min(1),
  subject: z.string().min(1),
  plainText: z.string().min(1),
});

export const sendWelcomeEmailValidator = z.object({
  address: z.email(),
  username: z.string().min(1),
});

export const sendEmailVerificationEmailValidator = z.object({
  address: z.email(),
  username: z.string().min(1),
  verificationLink: z.string().url(),
});

export const sendPasswordResetEmailValidator = z.object({
  address: z.email(),
  username: z.string().min(1),
  passwordResetLink: z.string().min(1),
});

export const sendPasswordResetUpdateEmailValidator = z.object({
  address: z.email(),
  username: z.string().min(1),
});

export const sendPasswordUpdateConfirmationEmailValidator = z.object({
  address: z.email(),
  username: z.string().min(1),
});
