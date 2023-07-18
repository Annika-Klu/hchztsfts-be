import express from "express";
import cors from "cors";

import dataRouter from "./routes/dataRouter.js";

const app = express();
const port = process.env.PORT || 7777;

app.use(cors());
app.use(express.json());

app.use("/data", dataRouter);

app.listen(port, () => {
  console.log(`hchztsfts backend listening on port ${port}`);
});