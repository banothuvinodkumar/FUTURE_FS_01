import { Router } from "express";
import { Skill } from "../models/skill";
import { CreateSkillBody, DeleteSkillParams } from "@workspace/api-zod";

const router = Router();

router.get("/skills", async (_req, res) => {
  const skills = await Skill.find().sort({ category: 1, name: 1 });
  res.json(
    skills.map((s) => ({
      id: s._id.toString(),
      name: s.name,
      category: s.category,
      proficiency: s.proficiency,
      iconUrl: s.iconUrl ?? null,
    }))
  );
});

router.post("/skills", async (req, res) => {
  const body = CreateSkillBody.parse(req.body);
  const skill = await Skill.create(body);
  res.status(201).json({
    id: skill._id.toString(),
    name: skill.name,
    category: skill.category,
    proficiency: skill.proficiency,
    iconUrl: skill.iconUrl ?? null,
  });
});

router.delete("/skills/:id", async (req, res) => {
  const { id } = DeleteSkillParams.parse(req.params);
  await Skill.findByIdAndDelete(id);
  res.status(204).send();
});

export default router;
