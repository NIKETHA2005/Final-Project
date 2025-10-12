const express = require('express');
const { scanPassbook } = require('../controllers/ocrController');
const multer = require('multer');

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

// Define the POST route for OCR
router.post('/scan', upload.single('image'), scanPassbook);

module.exports = router;
