import { Router, type IRouter } from "express";
import healthRouter from "./health";
import projectsRouter from "./projects";
import skillsRouter from "./skills";
import aboutRouter from "./about";
import contactRouter from "./contact";
import portfolioRouter from "./portfolio";

const router: IRouter = Router();

router.use(healthRouter);
router.use(projectsRouter);
router.use(skillsRouter);
router.use(aboutRouter);
router.use(contactRouter);
router.use(portfolioRouter);

export default router;
