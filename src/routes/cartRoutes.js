import express from "express";
import { getCart, getCartById, getCartByUser, createCart, updateCart, deleteCart, addVideogamesToCart } from "../controllers/cartController.js";
import { body, param } from "express-validator";

const router = express.Router();

const idCartValidation = [
    param("id").isMongoId().withMessage("ID de carrito no válido"),
];

const idUserValidation = [
    param("id").isMongoId().withMessage("ID de usuario no válido"),
];

const createCartValidation = [
    body("user").notEmpty().withMessage("El usuario es requerido").isMongoId().withMessage("ID de usuario no válido"),
    body("videogames").optional().isArray().withMessage("Los videojuegos deben ser un array"),
    body("videogames.*.videogame").isMongoId().withMessage("ID de videojuego no válido"),
    body("videogames.*.quantity").isInt({ min: 1 }).withMessage("La cantidad debe ser un número entero mayor a 1"),
];

const putCartValidation = [
    param("id").isMongoId().withMessage("ID de carrito no válido"),
    body("user").notEmpty().withMessage("El usuario es requerido").isMongoId().withMessage("ID de usuario no válido"),
    body("videogames").optional().isArray().withMessage("Los videojuegos deben ser un array"),
    body("videogames.*.videogame").isMongoId().withMessage("ID de videojuego no válido"),
    body("videogames.*.quantity").isInt({ min: 1 }).withMessage("La cantidad debe ser un número entero mayor a 1"),
];

router.get("/", getCart);
router.get("/:id", getCartById);
router.get("/user/:userId", getCartByUser);
router.post("/", createCart);
router.put("/:id", updateCart);
router.delete("/:id", deleteCart);
router.post("/add-videogame", addVideogamesToCart);

export default router;