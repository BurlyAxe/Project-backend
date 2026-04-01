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
                platform: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Platform',
                }
            },
        ],
        genre: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Genre',
        },
        classification: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Classification',
        },
        price: {
            type: Number,
            required: true,
        },
        stock: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Videogame = mongoose.model("Videogame", videogameSchema);

export default Videogame;