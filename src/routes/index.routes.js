import express from "express";
const app = express();

import productRoutes from './product.routes.js'
import categoryRoutes from './category.routes.js'

app.use(productRoutes);
app.use(categoryRoutes);


export default app