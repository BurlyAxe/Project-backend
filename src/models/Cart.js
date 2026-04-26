import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    videogames: [
        {
            videogame: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Videogame",
                required: true
            },
            quantity: {
                type: Number,
                min: 1,
                required: true,
                default: 1
            }
        }
    ]
},
{
    timestamps: true
}
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;