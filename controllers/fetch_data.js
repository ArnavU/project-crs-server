import { createReadStream } from "fs";
import csv from "csv-parser";
import {getCollege_university_mapping} from './college_university_mapping.js';
import { getCollegeUrlMapping } from "./getCollegeUrlMapping.js";

// Path to the CSV file
const csvFilePath = "./uploads/cutoffCSV.csv";

/*

[   
    {
        college_name: ___,
        Course: __,
        GOPENS: {
            percentile: __,
            rank: __,
        }, 
        GSCS :{

        },
    },
    {

    },
]

*/

let arrayOfObj = [];
let universityMapping = new Map();
let collegeUrlMapping = new Map();

const insertRowIntoArray = (row) => {
    let temp = {};
    temp.college = row['College Name'];
    temp.Course = row.Course;

    temp.university = universityMapping.get(temp?.college?.toLowerCase());
    temp.hyperLink = collegeUrlMapping.get(temp?.college.slice(7));
    console.log(temp.hyperLink);

    for(let col in row) {
        if(row[col] == '-') {
            continue;
        }

        let category = "";
        let percentile = null;
        let rank = null;

        if(col.includes("Percentage")) {
            category = col.replace("Percentage ", "");
            percentile = Number(row[col]);

            if(!temp[category]) {
                temp[category] = {};
            }
            temp[category].percentile = percentile;
        }
        else if(col.includes("Rank")) {
            category = col.replace("Rank ", "");
            rank = Number(row[col]);

            temp[category].rank = rank;
        }
    }

    arrayOfObj.push(temp);
}

/*
{
    college: __,
    Course: "100219110 - Civil Engineering",
    rank cat1: __,
    percetile cat1: __,
    rank cat2: __,
    percentil cat2: __,
    .
    .
    .
}
*/

const setUniversityMapping = async() => {
    getCollege_university_mapping()
    .then((res) => {
        universityMapping = res;
    })
    .catch((e) => {
        console.log("Some error occured: ", e);
    })
}


const fetchData = async() => {
    arrayOfObj = [];

    await setUniversityMapping();
    collegeUrlMapping = await getCollegeUrlMapping();

    console.log(universityMapping);

    return new Promise((res, rej) => {
        // Read the CSV file
        createReadStream(csvFilePath)
        .pipe(csv())
        .on("data", (row) => {
            insertRowIntoArray(row);
        })
        .on("end", () => {
            console.log("CSV file successfully processed");
            
            // console.log(arrayOfObj);
            res(arrayOfObj);
        });
    })
}

let arrayOfSeatType = [];
const getAllSeatType = (row) => {
    let category = "";
    for(let col in row) {
        if(col.includes("Percentage")) {
            category = col.replace("Percentage ", "");
            arrayOfSeatType.push(category);
        }
        else if(col.includes("Rank")) {
            category = col.replace("Rank ", "");
            arrayOfSeatType.push(category);
        }
    }

    arrayOfSeatType = arrayOfSeatType.sort().filter((ele, ind, arr) => {
        return ((ind==0) || (ind>0 && arr[ind]!=arr[ind-1]));
    })
}

export const fetchSeatType = () => {
    return new Promise((res, rej) => {
        // reading only first row of the csv to get the category list
        const stream = createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (row) => {
            getAllSeatType(row);
            res(arrayOfSeatType);
            stream.destroy();
        })
    })
}

export default fetchData;