// logic 
/*
take colleges list through API
try feeding whole list to the openAi API
map the college list to the openAi result
put the mapping in the database
*/

import { CollegeInfoModel } from "../../models/collegeInfo.js";
import getResultOfEachCollegeInLoopAndPutInDatabase from "./getResultOfEachCollegeInLoopAndPutInDatabase.js";
import putResultInDatabase from "./putResultInDatabase.js";

const SERVER_URL = "https://project-crs-server-1.onrender.com/api/v1/lists/colleges/cet"


const getCollegesList = async () => {
    let response = await fetch(SERVER_URL);
    let data = await response.json();
    let list = data.data;
    // console.log(list);
    return list;
}

const putLatestCollegeInfo = async (req, res) => {
    const collegeList = await getCollegesList();
    // const collegeList = ["VIT", "MIT"];
    let {customKey} = req.params;
    if(customKey === "null") {
        customKey = null;
    }
    try {
        const result = await getResultOfEachCollegeInLoopAndPutInDatabase(collegeList, customKey);
        // await putResultInDatabase(collegeList, resultList)

        const message = "Latest college info fetched successfully from openAi";
        console.log(message)

        // collegeInfo collection length
        let collegeInfoLength = await CollegeInfoModel.countDocuments({});

        // number of colleges
        let response = await fetch(SERVER_URL);
        let data = await response.json();
        let collegeListLength = data.data.length;
    
        res.status(200).json({message, collegeInfoLength, collegeListLength});
    }
    catch(err) {
        // console.log("Error putLatestCollegeInfo: ", err);
        // collegeInfo collection length
        let collegeInfoLength = await CollegeInfoModel.countDocuments({});

        // number of colleges
        let response = await fetch(SERVER_URL);
        let data = await response.json();
        let collegeListLength = data.data.length;

        // error message 
        let message = err.message;
        console.log(err.message)
        res.json({message, collegeInfoLength, collegeListLength});
    }

}

export default putLatestCollegeInfo;
