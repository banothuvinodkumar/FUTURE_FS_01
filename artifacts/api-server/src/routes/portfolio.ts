import { Router } from "express";
import { Project } from "../models/project";
import { Skill } from "../models/skill";
import { ContactMessage } from "../models/contact";

const router = Router();

router.get("/portfolio/summary", async (_req, res) => {
  const [totalProjects, featuredProjects, totalMessages, projectAgg, skillAgg] =
    await Promise.all([
      Project.countDocuments(),
      Project.countDocuments({ featured: true }),
      ContactMessage.countDocuments(),
      Project.aggregate([
        { $group: { _id: "$category", count: { $sum: 1 } } },
      ]),
      Skill.aggregate([{ $group: { _id: "$category", count: { $sum: 1 } } }]),
    ]);

  const skillCategories = new Set(skillAgg.map((s: { _id: string }) => s._id))
    .size;
  const totalSkills = await Skill.countDocuments();

  res.json({
    totalProjects,
    featuredProjects,
    totalSkills,
    skillCategories,
    totalMessages,
    projectCategories: projectAgg.map(
      (p: { _id: string; count: number }) => ({
        category: p._id,
        count: p.count,
      })
    ),
    skillsByCategory: skillAgg.map((s: { _id: string; count: number }) => ({
      category: s._id,
      count: s.count,
    })),
  });
});

export default router;
