import express from "express";
import { getCollegeList, getBranchList, getSeatTypeList, getYearList, getData, getCategoryList } from "../controllers/lists.js";
import { getAllPdfs } from "../controllers/getAllPdfs.js";
import { getAllUniversitiesMapping } from "../controllers/getAllUniversities.js";
import { getAllUniversities } from "../controllers/getAllUniversities.js";

const router = express.Router();

// '/api/v1/lists'
router.get('/colleges/cet', getCollegeList)
router.get('/branches/cet', getBranchList);
router.get('/seatTypes/:examType/:year', getSeatTypeList);
router.get('/categories/:examType/:year', getCategoryList);
router.get('/yearList/:examType', getYearList);
router.get('/pdfList/:year/:round', getAllPdfs);
router.get('/universitiesMapping', getAllUniversitiesMapping);
router.get('/universities', getAllUniversities);


// debug route
// '/api/v1/lists'
router.get('/allData/cet/:year', getData);


export default router;