import { CetModel } from "../models/cet.js";
import { PdfModel } from "../models/pdf.js";
import { SeatType } from "../models/seatType.js";
import { YearList } from "../models/yearList.js";

export const deletePdf = async (req, res) => {
	let { year, round, exam, name } = req.params;

	try {
		const cetDocDel = await CetModel.deleteMany({
			year: year,
			round: round,
		});
		if (cetDocDel.deletedCount >= 1) {
			console.log("File cetDoc deleted successfully");
		} else {
			console.log("No cet document deleted");
			return res.status(404).json({ message: "Document not found" });
		}

		if (round == 1) {
			const seatTypeDocDel = await SeatType.deleteMany({
				year: year,
				examType: "cet",
			});
		}
		// modify the yearList document
		const yearList = await YearList.findOne({ examType: "mht-cet" });
		console.log(yearList);

		const yearListObj = yearList.yearList;
		if (yearListObj) {
			if (yearListObj[year] != null) {
				yearListObj[year]--;
			}
			if (yearListObj[year] <= 0) {
				delete yearListObj[year];
			}
		}

		const newDoc = await YearList.findOneAndUpdate(
			{ examType: "mht-cet" },
			{
				yearList: yearListObj,
			},
			{ new: true }
		);

        console.log(newDoc);

		const result = await PdfModel.deleteMany({
			year: year,
			round: round,
			exam: exam,
			name: name,
		});

		if (result.deletedCount >= 1) {
			console.log("file deleted Successfully", year, round, exam);
			return res
				.status(200)
				.json({ message: "PDF deleted successfully" });
		} else {
			return res.status(404).json({ message: "PDF not found" });
		}
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
	}
};
