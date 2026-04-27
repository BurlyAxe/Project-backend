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
    body("classification").notEmpty(),
    body("price").isFloat({ min: 1 })
];

const updateVideogameValidation = [
    param("id").isMongoId().withMessage("ID del videojuego invalido"),
    body("name").optional().isString(),
    body("price").optional().isFloat({ min: 1 }),
    body("stock").optional().isInt({ min: 0 })
];

router.get("/games", authMiddleware, getVideogames);
router.get ("/games/:id", authMiddleware, videogameIdValidation, validate, getVideogameById);
router.post ("/games", authMiddleware, isAdmin, createVideogameValidation, validate, createVideogame);
router.put("/games/:id", authMiddleware, isAdmin, updateVideogameValidation, validate, updateVideogame);
router.delete("/games/:id", authMiddleware, isAdmin, videogameIdValidation, validate, deleteVideogame);

export default router;