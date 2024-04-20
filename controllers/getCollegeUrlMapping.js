import { CollegeInfoModel } from "../models/collegeInfo.js";

export const getCollegeUrlMapping = async() => {
    let mp = new Map();
    try {
        const collegeInfo = await CollegeInfoModel.find();
        for(let obj of collegeInfo) {
            mp.set(obj.college, obj.hyperLink);
        }
        console.log(mp);
        return mp;
    }
    catch(e) {
        console.log(`Some error occured while mapping url: ${e}`);
        return mp;
    }
}

