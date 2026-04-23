import express from "express";
import { getVideogames, getVideogameById, createVideogame, updateVideogame, deleteVideogame } from "../controllers/videogameController.js";
import { body, param } from "express-validator";
import authMiddleware from "../middlewares/authMiddleware.js";
import validate from "../middlewares/validation.js";
import isAdmin from "../middlewares/isAdminMiddleware.js";

const router = express.Router();

const videogameIdValidation = [
    param("id").isMongoId().withMessage("ID del videojuego invalido")
];

const createVideogameValidation = [
    body("name").notEmpty().isString(),
    body("description").notEmpty().isString(),
    body("releaseDate").optional().isISO8601(),
    body("platforms").isArray({ min: 1 }),
    body("platforms.*").isMongoId(),
    body("genre").isMongoId(),
    body("classification").isMongoId(),
    body("price").isFloat({ min: 1 })
];

const updateVideogameValidation = [
    param("id").isMongoId().withMessage("ID del videojuego invalido"),
    body("name").notEmpty().withMessage("El nombre del videojuego es requerido").isString(),
    body("price").notEmpty().withMessage("El precio es requerido")
];

router.get("/games", authMiddleware, isAdmin, getVideogames);
router.get ("/games/:id", authMiddleware, videogameIdValidation, validate, getVideogameById);
router.post ("/games", authMiddleware, createVideogame, validate, createVideogame);
router.put("/games/:id", authMiddleware, updateVideogame, validate, updateVideogame);
router.delete("/games/:id", deleteVideogame);

export default router;