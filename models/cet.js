import mongoose from "mongoose";

const cetSchema = new mongoose.Schema({
    year: {
        type: Number,
        required: true,
    },
    round: {
        type: Number,
        required: true,
    },
    data: {
        type: [{ type: mongoose.Schema.Types.Mixed }],
        required: true,
    }
})

export const CetModel = mongoose.model("CetModel", cetSchema);