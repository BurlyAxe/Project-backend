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
            maxlength: 16,
            required: function () {
                return this.type === "credit_card";
            }
        },
        cardHolder: {
            type: String,
            trim: true,
            required: true,
            required: function () {
                return this.type === "credit_card";
            }
        },
        cvv: {
            type: String,
            maxlength: 4,
            required: function () {
                return this.type === "credit_card";
            }
        },
        expirationDate: {
            type: Date,
            required: true,
            validate: {
                validator: function (value) {
                    return value > new Date();
                },
                message: "La tarjeta está expirada"
            }
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