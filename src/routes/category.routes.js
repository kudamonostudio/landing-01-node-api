import { Router } from "express";
import {
  getCategories,
  getOneCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

const router = Router();

router.get("/category", getCategories);

router.get("/category/:id", getOneCategory);

router.post("/category", createCategory);

router.put("/category/:id", updateCategory);

router.delete("/category/:id", deleteCategory);

export default router;
