import express from "express";
import { getGenres, createGenre } from "../controllers/genreController.js";

const router = express.Router();

router.get("/", getGenres);
router.post("/", createGenre);

export default router;