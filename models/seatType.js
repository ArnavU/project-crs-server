import mongoose from "mongoose";

const seatTypeSchema = new mongoose.Schema({
    year: Number,
    round : {
        type: Number, 
        default: 1,
    },
    examType: {
        type: String,
        required: true,
    }, 
    seatTypes: {
        type: [String],
        required: true,
    }
})

export const SeatType = mongoose.model('SeatType', seatTypeSchema);