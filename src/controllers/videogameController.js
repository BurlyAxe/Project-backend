import mongoose from "mongoose";
import Videogame from "../models/Videogame.js";

const getVideogames = async (req, res, next) => {
    try {
        const { q, releaseDate, platforms, genre, classification, minPrice, maxPrice, inStock, sort, order, page = 1, limit = 10 } = req.query;

        let filter = {};

        if (q) {
            filter.$or = [
                { name: { $regex: q, $options: "i" } },
                { description: { $regex: q, $options: "i" } }
            ];
        }

        if (genre) {
            filter.genre = { $in: genre.split(",") };
        }

        if (classification) {
            filter.classification = classification;
        }

        if (releaseDate) {
            const date = new Date(releaseDate);
            filter.releaseDate = {
                $gte: new Date(date.setHours(0,0,0,0)),
                $lte: new Date(date.setHours(23,59,59,999))
            };
        }

        if (platforms) {
            filter.platforms = { $in: platforms.split(",") };
        }

        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = parseFloat(minPrice);
            if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
        }

        if (inStock === "true") filter.stock = { $gt: 0 };
        if (inStock === "false") filter.stock = { $eq: 0 };

        let sortOption = {};
        if (sort) {
            sortOption[sort] = order === "desc" ? -1 : 1;
        }

        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);
        const skip = (pageNumber - 1) * limitNumber;

        const videogames = await Videogame.find(filter)
            .populate("genre")
            .populate("classification")
            .populate("platforms")
            .sort(sortOption)
            .skip(skip)
            .limit(limitNumber);

        const total = await Videogame.countDocuments(filter);

        return res.status(200).json({
            results: videogames,
            pagination: {
                page: pageNumber,
                totalPages: Math.ceil(total / limitNumber),
                totalResults: total
            }
        });

    } catch (error) {
        next(error);
    }
};

const getVideogameById = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID inválido" });
        }

        const videogame = await Videogame.findById(id).populate("genre").populate("classification").populate("platforms");

        if (!videogame) {
            return res.status(404).json({ message: "Videojuego no encontrado" });
        }

        return res.status(200).json(videogame);

    } catch (error) {
        next(error);
    }
};

const createVideogame = async (req, res, next) => {
    try {
        const { name, description, releaseDate, platforms, genre, classification, price } = req.body;

        if (!name || !description || !releaseDate || !platforms || !Array.isArray(platforms) || platforms.length === 0 || !genre || !classification || !price) {
            return res.status(400).json({ message: "Todos los campos son requeridos" });
        }

        if (
            !mongoose.Types.ObjectId.isValid(genre) ||
            !mongoose.Types.ObjectId.isValid(classification) ||
            platforms.some(id => !mongoose.Types.ObjectId.isValid(id))
        ) {
            return res.status(400).json({ message: "IDs no válidos" });
        }

        const newGame = await Videogame.create({
            name,
            description,
            releaseDate,
            platforms,
            genre,
            classification,
            price
        });

        return res.status(201).json(newGame);

    } catch (error) {
        next(error);
    }
};

const updateVideogame = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, price } = req.body;

        if (!name && !price) {
            return res.status(400).json({ message: "Datos insuficientes" });
        }

        if (price && price < 1) {
            return res.status(400).json({ message: "Precio inválido" });
        }

        const updated = await Videogame.findByIdAndUpdate(
            id,
            { name, price },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "No encontrado" });
        }

        return res.status(200).json(updated);

    } catch (error) {
        next(error);
    }
};

const deleteVideogame = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deleted = await Videogame.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: "No encontrado" });
        }

        return res.status(204).send();

    } catch (error) {
        next(error);
    }
};

export { getVideogames, getVideogameById, createVideogame, updateVideogame, deleteVideogame };