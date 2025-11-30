import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import MailService from "../services/mailService";
import {
  sendEmailValidator,
  sendEmailVerificationEmailValidator,
  sendPasswordResetEmailValidator,
  sendPasswordResetUpdateEmailValidator,
  sendWelcomeEmailValidator,
} from "../validators/mailValidators";
import z from "zod";

export const sendEmail = async (req: Request, res: Response): Promise<Response> => {
  const validatedData = sendEmailValidator.safeParse(req.body);

  if (!validatedData.success) {
    return res.status(400).json({
      message: validatedData.error.message,
      errors: z.treeifyError(validatedData.error),
    });
  }

  const { to, subject, text, html } = validatedData.data;
  const mailService = new MailService();

  try {
    const info = await mailService.sendEmail({ to, subject, text, html });
    return res.status(200).json({ message: "Email sent successfully", info });
  } catch (error) {
    return res.status(500).json({ message: "Error sending email", error });
  }
};

export const sendWelcomeEmail = async (req: Request, res: Response): Promise<Response> => {
  const validatedData = sendWelcomeEmailValidator.safeParse(req.body);

  if (!validatedData.success) {
    return res.status(400).json({
      message: validatedData.error.message,
      errors: z.treeifyError(validatedData.error),
    });
  }

  const { to, username } = validatedData.data;

  let html = fs.readFileSync(path.join(__dirname, "../", "static/signup-welcome.html"), "utf8");

  html = html.replace("{{USERNAME}}", username);
  html = html.replace("{{DASHBOARD_LINK}}", `${process.env.FRONTEND_URL}/dashboard`);

  const subject = "Welcome to AmbitiousYou!";
  const text = `Welcome to AmbitiousYou! You're just one step away from achieving your ambitions. Please click the button below to get started`;

  const mailService = new MailService();

  try {
    const info = await mailService.sendEmail({ to, subject, text, html });
    return res.status(200).json({ message: "Email sent successfully", info });
  } catch (error) {
    return res.status(500).json({ message: "Error sending email", error });
  }
};

export const sendEmailVerificationEmail = async (req: Request, res: Response): Promise<Response> => {
  const validatedData = sendEmailVerificationEmailValidator.safeParse(req.body);

  if (!validatedData.success) {
    return res.status(400).json({
      message: validatedData.error.message,
      errors: z.treeifyError(validatedData.error),
    });
  }

  const { to, username, verificationLink } = validatedData.data;

  let html = fs.readFileSync(path.join(__dirname, "../", "static/verify-email.html"), "utf8");

  html = html.replace("{{USERNAME}}", username);
  html = html.replace("{{VERIFICATION_LINK}}", verificationLink);

  const subject = "Verify Your Email for AmbitiousYou!";
  const text = `Thank you for using AmbitiousYou! You're just one step away from achieving your ambitions. Please click the button below to verify your email and get started: ${verificationLink}`;

  const mailService = new MailService();

  try {
    const info = await mailService.sendEmail({ to, subject, text, html });
    return res.status(200).json({ message: "Email sent successfully", info });
  } catch (error) {
    return res.status(500).json({ message: "Error sending email", error });
  }
};

export const sendPasswordResetEmail = async (req: Request, res: Response): Promise<Response> => {
  const validatedData = sendPasswordResetEmailValidator.safeParse(req.body);

  if (!validatedData.success) {
    return res.status(400).json({
      message: validatedData.error.message,
      errors: z.treeifyError(validatedData.error),
    });
  }

  const { to, username, passwordResetLink } = validatedData.data;

  let html = fs.readFileSync(path.join(__dirname, "../", "static/password-reset-verification.html"), "utf8");

  html = html.replace("{{USERNAME}}", username);
  html = html.replace("{{PASSWORD_RESET_LINK}}", passwordResetLink);

  const subject = "Reset Your Password for AmbitiousYou!";
  const text = `You're receiving this email because you requested a password reset for your AmbitiousYou account. Please click the button below to reset your password: ${passwordResetLink}`;

  const mailService = new MailService();

  try {
    const info = await mailService.sendEmail({ to, subject, text, html });
    return res.status(200).json({ message: "Email sent successfully", info });
  } catch (error) {
    return res.status(500).json({ message: "Error sending email", error });
  }
};

export const sendPasswordResetUpdateEmail = async (req: Request, res: Response): Promise<Response> => {
  const validatedData = sendPasswordResetUpdateEmailValidator.safeParse(req.body);

  if (!validatedData.success) {
    return res.status(400).json({
      message: validatedData.error.message,
      errors: z.treeifyError(validatedData.error),
    });
  }

  const { to, username } = validatedData.data;
  let html = fs.readFileSync(path.join(__dirname, "../", "static/password-reset-verification-update.html"), "utf8");

  html = html.replace("{{USERNAME}}", username);

  const subject = "Password Reset Successfully!";
  const text = `Your password has been reset successfully. Please click the button below to login: ${process.env.FRONTEND_URL}/login`;

  const mailService = new MailService();
  try {
    const success = await mailService.sendEmail({ to, subject, text, html });
    if (success) {
      return res.status(200).json({ message: "Email sent successfully" });
    } else {
      return res.status(500).json({ message: "Error sending email" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error sending email", error });
  }
};
