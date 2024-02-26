import { PdfModel } from "../models/pdf.js";
import fs from 'fs';

export const savePdf = (path, originalName, exam, year, round) => {
	year = Number(year);
	round = Number(round);

	return new Promise(async (resolve, reject) => {
		try {
			// Read the PDF file as a buffer
			const pdfBuffer = await fs.promises.readFile(path);
			// Create a document with the PDF file buffer
			const pdfDocument = new PdfModel({
				name: originalName,
				content: pdfBuffer,
				year: year,
				round: round,
				exam: exam,
			});

			await pdfDocument.save();
			resolve("PDF saved successfully");
		} catch (err) {
			console.log("Error saving PDF: ", err);
			reject("Error saving PDF: ", err);
		} finally {
			
		}
	});
};
