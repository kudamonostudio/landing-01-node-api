import { Router } from "express";
import {
  getCovers,
  getOneCover,
  createCover,
  updateCover,
  deleteCover,
} from "../controllers/cover.controller.js";

const router = Router();

router.get("/cover", getCovers);

router.get("/cover/:id", getOneCover);

router.post("/cover", createCover);

router.put("/cover/:id", updateCover);

router.delete("/cover/:id", deleteCover);

export default router;
