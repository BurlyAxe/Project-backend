import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
        required: true,
    },
    paymentMethod: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PaymentMethod",
        required: true,
    },
    videogames: [
        {
            videogame: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Videogame",
                required: true,
            },
            quantity: {
                type: Number,
                min: 1,
                required: true,
            },
            price: {
                type: Number,
                min: 1,
                required: true,
            },
        },
    ],
    shippingCost: {
        type: Number,
        min: 0,
        default: 0,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed"],
        default: "pending",
    },
    status: {
        type: String,
        enum: ["pending", "shipped", "delivered", "cancelled"],
        default: "pending",
    },
},
{
    timestamps: true,
}
);

const Order = mongoose.model("Order", orderSchema);

export default Order;