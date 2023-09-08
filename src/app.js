import express from "express";
import morgan from "morgan";
import "dotenv/config";
import cors from "cors";
import fileUpload from "express-fileupload";

import indexRoutes from "./routes/index.routes.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  })
);

app.use(indexRoutes);

export default app;
