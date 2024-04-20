import express from 'express';
import getLatestCollegeInfo from '../controllers/collegeInfo_controllers/getLatestCollegeInfo.js';
import putLatestCollegeInfo from '../controllers/collegeInfo_controllers/putLatestCollegeInfo.js';

const router = express.Router();
// '/api/v1/additionalInfo'
router.get('/insertLatestCollegeInfo/:customKey', putLatestCollegeInfo);
router.get('/latestCollegeInfo', getLatestCollegeInfo);

export default router;
