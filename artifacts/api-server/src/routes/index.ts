import { Router, type IRouter } from "express";
import healthRouter from "./health";
import projectsRouter from "./projects";
import skillsRouter from "./skills";
import aboutRouter from "./about";
import contactRouter from "./contact";
import portfolioRouter from "./portfolio";

const router: IRouter = Router();

router.use("/health", healthRouter);
router.use("/projects", projectsRouter);
router.use("/skills", skillsRouter);
router.use("/about", aboutRouter);
router.use("/contact", contactRouter);
router.use("/portfolio", portfolioRouter);

export default router;
