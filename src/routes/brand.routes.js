import { Router } from "express";
import {
  getBrands,
  getOneBrand,
  createBrand,
  updateBrand,
  deleteBrand,
} from "../controllers/brand.controller.js";

const router = Router();

router.get("/brands", getBrands);

router.get("/brand/:id", getOneBrand);

router.post("/brand", createBrand);

router.put("/brand/:id", updateBrand);

router.delete("/brand/:id", deleteBrand);

export default router;
