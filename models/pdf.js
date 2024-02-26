import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema({
	name: String,
	content: Buffer,
    year: Number,
    round: Number,
    exam: String
});

export const PdfModel = mongoose.model('Pdf', pdfSchema);

