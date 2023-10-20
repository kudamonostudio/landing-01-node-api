import express from "express";
const app = express();

import productRoutes from './product.routes.js'
import categoryRoutes from './category.routes.js'
import coverRoutes from './cover.routes.js'

app.use(productRoutes);
app.use(categoryRoutes);
app.use(coverRoutes);


export default app