import { Router } from "express";
import {
  getCategories,
  getOneCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

import fileUpload from "express-fileupload";

const router = Router();

router.get("/category", getCategories);

router.get("/category/:id", getOneCategory);

router.post(
  "/category",
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  }),
  createCategory
);

router.put(
  "/category/:id",
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  }),
  updateCategory
);

router.delete("/category/:id", deleteCategory);

export default router;
