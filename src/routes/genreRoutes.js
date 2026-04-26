import express from "express";
import { getGenres, createGenre } from "../controllers/genreController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import validate from "../middlewares/validation.js";
import isAdmin from "../middlewares/isAdminMiddleware.js";
import { body } from "express-validator";

const router = express.Router();

const createGenreValidation = [
    body("name").notEmpty().withMessage("Nombre de genero requerido").isMongoId().withMessage("El ID es invalido")
];

router.get("/genres", authMiddleware, isAdmin, getGenres);
router.post("/genres", authMiddleware, createGenreValidation, validate,  createGenre);

export default router;