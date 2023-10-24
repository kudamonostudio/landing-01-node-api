import { Router } from "express";
import {
  getInstagrams,
  createInstagram,
  deleteInstagram,
} from "../controllers/instagram.controller.js";

const router = Router();

router.get("/instagrams", getInstagrams);

router.post("/instagram", createInstagram);

router.delete("/instagram/:id", deleteInstagram);

export default router;
