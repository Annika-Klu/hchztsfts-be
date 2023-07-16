import imageController from "../controllers/imageController.js";
import express from "express";

const router = express.Router();

router.get("/", imageController.allImages);

export default router;