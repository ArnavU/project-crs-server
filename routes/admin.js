import express from "express";
import { getPdfData } from "../controllers/getPdfData.js";
import multer from "multer";

let router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });

const upload = multer({ storage: storage });
// api/v1/admin
router.post("/pdf/:exam/:year/:round", upload.single("pdfFile"), getPdfData);

export default router;
