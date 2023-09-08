import { Router } from "express";
import {
  getProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteProductImage,
} from "../controllers/products.controller.js";

const router = Router();

router.get("/products", getProducts);

router.get("/products/:id", getOneProduct);

router.post("/products", createProduct);

router.put("/products/:id", updateProduct);

router.delete("/products/:id", deleteProduct);

router.delete("/products/:productId/images/:imageId", deleteProductImage);

export default router;
