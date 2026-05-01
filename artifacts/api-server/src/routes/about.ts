import { Router } from "express";
import { About } from "../models/about";
import { UpdateAboutBody } from "@workspace/api-zod";

const router = Router();

router.get("/about", async (_req, res) => {
  const about = await About.findOne();
  if (!about) {
    res.status(404).json({ error: "About info not found" });
    return;
  }
  res.json({
    id: about._id.toString(),
    name: about.name,
    title: about.title,
    bio: about.bio,
    email: about.email,
    phone: about.phone ?? null,
    location: about.location ?? null,
    githubUrl: about.githubUrl ?? null,
    linkedinUrl: about.linkedinUrl ?? null,
    resumeUrl: about.resumeUrl ?? null,
    photoUrl: about.photoUrl ?? null,
    yearsExperience: about.yearsExperience ?? null,
    availability: about.availability ?? null,
  });
});

router.put("/about", async (req, res) => {
  const body = UpdateAboutBody.parse(req.body);
  const about = await About.findOneAndUpdate({}, body, {
    new: true,
    upsert: true,
  });
  res.json({
    id: about._id.toString(),
    name: about.name,
    title: about.title,
    bio: about.bio,
    email: about.email,
    phone: about.phone ?? null,
    location: about.location ?? null,
    githubUrl: about.githubUrl ?? null,
    linkedinUrl: about.linkedinUrl ?? null,
    resumeUrl: about.resumeUrl ?? null,
    photoUrl: about.photoUrl ?? null,
    yearsExperience: about.yearsExperience ?? null,
    availability: about.availability ?? null,
  });
});

export default router;
