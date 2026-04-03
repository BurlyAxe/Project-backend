import express from "express";
import { getCart, getCartById, getCartByUser, createCart, updateCart, deleteCart, addVideogamesToCart } from "../controllers/cartController.js";

const router = express.Router();

router.get("/", getCart);
router.get("/:id", getCartById);
router.get("/user/:userId", getCartByUser);
router.post("/", createCart);
router.put("/:id", updateCart);
router.delete("/:id", deleteCart);
router.post("/add-videogame", addVideogamesToCart);

export default router;