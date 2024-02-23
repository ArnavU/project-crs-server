import express from "express";
import { getAllotmentData, getCategoryWiseData } from "../controllers/cat_wise_data.js";

const router = express.Router();

// seatType -- GOBCS, GOPENS, ...
// year -- 2021, 2022, ...
// round -- 1, 2, ...

router.get('/cet/:sType/:year/:round', getCategoryWiseData);

// '/api/v1/colleges'
router.get('/cet/:category/:gender/:year/:round', getAllotmentData);



export default router;