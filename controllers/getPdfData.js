import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
import { runPythonMain } from "./runPythonMain.js";
import { installDependencies } from "./pythonDependencies.js";
import { runPythonXlsx_to_csv } from "./runPythonXlsx_to_csv.js";
import fetchData, { fetchSeatType } from "./fetch_data.js";
import { addRowsToDatabase, addSeatTypeToDatabase } from "./add_to_DB.js";
import { savePdf } from "./savePdf.js";
import { YearList } from "../models/yearList.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getPdfData = async (req, res) => {
	const { exam, year, round } = req.params;
	console.log(exam, year, round);

	// Check if a file was uploaded
	if (!req.file) {
		return res.status(400).json({ error: "No file uploaded" });
	}

	// Assuming req.file.path contains the path to the uploaded file
	const filePath = req.file.path;

	// Specify the directory where you want to store the PDF files
	const uploadDir = path.join(__dirname, "../uploads");

	// Move the uploaded file to the specified directory

	fs.renameSync(filePath, path.join(uploadDir, "cutoffPdf.pdf"));

	// ########################## Convert pdf to excel ################################
	// 1st install dependencies
	// try {
	// 	await installDependencies();
	// 	console.log("Dependencies installed");
	// } catch (err) {
	// 	console.log("Error installing dependencies: ", err);
	// }

	// run the python script to convert pdf to xlsx
	try {
		await runPythonMain();
		console.log("Python script executed successfully");
	} catch (err) {
		console.log("Error executing PYTHON script", err);
	}

	// run other python script to convert xlsx to csv
	try {
		await runPythonXlsx_to_csv();
		console.log("Converted to csv");
	} catch (err) {
		console.log(err);
	}

	// Add to database
	try {
		const arrayOfObj = await fetchData();
		let p = await addRowsToDatabase(arrayOfObj, year, round);
		console.log(p);
	} catch (err) {
		console.log("Some Error occured while processing csv");
	}

	try {
		if (round == 1) {
			const arrayOfSeatType = await fetchSeatType();
			await addSeatTypeToDatabase(arrayOfSeatType, year, exam);
		}
	} catch (err) {
		console.log(err);
	}

	// save pdf to database
	try {
		//  exam, year, round
		const p = await savePdf(
			"./uploads/cutoffPdf.pdf",
			req.file.originalname,
			"mht-cet",
			year,
			round
		);
		console.log(p);
	} catch (err) {
		console.log(err);
	}

	// modify yearList
	// modify the yearList document
	try {
		const yearList = await YearList.findOne({ examType: "mht-cet" });
		console.log(yearList);

		const yearListObj = yearList.yearList;
		if (yearListObj == null) {
			yearListObj = {};
		}
		if (yearListObj[year] != null) {
			yearListObj[year]++;
		} else {
			yearListObj[year] = 1;
		}

		const updatedDoc = await YearList.findOneAndUpdate(
			{ examType: "mht-cet" },
			{
				yearList: yearListObj,
			},
			{ new: true }
		);

		console.log("Updated YearList: \n", updatedDoc)
	} catch (error) {
		res.status(400).json({
			success: false,
			message: "Cound not update yearList",
		});
	}

	res.status(200).json({ message: "File uploaded successfully" });
};
