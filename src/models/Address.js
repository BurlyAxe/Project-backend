import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        address: {
            type: String,
            required: true,
            trim: true,
        },
        country: {
            type: String,
            required: true,
            trim: true,
        },
        state: {
            type: String,
            required: true,
            trim: true,
        },
        city: {
            type: String,
            required: true,
            trim: true,
        },
        street: {
            type: String,
            required: true,
            trim: true,
        },
        postalCode: {
            type: Number,
            required: true,
            minlength: 4,
            trim: true,
        },
        phone: {
            type: Number,
            required: true,
            minlength: 10,
            trim: true,
        },
        isDefault: {
            type: Boolean,
            default: false,
        },
        addressType: {
            type: String,
            enum: ["home", "work", "other"],
            default: "home",
        }

    },
    {
        timestamps: true,
    }
);

const Address = mongoose.model("Address", addressSchema);

export default Address;