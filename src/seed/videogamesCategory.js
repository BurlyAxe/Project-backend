import mongoose from "mongoose";
import dotenv from "dotenv";
import Genre from "../models/Genre.js";
import Platform from "../models/Plataform.js";
import Classification from "../models/Clasification.js";
import Videogame from "../models/Videogame.js";

dotenv.config();

async function seed() {

    try {
        const dbURI = process.env.MONGO_URI || process.env.MONGODB_URI;

        await mongoose.connect(dbURI);
        console.log("MongoDB conectado");
        await Videogame.deleteMany({});
        await Genre.deleteMany({});
        await Platform.deleteMany({});
        await Classification.deleteMany({});

        const genresData = [
            {
                name: "Action",
                slug: "action",
            },
            {
                name: "RPG",
                slug: "rpg",
            },
            {
                name: "Shooter",
                slug: "shooter",
            },
            {
                name: "Adventure",
                slug: "adventure",
            },
            {
                name: "Sports",
                slug: "sports",
            },
        ];

        const genres = {};

        for (const genreData of genresData) {
            const genre = await Genre.create(genreData);
            genres[genre.name] = genre;
        }

        const platformsData = [
            {
                name: "PlayStation 5",
                slug: "playstation-5",
            },
            {
                name: "Xbox Series X",
                slug: "xbox-series-x",
            },
            {
                name: "PC",
                slug: "pc",
            },
            {
                name: "Nintendo Switch",
                slug: "nintendo-switch",
            },
        ];

        const platforms = {};
        for (const platformData of platformsData) {
            const platform = await Platform.create(platformData);
            platforms[platform.name] = platform;
        }

        const classificationsData = [
            {
                name: "Everyone",
                code: "E",
            },
            {
                name: "Teen",
                code: "T",
            },
            {
                name: "Mature",
                code: "M",
            },
        ];

        const classifications = {};

        for (const classificationData of classificationsData) {
            const classification = await Classification.create(classificationData);
            classifications[classification.code] = classification;
        }

        const videogamesData = [
            {
                name: "The Witcher 3",
                description: "RPG de mundo abierto ambientado en fantasía medieval.",
                releaseDate: new Date("2015-05-19"),

                platforms: [
                    platforms["PlayStation 5"]._id,
                    platforms["Xbox Series X"]._id,
                    platforms["PC"]._id,
                ],

                genre: genres["RPG"]._id,

                classification: classifications["M"]._id,

                price: 59.99,

                stock: 15,
            },

            {
                name: "EA Sports FC 25",
                description: "Videojuego de fútbol con licencias oficiales.",

                releaseDate: new Date("2025-09-20"),

                platforms: [
                    platforms["PlayStation 5"]._id,
                    platforms["Xbox Series X"]._id,
                    platforms["PC"]._id,
                ],

                genre: genres["Sports"]._id,

                classification: classifications["E"]._id,

                price: 69.99,

                stock: 30,
            },

            {
                name: "Call of Duty Black Ops 6",
                description: "Shooter multijugador y campaña militar.",

                releaseDate: new Date("2025-10-25"),

                platforms: [
                    platforms["PlayStation 5"]._id,
                    platforms["Xbox Series X"]._id,
                    platforms["PC"]._id,
                ],

                genre: genres["Shooter"]._id,

                classification: classifications["M"]._id,

                price: 79.99,

                stock: 20,
            },

            {
                name: "The Legend of Zelda Tears of the Kingdom",
                description: "Aventura épica de Nintendo.",

                releaseDate: new Date("2023-05-12"),

                platforms: [
                    platforms["Nintendo Switch"]._id,
                ],

                genre: genres["Adventure"]._id,

                classification: classifications["E"]._id,

                price: 69.99,

                stock: 10,
            },

            {
                name: "Elden Ring",
                description: "RPG de acción desafiante desarrollado por FromSoftware.",

                releaseDate: new Date("2022-02-25"),

                platforms: [
                    platforms["PlayStation 5"]._id,
                    platforms["Xbox Series X"]._id,
                    platforms["PC"]._id,
                ],

                genre: genres["RPG"]._id,

                classification: classifications["M"]._id,

                price: 59.99,

                stock: 18,
            },
        ];

        for (const videogameData of videogamesData) {
            await Videogame.create(videogameData);
        }
        console.log("Seed completado correctamente");
        await mongoose.disconnect();
    } catch (error) {
        console.error("Error ejecutando seed:", error);
        await mongoose.disconnect();
    }
}

seed();