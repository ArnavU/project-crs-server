import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema({
    college: String,
    hyperLink: String,
    establishmentYear: String,
    courses_offered: String,
    information: String, 
    campus_details: String,
    accreditation_status: String, 
    affiliation: String,
    fee_structure: String, 
    placement: String,
    contact_info: String,
})

export const CollegeInfoModel = mongoose.model("CollegeInfo", collegeSchema); 