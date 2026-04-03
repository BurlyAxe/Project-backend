import mongoose from "mongoose";
import Genre from "../models/Genre.js";

const getGenres = async (req, res, next) => {
    try {
        const genres = await Genre.find();
        res.json(genres);
    } catch (error) {
        next(error);
    }
};

const createGenre = async (req, res, next) => {
    try {
        const { name } = req.body;
        const newGenre = await Genre.create({ name });
        res.status(201).json(newGenre);
    } catch (error) {
        next(error);
    }
};

export { getGenres, createGenre };