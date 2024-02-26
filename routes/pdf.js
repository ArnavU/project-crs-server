import express from 'express';
import { deletePdf } from '../controllers/pdfController.js';

const router = express.Router();
// '/api/v1/pdf'
router.delete('/delete/:year/:round/:exam/:name', deletePdf);

export default router;
