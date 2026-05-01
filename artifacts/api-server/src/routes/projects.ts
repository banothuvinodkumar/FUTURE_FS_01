import { Router } from "express";
import { Project } from "../models/project";
import {
  ListProjectsQueryParams,
  CreateProjectBody,
  GetProjectParams,
  UpdateProjectParams,
  UpdateProjectBody,
  DeleteProjectParams,
} from "@workspace/api-zod";

const router = Router();

router.get("/projects", async (req, res) => {
  const parsed = ListProjectsQueryParams.safeParse(req.query);
  const filter: Record<string, unknown> = {};
  if (parsed.success && parsed.data.featured !== undefined) {
    filter["featured"] = parsed.data.featured;
  }
  const projects = await Project.find(filter).sort({ createdAt: -1 });
  res.json(
    projects.map((p) => ({
      id: p._id.toString(),
      title: p.title,
      description: p.description,
      techStack: p.techStack,
      githubUrl: p.githubUrl ?? null,
      liveUrl: p.liveUrl ?? null,
      imageUrl: p.imageUrl ?? null,
      featured: p.featured,
      category: p.category,
      createdAt: p.createdAt.toISOString(),
    }))
  );
});

router.post("/projects", async (req, res) => {
  const body = CreateProjectBody.parse(req.body);
  const project = await Project.create(body);
  res.status(201).json({
    id: project._id.toString(),
    title: project.title,
    description: project.description,
    techStack: project.techStack,
    githubUrl: project.githubUrl ?? null,
    liveUrl: project.liveUrl ?? null,
    imageUrl: project.imageUrl ?? null,
    featured: project.featured,
    category: project.category,
    createdAt: project.createdAt.toISOString(),
  });
});

router.get("/projects/:id", async (req, res) => {
  const { id } = GetProjectParams.parse(req.params);
  const project = await Project.findById(id);
  if (!project) {
    res.status(404).json({ error: "Project not found" });
    return;
  }
  res.json({
    id: project._id.toString(),
    title: project.title,
    description: project.description,
    techStack: project.techStack,
    githubUrl: project.githubUrl ?? null,
    liveUrl: project.liveUrl ?? null,
    imageUrl: project.imageUrl ?? null,
    featured: project.featured,
    category: project.category,
    createdAt: project.createdAt.toISOString(),
  });
});

router.put("/projects/:id", async (req, res) => {
  const { id } = UpdateProjectParams.parse(req.params);
  const body = UpdateProjectBody.parse(req.body);
  const project = await Project.findByIdAndUpdate(id, body, { new: true });
  if (!project) {
    res.status(404).json({ error: "Project not found" });
    return;
  }
  res.json({
    id: project._id.toString(),
    title: project.title,
    description: project.description,
    techStack: project.techStack,
    githubUrl: project.githubUrl ?? null,
    liveUrl: project.liveUrl ?? null,
    imageUrl: project.imageUrl ?? null,
    featured: project.featured,
    category: project.category,
    createdAt: project.createdAt.toISOString(),
  });
});

router.delete("/projects/:id", async (req, res) => {
  const { id } = DeleteProjectParams.parse(req.params);
  await Project.findByIdAndDelete(id);
  res.status(204).send();
});

export default router;
