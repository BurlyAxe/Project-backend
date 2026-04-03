import express from "express";
import addressRoutes from "./addressRoutes.js";
import cartRoutes from "./cartRoutes.js";
import genreRoutes from "./genreRoutes.js";
import orderRoutes from "./orderRoutes.js";
import platformsRoutes from "./platformsRoutes.js";
import videogameRoutes from "./videogameRoutes.js";

const router = express.Router();

router.use(addressRoutes);
router.use(cartRoutes);
router.use(genreRoutes);
router.use(orderRoutes);
router.use(platformsRoutes);
router.use(videogameRoutes);

export default router;