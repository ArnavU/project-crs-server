import { CetModel } from "../models/cet.js";
import { SeatType } from "../models/seatType.js";

export const addRowsToDatabase = (arrayOfObj, year, round) => {
	return new Promise(async (res, rej) => {
		try {
			await CetModel.create({ year: year, round: round, data: arrayOfObj });
			res("Data added to Database");
	
		} catch (err) {
			rej(err.messsage);
		}
	}) 
};

export const addSeatTypeToDatabase = async (arrayOfSeatType, year, exam) => {
	try {
		await SeatType.create({ year: year, examType: exam, seatTypes: arrayOfSeatType});
	}
	catch(err) {
		console.log(err.message);
	}
}