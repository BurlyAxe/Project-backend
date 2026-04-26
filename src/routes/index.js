import express from "express";
import authRoutes from "./authRoutes.js"
import addressRoutes from "./addressRoutes.js";
import cartRoutes from "./cartRoutes.js";
import genreRoutes from "./genreRoutes.js";
import orderRoutes from "./orderRoutes.js";
import platformsRoutes from "./platformsRoutes.js";
import videogameRoutes from "./videogameRoutes.js";
import paymentMethodRoutes from "./paymentMethodRoutes.js"
import userRoutes from "./userRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes)
router.use("/address", addressRoutes);
router.use("/cart", cartRoutes);
router.use("/genres", genreRoutes);
router.use("/orders", orderRoutes);
router.use("/platforms", platformsRoutes);
router.use("/games", videogameRoutes);
router.use("/payment-methods", paymentMethodRoutes);
router.use("/users", userRoutes);

export default router;