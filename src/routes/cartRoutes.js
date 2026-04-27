import express from "express";
import { getCart, getCartById, getCartByUser, createCart, updateCart, deleteCart, addVideogamesToCart } from "../controllers/cartController.js";
import { body, param } from "express-validator";
import authMiddleware from "../middlewares/authMiddleware.js";
import isAdmin from "../middlewares/isAdminMiddleware.js";
import validate from "../middlewares/validation.js";

const router = express.Router();

const cartIdValidation = [
    param("cartId").isMongoId().withMessage("ID de carrito no válido"),
];

const userIdValidation = [
    param("userId").isMongoId().withMessage("ID de usuario no válido"),
];

const createCartValidation = [
    param("userId").isMongoId().withMessage("ID de usuario no válido"),
    body("videogames").optional().isArray().withMessage("Los videojuegos deben ser un array"),
    body("videogames.*.videogame").optional().isMongoId().withMessage("ID de videojuego no válido"),
    body("videogames.*.quantity").optional().isInt({ min: 1 }).withMessage("La cantidad debe ser un número entero mayor a 1"),
];

const updateCartValidation = [
    param("userId").isMongoId().withMessage("ID de usuario no válido"),
    param("cartId").isMongoId().withMessage("ID de carrito no válido"),
    body("videogames").optional().isArray().withMessage("Los videojuegos deben ser un array"),
    body("videogames.*.videogame").optional().isMongoId().withMessage("ID de videojuego no válido"),
    body("videogames.*.quantity").optional().isInt({ min: 1 }).withMessage("La cantidad debe ser un número entero mayor a 1"),
];

const deleteCartValidation = [
    param("userId").isMongoId().withMessage("ID de usuario no válido"),
    param("cartId").isMongoId().withMessage("ID de carrito no válido"),
    param("videogameId").optional().isMongoId().withMessage("ID de videojuego no válido"),
];

router.get("/cart", authMiddleware, isAdmin, getCart);
router.get("/cart/:cartId", authMiddleware, isAdmin,  cartIdValidation, validate, getCartById);
router.get("/users/:userId/cart", authMiddleware, userIdValidation, validate, getCartByUser);
router.post("/users/:userId/cart", authMiddleware, createCartValidation, validate, createCart);
router.post("/users/:userId/cart/items", authMiddleware, userIdValidation, validate, addVideogamesToCart);
router.put("/users/:userId/cart/:cartId", authMiddleware, updateCartValidation, validate, updateCart);
router.delete("/users/:userId/cart/:cartId", authMiddleware, deleteCartValidation, validate, deleteCart);

export default router;