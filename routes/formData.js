import express from 'express';
import { getCetData } from '../controllers/formData.js';

const router = express.Router();

// gender, category, percentile, rank, college, branch, year, round
// '/api/v1/form'
router.get('/cet/:gender/:category/:percentile/:rank/:college/:branch/:year/:round/:university', getCetData);

export default router;
