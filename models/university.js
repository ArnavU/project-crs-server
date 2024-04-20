import mongoose from 'mongoose';

const universitySchema = new mongoose.Schema({
    university: {
        type: String,
        required: true,
        unique: true,
    },
    colleges: {
        type: [String],
        required: true,
    }
})

export const universityModel = mongoose.model("University", universitySchema);