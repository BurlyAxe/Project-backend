import express from "express";
import { getCart, getCartById, getCartByUser, createCart, updateCart, deleteCart, addVideogamesToCart } from "../controllers/cartController.js";
import { body, param } from "express-validator";
import authMiddleware from "../middlewares/authMiddleware.js";
import isAdmin from "../middlewares/isAdminMiddleware.js";
import validate from "../middlewares/validation.js";

const router = express.Router();

const CartValidation = [
    param("id").isMongoId().withMessage("ID de carrito no válido"),
];

const UserValidation = [
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

router.get("/cart", authMiddleware, isAdmin, getCart);
router.get("/cart/:id", authMiddleware, isAdmin, CartValidation, validate, getCartById);
router.get("/cart/user/:userId", authMiddleware, UserValidation, validate, getCartByUser);
router.post("/cart", authMiddleware, createCartValidation, validate, createCart);
router.put("/cart/:id",authMiddleware, putCartValidation, validate, updateCart);
router.delete("/cart/:id", authMiddleware, CartValidation, validate, deleteCart);
router.post("/cart/add-videogame", authMiddleware, CartValidation, validate, addVideogamesToCart);

export default router;