import express from "express";
import { getOrder, getOrderById, createOrder, updateOrderStatus } from "../controllers/orderController.js";
import { body, param } from "express-validator";
import validate from "../middlewares/validation.js";
import isAdmin from "../middlewares/isAdminMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";


const router = express.Router();

const orderValidation = [
    param("id").isMongoId().withMessage("El ID de la orden es invalido")
];

const createOrderValidation = [
    body("user").notEmpty().withMessage("El usuario es requerido").isMongoId().withMessage("ID de usuario no valido"),
    body("videogames").notEmpty().withMessage("Los videojuegos son requeridos").isArray().withMessage("Los videojuegos deben ser un array"),
    body("videogames.*.videogameId").notEmpty().withMessage("Cada videojuego debe tener su ID").isMongoId().withMessage("ID de videojuego no válido"),
    body("videogames.*.quantity").notEmpty().withMessage("Cada videojuego debe incluir cantidad").isInt({ min: 1 }).withMessage("La cantidad debe ser un número entero mayor a 1"),
    body("videogames.*.price").notEmpty().withMessage("El precio es invalido").isFloat({ min: 1 }).withMessage("El precio debe ser un numero valido"),
    body("address").notEmpty().withMessage("Direccion requerida").isMongoId().withMessage("El ID es invalido"),
    body("paymentMethod").notEmpty().withMessage("Metodo de pago requerido").isMongoId().withMessage("El ID es invalido"),
    body("totalPrice").notEmpty().withMessage("El costo total es requerido").isFloat({ min: 1 }).withMessage("El precio debe ser un numero positivo"),
    body("shippingCost").optional().isFloat({ min: 0 }).withMessage("El costo de envio deve ser un numero positivo")
];

const orderStatusValidation = [
    param("id").isMongoId().withMessage("El ID de la orden es invalido"),
    body("status").optional().isIn(["pending", "shipped", "delivered", "cancelled"]).withMessage("Estado del pedido invalido"),
    body("paymentSatuts").optional().isIn(["pending", "paid", "failed"]).withMessage("Estado del pago invalido"),
];

router.get("/orders", authMiddleware, isAdmin, getOrder);
router.get("/orders/:id",authMiddleware, orderValidation, validate, getOrderById);
router.post("/orders", authMiddleware, createOrderValidation, validate, createOrder);
router.put("/orders/:id/status", authMiddleware, orderStatusValidation, validate, updateOrderStatus);

export default router;