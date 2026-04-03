import express from "express";
import { getPlatforms, createPlatform } from "../controllers/platformsController.js";

const router = express.Router();

router.get("/", getPlatforms);
router.post("/", createPlatform);

export default router;