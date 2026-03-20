import mongoose from "mongoose";

const classificationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        code: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        }
    },
    {
        timestamps: true,
    },
);

const Classification = mongoose.model("Classification", classificationSchema);

export default Classification;