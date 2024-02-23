import express from "express";
import { getCollegeList, getBranchList, getSeatTypeList, getYearList, getData, getCategoryList } from "../controllers/lists.js";

const router = express.Router();

// '/api/v1/lists'
router.get('/colleges/cet', getCollegeList)
router.get('/branches/cet', getBranchList);
router.get('/seatTypes/:examType/:year', getSeatTypeList);
router.get('/categories/:examType/:year', getCategoryList);
router.get('/yearList/:examType', getYearList);


// debug route
// '/api/v1/lists'
router.get('/allData/cet', getData);


export default router;