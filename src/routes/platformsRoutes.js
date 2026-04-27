import express from "express";
import { getPlatforms, createPlatform } from "../controllers/platformsController.js";
import { body } from "express-validator";
import authMiddleware from "../middlewares/authMiddleware.js";
import isAdmin from "../middlewares/isAdminMiddleware.js";
import validate from "../middlewares/validation.js";

const router = express.Router();

const createPlatformValidation = [
    body("name").notEmpty().withMessage("El nombre de la plataforma es reqerido"),
];

router.get("/platforms", authMiddleware, isAdmin, getPlatforms);
router.post("/platforms", authMiddleware, isAdmin, createPlatformValidation, validate, createPlatform);

export default router;