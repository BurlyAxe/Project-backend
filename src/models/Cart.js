import mongoose from "mongoose"

const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        videogames: [
            {
                videogame: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Videogame",
                },
                quantity: {
                    type: Number,
                    min: 1,
                }
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;