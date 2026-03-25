import mongoose from "mongoose";
import Videogame from "../models/Videogame.js";

async function getVideogame(req, res) {
    try {
        const videogames = await Videogame.find();
        res.status(200).json(videogames);
    } catch (error) {
        console.log(error)
    };
};

async function getVideogameByName(req, res) {
    try {
        const nameVideogame = await Videogame.findOne({ name: req.params.name });

        if (nameVideogame.length === 0) {
            return res.status(400).json({ message: "No hay resultados para esa busqueda" });
        }

        res.status(200).json(nameVideogame);

    } catch (error) {
        console.log(error)
    };
};

async function getVideogameByGenre(req, res) {
    try {
        const genreVideogame = await Videogame.find({ genre: req.params.genre });

        if (genreVideogame.length === 0) {
            return res.status(400).json({ message: "No hay resultados para esa busqueda" });
        }

        res.status(200).json(genreVideogame);
    } catch (error) {
        console.log(error);
    };
};

async function createVideogame(req, res) {
    try {
        const { name, description, releaseDate, platforms, genre, classification, price } = req.body;

        if (!name || !description || !releaseDate || !platforms || !Array.isArray(platforms) || !genre || !classification || !price) {
            return res.status(400).json({ message: "Todos los campos son requeridos" })
        };

        if (!mongoose.Types.ObjectId.isValid(genre) || !mongoose.Types.ObjectId.isValid(classification) || platforms.some(id => !mongoose.Types.ObjectId.isValid(id))) {
            return res.status(400).json({ message: "Id no validos" })
        };

        const newVideogame = await Videogame.create({
            name, description, releaseDate, platforms, genre, classification, price
        });

        return res.status(200).json(newVideogame)

    } catch (error) {
        console.log(error)
    };
};

async function updateVideogame(req, res) {
    try {
        const { id } = req.params;
        const { name, price } = req.body;

        if (!name || !price || price < 1) {
            return res.status(400).json({ message: "Datos insuficientes" })
        };

        const updateGame = await Videogame.findByIdAndUpdate(id, { name, price }, { new: true });

        if (updateGame) {
            return res.status(200).json(updateGame);
        } else {
            return res.status(400).json({ message: "Fallo al actualizar datos" })
        }
    } catch (error) {
        console.log(error)
    };
};

async function deleteVideogame(req, res) {
    try {
        const { id } = req.params;
        const deletedVideogame = await Videogame.findByIdAndDelete(id);

        if (deletedVideogame) {
            return res.status(200).send()
        } else {
            return res.status(400).json({ message: "Sin datos de videojuego" })
        };

    } catch (error) {
        console.log(error)
    };
};

export { getVideogame, getVideogameByName, getVideogameByGenre, createVideogame, updateVideogame, deleteVideogame };