import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import z from "zod";
import AzureMailService from "../services/azureMailService";
import {
  sendEmailValidator,
  sendEmailVerificationEmailValidator,
  sendPasswordResetEmailValidator,
  sendPasswordResetUpdateEmailValidator,
  sendPasswordUpdateConfirmationEmailValidator,
  sendWelcomeEmailValidator,
} from "../validators/mailValidators";

export const sendEmail = async (req: Request, res: Response): Promise<Response> => {
  const validatedData = sendEmailValidator.safeParse(req.body);

  if (!validatedData.success) {
    return res.status(400).json({
      message: validatedData.error.message,
      errors: z.treeifyError(validatedData.error),
    });
  }

  const { address, subject, plainText } = validatedData.data;
  const azureMailService = new AzureMailService();

  try {
    const info = await azureMailService.sendEmail(address, subject, plainText);
    if (info instanceof Error) throw new Error(info.message);
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

  const { address, username } = validatedData.data;

  let html = fs.readFileSync(path.join(__dirname, "../", "static/signup-welcome.html"), "utf8");

  html = html.replace("{{USERNAME}}", username);
  html = html.replace("{{DASHBOARD_LINK}}", `${process.env.FRONTEND_URL}/dashboard`);

  const subject = "Welcome to AmbitiousYou!";
  const text = `Welcome to AmbitiousYou! You're just one step away from achieving your ambitions. Please click the button below to get started`;

  const azureMailService = new AzureMailService();

  try {
    const info = await azureMailService.sendHtmlEmail(address, subject, html);
    return res.status(200).json({ message: "Email sent successfully", info });
  } catch (error) {
    return res.status(500).json({ message: "Error sending email", error });
  }
};

export const sendEmailVerificationEmail = async (req: Request, res: Response): Promise<Response> => {
  console.log("sendEmailVerificationEmail");
  console.log(req.body);

  const validatedData = sendEmailVerificationEmailValidator.safeParse(req.body);

  if (!validatedData.success) {
    return res.status(400).json({
      message: validatedData.error.message,
      errors: z.treeifyError(validatedData.error),
    });
  }

  const { address, username, verificationLink } = validatedData.data;

  let html = fs.readFileSync(path.join(__dirname, "../", "static/verify-email.html"), "utf8");

  html = html.replace("{{USERNAME}}", username);
  html = html.replace("{{VERIFICATION_LINK}}", verificationLink);

  const subject = "Verify Your Email for AmbitiousYou!";
  const text = `Thank you for using AmbitiousYou! You're just one step away from achieving your ambitions. Please click the button below to verify your email and get started: ${verificationLink}`;

  const azureMailService = new AzureMailService();

  try {
    const info = await azureMailService.sendHtmlEmail(address, subject, html);
    return res.status(200).json({ message: "Email sent successfully", info });
  } catch (error) {
    return res.status(500).json({ message: "Error sending email", error });
  }
};

export const sendPasswordResetLinkEmail = async (req: Request, res: Response): Promise<Response> => {
  const validatedData = sendPasswordResetEmailValidator.safeParse(req.body);

  if (!validatedData.success) {
    return res.status(400).json({
      message: validatedData.error.message,
      errors: z.treeifyError(validatedData.error),
    });
  }

  const { address, username, passwordResetLink } = validatedData.data;

  let html = fs.readFileSync(path.join(__dirname, "../", "static/password-reset.html"), "utf8");

  html = html.replace("{{USERNAME}}", username);
  html = html.replace("{{RESET_LINK_BUTTON}}", passwordResetLink);
  html = html.replace("{{RESET_LINK}}", passwordResetLink);

  const subject = "Reset Your Password for AmbitiousYou!";
  const text = `You're receiving this email because you requested a password reset for your AmbitiousYou account. Please click the button below to reset your password: ${passwordResetLink}`;

  const azureMailService = new AzureMailService();

  try {
    const info = await azureMailService.sendHtmlEmail(address, subject, html);
    return res.status(200).json({ message: "Email sent successfully", info });
  } catch (error) {
    return res.status(500).json({ message: "Error sending email", error });
  }
};

export const sendPasswordResetConfirmationEmail = async (req: Request, res: Response): Promise<Response> => {
  const validatedData = sendPasswordResetUpdateEmailValidator.safeParse(req.body);

  if (!validatedData.success) {
    return res.status(400).json({
      message: validatedData.error.message,
      errors: z.treeifyError(validatedData.error),
    });
  }

  const { address, username } = validatedData.data;
  let html = fs.readFileSync(path.join(__dirname, "../", "static/password-reset-verification-update.html"), "utf8");

  html = html.replace("{{USERNAME}}", username);
  html = html.replace("{{LOGIN_LINK}}", `${process.env.FRONTEND_URL}/login`);

  const subject = "Password Reset Successfully!";
  const text = `Your password has been reset successfully. Please click the button below to login: ${process.env.FRONTEND_URL}/login`;

  const azureMailService = new AzureMailService();
  try {
    const success = await azureMailService.sendHtmlEmail(address, subject, html);
    if (success) {
      return res.status(200).json({ message: "Email sent successfully" });
    } else {
      return res.status(500).json({ message: "Error sending email" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error sending email", error });
  }
};

export const sendPasswordUpdateConfirmationEmail = async (req: Request, res: Response): Promise<Response> => {
  const validatedData = sendPasswordUpdateConfirmationEmailValidator.safeParse(req.body);

  if (!validatedData.success) {
    return res.status(400).json({
      message: validatedData.error.message,
      errors: z.treeifyError(validatedData.error),
    });
  }

  const { address, username } = validatedData.data;
  let html = fs.readFileSync(path.join(__dirname, "../", "static/password-update-confirmation.html"), "utf8");

  html = html.replace("{{USERNAME}}", username);

  const subject = "Password Updated Successfully!";
  const text = `Your password has been updated successfully. Please click the button below to login: ${process.env.FRONTEND_URL}/login`;

  const azureMailService = new AzureMailService();
  try {
    const success = await azureMailService.sendHtmlEmail(address, subject, html);
    if (success) {
      return res.status(200).json({ message: "Email sent successfully" });
    } else {
      return res.status(500).json({ message: "Error sending email" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error sending email", error });
  }
};
