import express from "express";
import cors from "cors";

import imageRouter from "./routes/imageRouter.js";

const app = express();
const port = process.env.PORT || 7777;

app.use(cors());
app.use(express.json());

app.use("/images", imageRouter);

app.listen(port, () => {
  console.log(`hchztsfts backend listening on port ${port}`);
});