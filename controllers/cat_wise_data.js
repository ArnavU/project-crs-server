import axios from "axios";
import { CetModel } from "../models/cet.js";
import {mapping} from "../constants/mapping.js";

// seperating the data category wise
const seperateTheData = (data, sType, university) => {
	const arr = [];
	sType = sType.toUpperCase();

	for (let obj of data) {
		for(let key in obj) {
			if(key.toLowerCase().endsWith('h') && obj.university===university) {
				const temp = {};
				temp.college = obj.college.slice(7);
				temp.course = obj.Course.slice("100219110 - ".length);
				temp.percentile = obj[key].percentile;
				temp.rank = obj[key].rank;
				temp.seatType = key;
				temp.university = obj.university;
				temp.hyperLink = obj.hyperLink;
				arr.push(temp);
			}
		}
		if (sType in obj) {
			const temp = {};
			temp.college = obj.college.slice(7);
			temp.course = obj.Course.slice("100219110 - ".length);
			temp.percentile = obj[sType].percentile;
			temp.rank = obj[sType].rank;
			temp.seatType = sType;
			temp.university = obj.university;
			temp.hyperLink = obj.hyperLink;
			arr.push(temp);
		}
	}

	// console.log(arr);
	return arr;
};

// ############################################### Route controller ###############################################
export const getSeatTypeWiseData = async (req, res) => {
	const { sType, year, round, university } = req.params;

	try {
		const data = await CetModel.findOne({ year: year, round: round });
		// console.log(data[0].data);
		console.log(sType, year, round);

		// seperate the data category wise
		const catDataArray = seperateTheData(data.data, sType, university);

		res.status(200).json({
			success: true,
			data: catDataArray,
		});
	} catch (error) {
		res.status(200).json({
			success: false,
			message: error.message,
		});
	}
};

const getSortedAndUniqueData = (dataArr) => {
	// Group data by college and course
	const groupedData = dataArr.reduce((acc, obj) => {
		const key = obj.college + obj.course;
		if (!acc[key] || acc[key].percentile > obj.percentile) {
			acc[key] = obj;
		}
		return acc;
	}, {});

	// Convert grouped data back to an array
	const uniqueData = Object.values(groupedData);

	// Sort the unique data by percentile
	// uniqueData.sort((a, b) => a.percentile - b.percentile);

	return uniqueData;
};

// ############################################### Route controller ###############################################
// 						 eg: sc, obc, ...
// '/api/v1/colleges/cet/:category/:gender/:year/:round/'
export const getAllotmentData = async (req, res) => {
	const { category, gender, year, round, university } = req.params;
	const exam = 'mht-cet';

	let key = `(${gender}, ${category})`;

	// Convert the key array to a string
	console.log(key);

	let sTypes = mapping.get(key);

	try {
		// relative routing required ####################################################################################

		let response = null;
		let data = null;
		let dataArr = [];
		for (let sType of sTypes) {
			// 'api/v1/colleges/cet/:sType/:year/:round'
			// getSeatTypeWiseData()
			response = await axios.get(
				`${process.env.BASE_URI}/api/v1/colleges/cet/${sType}s/${year}/${round}/${university}`
			);
			data = response.data.data;
			dataArr.push(...data);

			response = await axios.get(
				`${process.env.BASE_URI}/api/v1/colleges/cet/${sType}o/${year}/${round}/${university}`
			)
			data = response.data.data;
			dataArr.push(...data);
		}

		let uniqueDataArr = getSortedAndUniqueData(dataArr);

		res.status(200).json({
			success: true,
			// data: response.data.data,
			data: uniqueDataArr,
		});
	} catch (err) {
		res.status(200).json({
			success: true,
			data: err.message,
		});
	}
};
