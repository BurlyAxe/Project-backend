import mongoose from "mongoose";

const genreSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            unique: true,
        },
    },
    {
        timestamps: true,
    },
);

const Genre = mongoose.model("Genre", genreSchema);

export default Genre;