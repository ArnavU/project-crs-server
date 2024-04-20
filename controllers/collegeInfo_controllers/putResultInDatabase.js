import { CollegeInfoModel } from "../../models/collegeInfo.js";

const putResultInDatabase = async (college, info) => {
	let infoList = info.split(";");
	await CollegeInfoModel.deleteMany({ college: college });
	const response = await CollegeInfoModel.create({
		college: college,
		hyperLink: infoList[0],
		establishmentYear: infoList[1],
		courses_offered: infoList[2],
		information: infoList[3],
		campus_details: infoList[4],
		accreditation_status: infoList[5],
		affiliation: infoList[6],
		fee_structure: infoList[7],
		placement: infoList[8],
		contact_info: `${infoList[9]}${infoList?.[10] ? ", " + infoList[10] : ""}`,
	});
};

export default putResultInDatabase;
