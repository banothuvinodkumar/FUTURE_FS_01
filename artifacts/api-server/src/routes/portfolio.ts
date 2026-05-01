import { Router } from "express";
import { Project } from "../models/project";
import { Skill } from "../models/skill";
import { ContactMessage } from "../models/contact";
import { isDbAvailable } from "../lib/mongodb";
import { fallbackProjects, fallbackSkills } from "../lib/fallback-data";

const router = Router();

router.get("/portfolio/summary", async (_req, res) => {
  if (!isDbAvailable()) {
    const projectCategoryMap = new Map<string, number>();
    fallbackProjects.forEach((p) => {
      projectCategoryMap.set(p.category, (projectCategoryMap.get(p.category) ?? 0) + 1);
    });
    const skillCategoryMap = new Map<string, number>();
    fallbackSkills.forEach((s) => {
      skillCategoryMap.set(s.category, (skillCategoryMap.get(s.category) ?? 0) + 1);
    });
    res.json({
      totalProjects: fallbackProjects.length,
      featuredProjects: fallbackProjects.filter((p) => p.featured).length,
      totalSkills: fallbackSkills.length,
      skillCategories: skillCategoryMap.size,
      totalMessages: 0,
      projectCategories: Array.from(projectCategoryMap.entries()).map(([category, count]) => ({ category, count })),
      skillsByCategory: Array.from(skillCategoryMap.entries()).map(([category, count]) => ({ category, count })),
    });
    return;
  }

  const [totalProjects, featuredProjects, totalMessages, projectAgg, skillAgg] =
    await Promise.all([
      Project.countDocuments(),
      Project.countDocuments({ featured: true }),
      ContactMessage.countDocuments(),
      Project.aggregate([{ $group: { _id: "$category", count: { $sum: 1 } } }]),
      Skill.aggregate([{ $group: { _id: "$category", count: { $sum: 1 } } }]),
    ]);

  const skillCategories = new Set(skillAgg.map((s: { _id: string }) => s._id)).size;
  const totalSkills = await Skill.countDocuments();

  res.json({
    totalProjects,
    featuredProjects,
    totalSkills,
    skillCategories,
    totalMessages,
    projectCategories: projectAgg.map((p: { _id: string; count: number }) => ({
      category: p._id,
      count: p.count,
    })),
    skillsByCategory: skillAgg.map((s: { _id: string; count: number }) => ({
      category: s._id,
      count: s.count,
    })),
  });
});

export default router;
