import express from "express";
import { searchVideogame, getVideogame, getVideogameByName, getVideogameByGenre, createVideogame, updateVideogame, deleteVideogame } from "../controllers/videogameController.js";

const router = express.Router();

router.get("/", searchVideogame);
router.get("/", getVideogame);
router.get("/", getVideogameByName);
router.get("/", getVideogameByGenre);
router.post("/", createVideogame);
router.put("/", updateVideogame );
router.delete("/", deleteVideogame);

export default router;