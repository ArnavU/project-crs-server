import express from "express";
import { getAllotmentData, getSeatTypeWiseData } from "../controllers/cat_wise_data.js";

const router = express.Router();

// seatType -- GOBCS, GOPENS, ...
// year -- 2021, 2022, ...
// round -- 1, 2, ...

router.get('/cet/:sType/:year/:round/:university', getSeatTypeWiseData);

// '/api/v1/colleges'
router.get('/cet/:category/:gender/:year/:round/:university', getAllotmentData);



export default router;