import { Router } from "express";
import { About } from "../models/about";
import { UpdateAboutBody } from "@workspace/api-zod";
import { isDbAvailable } from "../lib/mongodb";
import { fallbackAbout } from "../lib/fallback-data";

const router = Router();

router.get("/about", async (_req, res) => {
  if (!isDbAvailable()) {
    res.json(fallbackAbout);
    return;
  }
  const about = await About.findOne();
  if (!about) {
    res.json(fallbackAbout);
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
  if (!isDbAvailable()) {
    res.status(503).json({ error: "Database unavailable" });
    return;
  }
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
