import mongoose from "mongoose";
import Platform from "../models/Plataform.js";

const getPlatforms = async (req, res, next) => {
    try {
        const platforms = await Platform.find();
        res.json(platforms);
    } catch (error) {
        next(error);
    }
};

const createPlatform = async (req, res, next) => {
    try {
        const { name } = req.body;
        const slug = name.toLowerCase().replace(/ /g, "-");
        
        const newPlatform = await Platform.create({ name, slug });

        res.status(201).json(newPlatform);
    } catch (error) {
        next(error);
    }
};

export { getPlatforms, createPlatform };