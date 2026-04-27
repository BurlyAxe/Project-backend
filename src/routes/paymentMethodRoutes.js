import express from "express";
import { getPaymentMethod, getPaymentMethodById, createPaymentMethod, updatePaymentMethod, deletePaymentMethod } from "../controllers/paymentMethodController.js";
import { body, param } from "express-validator";
import authMiddleware from "../middlewares/authMiddleware.js";
import validate from "../middlewares/validation.js";

const router = express.Router();

const paymentIdValidation = [
    param("id").isMongoId().withMessage("ID de método de pago inválido")
];

const createPaymentValidation = [
    body("type").notEmpty().withMessage("El tipo es requerido").isIn(["credit_card", "paypal", "bank_transfer"]).withMessage("Tipo de pago inválido"),
    body("cardNumber").optional().isLength({ min: 16, max: 16 }).withMessage("El número de tarjeta debe tener 16 dígitos"),
    body("cardHolder").optional().isString().withMessage("El titular debe ser texto"),
    body("cvv").optional().isLength({ min: 3, max: 4 }).withMessage("CVV inválido"),
    body("expirationDate").optional().isISO8601().withMessage("Fecha inválida"),
    body("isDefault").optional().isBoolean().withMessage("isDefault debe ser booleano")
];

const updatePaymentValidation = [
    param("id").isMongoId().withMessage("ID inválido"),
    body("cardNumber").optional().isLength({ min: 16, max: 16 }).withMessage("El número de tarjeta debe tener 16 dígitos"),
    body("expirationDate").optional().isISO8601().withMessage("Fecha inválida"),
    body("isDefault").optional().isBoolean().withMessage("isDefault debe ser booleano")
];

router.get("/payment", authMiddleware, isAdmin, getPaymentMethod);
router.get("/payment/:id", authMiddleware, paymentIdValidation, validate, getPaymentMethodById);
router.post("/payment", authMiddleware, createPaymentValidation, validate,  createPaymentMethod);
router.put("/payment/:id", authMiddleware, updatePaymentValidation, validate, updatePaymentMethod);
router.delete("/payment", authMiddleware, deletePaymentMethod);

export default router;