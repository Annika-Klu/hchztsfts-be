import express from "express";
import validFolder from "../middleware/validFolder.js";
import dataController from "../controllers/dataController.js";

const router = express.Router();

router.get("/folders", dataController.getFolderData);
router.get("/images", validFolder, dataController.getImageData);

export default router;