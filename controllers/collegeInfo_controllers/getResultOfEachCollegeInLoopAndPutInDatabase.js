import { CollegeInfoModel } from "../../models/collegeInfo.js";
import getGptResult from "./getGptResult.js";
import putResultInDatabase from "./putResultInDatabase.js";

const getIsCollegeInfoPresent = async (collegeName) => {
    const document = await CollegeInfoModel.findOne({college: collegeName});
    if(document) {
        return true;
    }
    return false;
}

const getResultOfEachCollegeInLoopAndPutInDatabase = async (collegeList, customKey) => {
    let result = null;

    // collegeList = ['VIT', 'VIIT', 'COEP']

    try {
        for(let i=0; i<collegeList.length; i++) {
            const isCollegeInfoPresent = await getIsCollegeInfoPresent(collegeList[i]);

            if(!isCollegeInfoPresent) {

                result = await getGptResult(collegeList[i], customKey);
                await putResultInDatabase(collegeList[i], result);
                
                console.log("Info fetched for: ", collegeList[i]);
            }
            else {
                console.log("Already Present: ", collegeList[i]);
            }
        }
    }
    catch(err) {
        // console.log("Error in getResultOfEachCollegeInLoop: ", err);
        throw new Error(err.message)
    }

    return result;
}

export default getResultOfEachCollegeInLoopAndPutInDatabase;