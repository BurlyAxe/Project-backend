import express from "express";
import { getOrder, getOrderById, createOrder, updateOrderStatus } from "../controllers/orderController.js";

const router = express.Router();

router.get("/", getOrder);
router.get("/:id", getOrderById);
router.post("/", createOrder);
router.put("/:id/status", updateOrderStatus);

export default router;