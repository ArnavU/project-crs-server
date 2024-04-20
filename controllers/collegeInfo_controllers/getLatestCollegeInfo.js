import { CollegeInfoModel } from "../../models/collegeInfo.js"

const getModified_College_Info_Obj = (infoList) => {
    let modObj = {};

    for(let obj of infoList) {
        modObj[obj.college] = {};
        modObj[obj.college].hyperLink = obj.hyperLink;
        modObj[obj.college].establishmentYear = obj.establishmentYear;
        modObj[obj.college].courses_offered = obj.courses_offered;
        modObj[obj.college].information = obj.information;
        modObj[obj.college].campus_details = obj.campus_details;
        modObj[obj.college].accreditation_status = obj.accreditation_status;
        modObj[obj.college].affiliation = obj.affiliation;
        modObj[obj.college].fee_structure = obj.fee_structure;
        modObj[obj.college].placement = obj.placement;
        modObj[obj.college].contact_info = obj.contact_info;
    }

    return modObj;  

}

async function getLatestCollegeInfo(req, res) {
    let infoList = await CollegeInfoModel.find();


    let modified_College_Info_Obj = getModified_College_Info_Obj(infoList);

    res.status(200).json(modified_College_Info_Obj);
}

export default getLatestCollegeInfo