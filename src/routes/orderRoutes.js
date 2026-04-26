import express from "express";
import { getOrder, getOrderById, createOrder, updateOrderStatus } from "../controllers/orderController.js";
import { body, param } from "express-validator";
import validate from "../middlewares/validation.js";

const router = express.Router();

const userIdValidation = [
    param("userId").isMongoId().withMessage("ID de usuario inválido"),
];

const orderIdValidation = [
    param("orderId").isMongoId().withMessage("ID de orden inválido"),
];

const createOrderValidation = [
    param("userId").isMongoId(),
    body("address").isMongoId().withMessage("Dirección inválida"),
    body("paymentMethod").isMongoId().withMessage("Método de pago inválido"),
    body("shippingCost").optional().isFloat({ min: 0 })
];

const orderStatusValidation = [
    param("orderId").isMongoId(),
    body("status").optional().isIn(["pending", "shipped", "delivered", "cancelled"]),
    body("paymentStatus").optional().isIn(["pending", "paid", "failed"]),
];

router.get("/orders", getOrder);

router.get("/users/:userId/orders/:orderId", userIdValidation, orderIdValidation, validate, getOrderById);

router.post("/users/:userId/orders", createOrderValidation, validate, createOrder);

router.put("/users/:userId/orders/:orderId/status", orderStatusValidation, validate, updateOrderStatus);

export default router;