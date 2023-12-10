import express from "express";
const app = express();

import productRoutes from "./product.routes.js";
import categoryRoutes from "./category.routes.js";
import coverRoutes from "./cover.routes.js";
import brandRoutes from "./brand.routes.js";
import instagramRoutes from "./instagram.routes.js";
import paymentRoutes from "./payment.routes.js";

app.use(productRoutes);
app.use(categoryRoutes);
app.use(coverRoutes);
app.use(brandRoutes);
app.use(instagramRoutes);
app.use(paymentRoutes);

export default app;
