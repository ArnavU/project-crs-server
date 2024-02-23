import { CetModel } from "../models/cet.js";
import { SeatType } from "../models/seatType.js";
import { YearList } from "../models/yearList.js";

// ############################ Route Controller ############################
export const getCollegeList = async (req, res) => {
	try {
		const data = await CetModel.findOne({ year: 2022, round: 1 });

		const collegeArray = data.data
			.map((obj) => {
				return obj.college.slice(7);
			})
			.filter((college, index, arr) => {
				return (
					arr.length == 0 ||
					(index > 0 && arr[index] != arr[index - 1]) ||
					index == 0
				);
			});

		res.status(200).json({
			message: "success",
			data: collegeArray,
		});
	} catch (error) {
		res.status(404).json({
			message: error.message,
		});
	}
};

// ############################ Route Controller ############################
export const getBranchList = async (req, res) => {
	const data = await CetModel.findOne({ year: 2022, round: 1 });

	const branches = data.data
		.map((obj) => {
			return obj.Course.slice(12);
		})
		.sort()
		.filter((colege, index, arr) => {
			return (
				arr.length == 0 ||
				(index > 0 && arr[index] != arr[index - 1]) ||
				index == 0
			);
		});

	res.status(200).json({
		message: "success",
		data: branches,
	});
};

// ############################ Route Controller ############################
// not used -- alternative - getCategoryList
export const getSeatTypeList = async (req, res) => {
	const { examType, year } = req.params;

	try {
		const data = await SeatType.findOne({ year: year, examType: examType });
		res.status(200).json({
			message: "success",
			data: data.seatTypes,
		});
	} catch (err) {
		res.status(404).json({
			message: "failure",
		});
	}
};

const modifySeatTypes = (arr) => {

	let modifiedArr = [];
	for(let cat of arr) {
		let temp = cat;
		if(temp.endsWith("EWS")) {
			continue;
		}
		else if(cat[0] == 'L' || cat[0] == 'G') {
			temp = temp.slice(1);
		}

		if(cat.endsWith('O') || cat.endsWith('H') || cat.endsWith('S')) {
			temp = temp.slice(0, -1);
		}

		modifiedArr.push(temp);
	}

	modifiedArr = modifiedArr.sort().filter((cat, ind, arr) => {
		return (ind == 0 || (arr[ind] != arr[ind-1]));
	})

	return modifiedArr;

}

export const getCategoryList = async (req, res) => {
	const { examType, year } = req.params;

	try {
		const data = await SeatType.findOne({ year: year, examType: examType });
		let filteredList = modifySeatTypes(data.seatTypes);

		res.status(200).json({
			message: "success",
			data: filteredList,
		});
	} catch (err) {
		res.status(404).json({
			message: "failure",
		});
	}
};

// ############################ Route Controller ############################
export const getYearList = async (req, res) => {
	const { examType } = req.params;

	try {
		const data = await YearList.findOne({ examType: examType });
		res.status(200).json({
			data: data.yearList,
		})
	} catch (err) {
		res.status(404).json({
			message: "failure",
		});
	}
};

// ############################ Route Controller ############################
// debug controller
export const getData = async(req, res) => {
	const data = await CetModel.findOne({ year: 2022, round: 1 });

	res.status(200).json({
		message: "success",
		data: data.data,
	});
}
