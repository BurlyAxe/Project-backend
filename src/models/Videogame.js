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
            required: true,
        },

        classification: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Classification',
            required: true,
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        stock: {
            type: Number,
            default: 1,
            min: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Videogame = mongoose.model("Videogame", videogameSchema);

export default Videogame;