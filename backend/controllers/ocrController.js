const path = require('path');
const { extractDataFromImage } = require('../services/ocrService');

exports.scanPassbook = async (req, res) => {
  try {
    const imagePath = path.join(__dirname, '..', req.file.path);
    const result = await extractDataFromImage(imagePath);

    res.json(result);
  } catch (error) {
    res.status(500).send('OCR processing failed.');
  }
};
