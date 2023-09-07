import { Router } from "express";
import {
  getProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteProductImage
} from "../controllers/products.controller.js";
import fileUpload from "express-fileupload";

const router = Router();

router.get("/products", getProducts);

router.get("/products/:id", getOneProduct);

router.post("/products", fileUpload({
  useTempFiles: true,
  tempFileDir: "./uploads",
}) ,createProduct);

router.put("/products/:id", fileUpload({
  useTempFiles: true,
  tempFileDir: "./uploads",
}) ,updateProduct);

router.delete("/products/:id", deleteProduct);

router.delete("/products/:productId/images/:imageId", deleteProductImage);

export default router;
