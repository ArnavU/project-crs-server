import axios from "axios";
import { CetModel } from "../models/cet.js";

// seperating the data category wise
const seperateTheData = (data, sType) => {
	const arr = [];
	sType = sType.toUpperCase();

	for (let obj of data) {
		if (sType in obj) {
			const temp = {};
			temp.college = obj.college.slice(7);
			temp.course = obj.Course.slice("100219110 - ".length);
			temp.percentile = obj[sType].percentile;
			temp.rank = obj[sType].rank;
			temp.seatType = sType;
			arr.push(temp);
		}
	}

	// console.log(arr);
	return arr;
};

// ############################################### Route controller ###############################################
export const getCategoryWiseData = async (req, res) => {
	const { sType, year, round } = req.params;

	try {
		const data = await CetModel.find({ year: year, round: round });
		// console.log(data[0].data);
		console.log(sType, year, round);

		// seperate the data category wise
		const catDataArray = seperateTheData(data[0].data, sType);

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

const mapping = new Map([
	[`(male, open)`, ["gopen"]],
	[`(female, open)`, ["lopen", "gopen"]],
	[`(male, sc)`, ["gopen", "gsc"]],
	[`(female, sc)`, ["lopen", "gopen", "lsc", "gsc"]],
	["(male, st)", ["gopen", "st"]],
	["(female, st)", ["lopen", "gopen", "lst", "gst"]],
	["(male, dt/vj)", ["gopen", "gdt/vj"]],
	["(female, dt/vj)", ["lopen", "gopen", "ldt/vj", "gdt/vj"]],
	["(male, nt-b)", ["gopen", "gnt-b"]],
	["(female, nt-b)", ["lopen", "gopen", "lnt-b", "gnt-b"]],
	["(male, nt-c)", ["gopen", "gnt-c"]],
	["(female, nt-c)", ["lopen", "gopen", "lnt-c", "gnt-c"]],
	["(male, nt-d)", ["gopen", "gnt-d"]],
	["(female, nt-d)", ["lopen", "gopen", "lnt-d", "gnt-d"]],
	["(male, obc)", ["gopen", "gobc"]],
	["(female, obc)", ["lopen", "gopen", "lobc", "gobc"]],

	// ["(male, sbc)", ["gopen", "gxx"]],
	["(male, sbc)", ["gopen", "gsc", "gst", "gdt/vj", "gnt-b", "gnt-c", "gnt-d", "gobc", "gdt/vj"]],
	// ["(female, sbc)", ["lopen", "gopen", "lxx", "gxx"]],
	["(female, sbc)", ["lopen", "gopen", "lsc", "lst", "ldt/vj", "lnt-b", "lnt-c", "lnt-d", "lobc", "ldt/vj", "gsc", "gst", "gdt/vj", "gnt-b", "gnt-c", "gnt-d", "gobc", "gdt/vj"]],

	["(male, pwdopen)", ["pwdopen", "gopen"]],
	["(female, pwdopen)", ["pwdopen", "lopen", "gopen"]],
	["(male, pwdsc)", ["pwdopen", "gopen", "pwdsc", "gsc"]],
	["(female, pwdsc)", ["pwdopen", "lopen", "gopen", "pwdsc", "lsc", "gsc"]],
	["(male, pwdst)", ["pwdopen", "gopen", "pwdst", "gst"]],
	["(female, pwdst)", ["pwdopen", "lopen", "gopen", "pwdst", "lst", "gst"]],
	["(male, pwddt/vj)", ["pwdopen", "gopen", "pwddt/vj", "gdt/vj"]],
	["(female, pwddt/vj)", ["pwdopen", "lopen", "gopen", "pwddt/vj", "ldt/vj", "gdt/vj"]],

	// page 2
	["(male, pwdnt-b)", ["pwdopen", "gopen", "pwdnt-b", "gnt-b"]],
	["(female, pwdnt-b)", ["pwdopen", "lopen", "gopen", "pwdnt-b", "lnt-b", "gnt-b"]],
	["(male, pwdnt-c)", ["pwdopen", "gopen", "pwdnt-c", "gnt-c"]],
	["(female, pwdnt-c)", ["pwdopen", "lopen", "gopen", "pwdnt-c", "lnt-c", "gnt-c"]],
	["(male, pwdnt-d)", ["pwdopen", "gopen", "pwdnt-d", "gnt-d"]],
	["(female, pwdnt-d)", ["pwdopen", "lopen", "gopen", "pwdnt-d", "lnt-d", "gnt-d"]],
	["(male, pwdobc)", ["pwdopen", "gopen", "pwdobc", "gobc"]],
	["(female, pwdobc)", ["pwdopen", "lopen", "gopen", "pwdobc", "lobc", "gobc"]],
	["(male, defopen)", ["defopen", "gopen"]],
	["(female, defopen)", ["defopen", "lopen", "gopen"]],
	["(male, defsc)", ["defopen", "gopen", "defsc", "gsc"]],
	["(female, defsc)", ["defopen", "lopen", "gopen", "defsc", "lsc", "gsc"]],
	["(male, defst)", ["defopen", "gopen", "defst", "gst"]],
	["(female, defst)", ["defopen", "lopen", "gopen", "defst", "lst", "gst"]],
	["(male, defdt/vj)", ["defopen", "gopen", "defdt/vj", "gdt/vj"]],
	["(female, defdt/vj)", ["defopen", "lopen", "gopen", "defdt/vj", "ldt/vj", "gdt/vj"]],
	["(male, defnt-b)", ["defopen", "gopen", "defnt-b", "gnt-b"]],
	["(female, defnt-b)", ["defopen", "lopen", "gopen", "defnt-b", "lnt-b", "gnt-b"]],
	["(male, defnt-c)", ["defopen", "gopen", "defnt-c", "gnt-c"]],
	["(female, defnt-c)", ["defopen", "lopen", "gopen", "defnt-c", "lnt-c", "gnt-c"]],
	["(male, defnt-d)", ["defopen", "gopen", "defnt-d", "gnt-d"]],
	["(female, defnt-d)", ["defopen", "lopen", "gopen", "defnt-d", "lnt-d", "gnt-d"]],

	// page 3
	["(male, defobc)", ["defopen", "gopen", "defobc", "gobc"]],
	["(female, defobc)", ["defopen", "lopen", "gopen", "defobc", "lobc", "gobc"]],
	["(male, orphan)", ["orphan", "gopen"]],
	["(female, orphan)", ["orphan", "lopen", "gopen"]],
]);

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
	const { category, gender, year, round } = req.params;
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
			response = await axios.get(
				`${process.env.BASE_URI}/api/v1/colleges/cet/${sType}s/${year}/${round}`
			);
			data = response.data.data;
			dataArr.push(...data);

			response = await axios.get(
				`${process.env.BASE_URI}/api/v1/colleges/cet/${sType}o/${year}/${round}`
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
