import { Router } from "express";
import { ContactMessage } from "../models/contact";
import { SendContactMessageBody } from "@workspace/api-zod";

const router = Router();

router.get("/contact", async (_req, res) => {
  const messages = await ContactMessage.find().sort({ createdAt: -1 });
  res.json(
    messages.map((m) => ({
      id: m._id.toString(),
      name: m.name,
      email: m.email,
      subject: m.subject,
      message: m.message,
      createdAt: m.createdAt.toISOString(),
    }))
  );
});

router.post("/contact", async (req, res) => {
  const body = SendContactMessageBody.parse(req.body);
  const msg = await ContactMessage.create(body);
  res.status(201).json({
    id: msg._id.toString(),
    name: msg.name,
    email: msg.email,
    subject: msg.subject,
    message: msg.message,
    createdAt: msg.createdAt.toISOString(),
  });
});

export default router;
