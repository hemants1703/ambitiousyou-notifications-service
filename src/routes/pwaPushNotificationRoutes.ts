import { Router } from "express";
import { sendPushNotification } from "../controllers/pwaController";

const router = Router();

router.post("/send", sendPushNotification);

export default router;