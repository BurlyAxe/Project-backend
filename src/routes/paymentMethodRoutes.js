import express from "express";
import { getPaymentMethod, getPaymentMethodById, createPaymentMethod, updatePaymentMethod, deletePaymentMethod } from "../controllers/paymentMethodController.js";
import { body, param } from "express-validator";
import authMiddleware from "../middlewares/authMiddleware.js";
import isAdmin from "../middlewares/isAdminMiddleware.js";
import validate from "../middlewares/validation.js"

const router = express.Router();

const paymentIdValidation = [
    param("id").isMongoId().withMessage("ID no válido")
];

const createPaymentValidation = [
    body("user").notEmpty().withMessage("El usuario es requerido").isMongoId().withMessage("El ID del usuario es invalido"),
    body("type").notEmpty().withMessage("El tipo de tarjeta es requerido").isIn([ "credit_card", "paypal", "bank_transfer" ]).withMessage("El tipo de pago es invalido"),
    body("isDefault").optional().isBoolean().withMessage("El valor por defecto debe ser boleano")
];

const updatedPaymentValidation = [
    body("user").notEmpty().withMessage("El usuario es requerido").isMongoId().withMessage("El ID del usuario es invalido"),
    body("type").notEmpty().withMessage("El tipo de tarjeta es requerido").isIn([ "credit_card", "paypal", "bank_transfer" ]).withMessage("El tipo de pago es invalido"),
    body("isDefault").optional().isBoolean().withMessage("El valor por defecto debe ser boleano"),
    body("cardNumber").optional().isLength({ max: 16 }).withMessage("El numero de tarjeta debe ser de 16 digitos")
];

router.get("/payment",authMiddleware, isAdmin, getPaymentMethod);
router.get("/payment/:id",authMiddleware, isAdmin, paymentIdValidation, validate, getPaymentMethodById);
router.post("/payment", createPaymentValidation, authMiddleware, validate, createPaymentMethod);
router.put("/payment", authMiddleware, updatedPaymentValidation, validate,  updatePaymentMethod);
router.delete("/payment",authMiddleware, paymentIdValidation, validate, deletePaymentMethod);

export default router;