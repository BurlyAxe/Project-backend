import express from "express";
import authRoutes from "./authRoutes.js"
import addressRoutes from "./addressRoutes.js";
import cartRoutes from "./cartRoutes.js";
import genreRoutes from "./genreRoutes.js";
import orderRoutes from "./orderRoutes.js";
import platformsRoutes from "./platformsRoutes.js";
import videogameRoutes from "./videogameRoutes.js";
import paymentMethodRoutes from "./paymentMethodRoutes.js"

const router = express.Router();

router.use("/auth", authRoutes)
router.use(addressRoutes);
router.use(cartRoutes);
router.use(genreRoutes);
router.use(orderRoutes);
router.use(platformsRoutes);
router.use(videogameRoutes);
router.use(paymentMethodRoutes);

export default router;