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
                },
                price: {
                    type: Number,
                    min: 1,
                },
            },
        ],
        shippingCost: {
            type: Number,
            min: 0,
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        paymentSatuts: {
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