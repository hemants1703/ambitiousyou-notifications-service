import { Request, Response } from "express";

export const sendPushNotification = (req: Request, res: Response) => {
    const body = req.body();

    res.json(200).json({
        message: "Sending message to PWA..."
    })
}