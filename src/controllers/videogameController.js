import mongoose from "mongoose";
import Videogame from "../models/Videogame.js";
import { populate } from "dotenv";

/*
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

        if (!name && !price) {
            return res.status(400).json({ message: "Datos insuficientes" })
        };

        if ( price < 1 ) {
            return res.status(400).json({ message: "Precio requerido" })
        }

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

export { getVideogame, getVideogameByName, getVideogameByGenre, createVideogame, updateVideogame, deleteVideogame };*/

const searchVideogame = async ( req, res, next ) => {
    try {
        const { q, releaseDate, platforms, genre, classification, minPrice, maxPrice, inStock, order, sort, page = 1, limit = 10 } = req.query;
        let filter = {};

        if ( q ) {
            filter.$or = [
                {name: {  $regex: q, $options: "i" } },
                {description: { $regex: q, $options: "i" } } 
            ];
        };

        if ( genre ) {
            filter.genre = genre;
        };

        if ( classification ) {
            filter.classification = classification;
        };

        if ( releaseDate ) {
            filter.releaseDate = releaseDate;
        };

        if ( platforms ) {
            filter ["platforms.platform"] =  platforms;
        }

        if ( minPrice || maxPrice ) {
            filter.price = {};
            if ( minPrice ) filter.price.$gte = parseFloat(minPrice);
            if ( maxPrice ) filter.price.$lte = parseFloat(maxPrice);
        };

        if ( inStock === "true" ) filter.stock = { $gt: 0};
        else if ( inStock === "false" ) filter.stock = { $eq: 0 };

        let sortOption = {};

        if ( sort ) {
            const sortOrder = order === "desc" ? -1 : 1;
            sortOption[sort] = sortOrder;
        };

        const skip = ( parseInt(page) - 1 ) * parseInt(limit);

        const videogames = await Videogame.find(filter).populate("genre").populate("classification").populate("platforms.platform").sort(sortOption).skip(skip).limit(parseInt(limit));

        const totalVideogames = await Videogame.countDocuments( filter );
        const pages = Math.ceil( totalVideogames / parseInt(limit) );
    
        res.json({
            videogames,
            pagination: {
                currentPage: parseInt(page),
                pages,
                totalResults: totalVideogames,
                hasNext: parseInt(page) < pages,
                hasPrev: parseInt(page) > 1,
            }
        });
        
    } catch (error) {
        next(error);
    };

};

export { searchVideogame, createVideogame };