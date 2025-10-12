import React, { useState } from 'react';
import styles from './OCRScanner.module.css';

const OCRScanner = ({ onScanComplete }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleScan = async () => {
    if (!image) {
      alert('Please select an image first.');
      return;
    }

    setIsScanning(true);
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await fetch('http://localhost:8080/api/ocr/scan', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      onScanComplete(data);
    } catch (error) {
      console.error('Error scanning passbook:', error);
    }
    setIsScanning(false);
  };

  return (
    <div className={styles.container}>
      {/* <p>Keep your passbook for scan</p> */}
      <input type="file"  accept="image/*" onChange={handleFileChange} />
      <button
        onClick={handleScan}
        disabled={isScanning}
        className={styles.button}
      >
        {isScanning ? 'Scanning...' : 'Scan'}
      </button>
    </div>
  );
};

export default OCRScanner;
