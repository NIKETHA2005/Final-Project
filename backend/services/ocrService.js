const Tesseract = require('tesseract.js');

exports.extractDataFromImage = async (imagePath) => {
  try {
    const { data: { text } } = await Tesseract.recognize(imagePath, 'eng', {
      logger: (info) => console.log(info), // Logs OCR progress
    });
    console.log('OCR Extracted Text:', text); // Debug the extracted text

    const cleanedText = text.replace(/\s+/g, ' '); // Replace multiple spaces with a single space

    // Use regex to extract Account Number and IFSC Code
    const accountNumberMatch = text.match(/Account\s*Number\s*[:\-\s]*([\d]+)/i);

    // const accountNumberMatch = text.match(/(Account\s*Number|Account\s*No,|A\/C\s*No)[:]?\s*([\d]+)/i);

    // const accountNumberMatch = text.match(/(?:Account\s*No|A\/C\s*No)\s*|Account\s*Number\s*[:\-\s]*([\d]+)/i);
    // const ifscCodeMatch = text.match(/(?:IFSC\s*Code|IFSC)\s*[:\-\s]*([A-Z]{4}0[A-Z0-9]{6})/i);

    const ifscCodeMatch = text.match(/IFSC\s*Code\s*[:\-\s]*([A-Z0-9]+)/i);

    // const accountNumberMatch = text.match(/Account\s*No[,:]?\s*([\d]+)/i);
    // const ifscCodeMatch = text.match(/IFSC[,:]?\s*([A-Z]{4}0[A-Z0-9]{6})/i);

    return {
      accountNumber: accountNumberMatch ? accountNumberMatch[1] : null,
      ifscCode: ifscCodeMatch ? ifscCodeMatch[1] : null,
    };
  } catch (error) {
    console.error('OCR Error:', error);
    throw new Error('Failed to process OCR');
  }
};
