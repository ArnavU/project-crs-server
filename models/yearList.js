import mongoose from "mongoose";

const yearListSchema = new mongoose.Schema({
	examType: {
		type: String,
		required: true,
	},
	yearList: {
		type: mongoose.Schema.Types.Mixed ,
		required: true,
	},
});


export const YearList = mongoose.model("YearList", yearListSchema);