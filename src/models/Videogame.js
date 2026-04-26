import mongoose from 'mongoose';

const videogameSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        releaseDate: {
            type: Date,
        },
       platforms: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Platform',
        }
    ],
        genre: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Genre',
        },
        classification: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        stock: {
            type: Number,
            default: 1,
        },
    },
    {
        timestamps: true,
    }
);

const Videogame = mongoose.model("Videogame", videogameSchema);

export default Videogame;