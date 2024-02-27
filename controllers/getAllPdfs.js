import { PdfModel } from "../models/pdf.js";

export const getAllPdfs = async (req, res) => {
	const {year} = req.params;
	console.log(year)
	try {
		// Retrieve all PDFs from the database
		const pdfs = await PdfModel.find({year: year});
		console.log("Data fetched")

		// Send the array of PDFs in the response
		res.status(200).json(pdfs);
	} catch (err) {
		console.error("Error fetching PDFs: ", err);
		res.status(500).json({ message: "Internal server error" });
	}
};
