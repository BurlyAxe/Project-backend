import mongoose from "mongoose";


const paymentMethodSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        type: {
            type: String,
            enum: ["credit_card", "paypal", "bank_transfer"],
            required: true,
        },
        cardNumber: {
            type: String,
            max: 16,
        },
        cardHolder:{
            type: String,
            trim: true,
        },
        cvv: {
            type: String,
            max: 4,
        },
        expirationDate: {
            type: Date,
        },
        isDefault: {
            type: Boolean,
            default: false,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    },
);

const PaymentMethod = mongoose.model("PaymentMethod", paymentMethodSchema);

export default PaymentMethod;