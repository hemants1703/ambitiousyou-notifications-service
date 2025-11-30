import express from "express";
import mailRoutes from "./routes/mailRoutes";
import pwaPushNotificationRoutes from "./routes/pwaPushNotificationRoutes";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

// Routes
app.use("/api/email", mailRoutes);                // Email Notifications Route Handlers
app.use("/api/pwa", pwaPushNotificationRoutes);   // PWA Notifications Notifications Handler

// Start the server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
