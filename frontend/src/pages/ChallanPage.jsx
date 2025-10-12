import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './ChallanPage.module.css';

const ChallanPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, total, denominations } = location.state || {}; // Get denominations from state

  const handlePrint = () => {
    const handleAfterPrint = () => {
      // Navigate back to the initial page after printing (or closing print dialog)
      navigate('/', { replace: true });
    };

    window.addEventListener('afterprint', handleAfterPrint, { once: true });
    window.print();
  };

  return (
    <div className={styles.container}>
      <div className={styles.challanCard}>
        <h1 className={styles.title}>Transaction Challan</h1>
        <div className={styles.details}>
          <p><strong>Name:</strong> {user?.accountHolderName || 'Unknown'}</p>
          <p><strong>Account Number:</strong> {user?.accountNumber || 'Unknown'}</p>
          <p><strong>IFSC Code:</strong> {user?.ifsc || 'Unknown'}</p>
          <p><strong>Transaction Amount:</strong> ₹{total || '0'}</p>
          <h2>Denomination Breakdown:</h2>
          {denominations &&
            Object.entries(denominations).map(([denomination, count]) => (
              count > 0 && (
                <p key={denomination}>
                  <strong>₹{denomination}:</strong> {count} {count > 1 ? 'notes' : 'note'}
                </p>
              )
            ))}
        </div>
        <button onClick={handlePrint} className={styles.printButton}>Print Challan</button>
      </div>
    </div>
  );
};

export default ChallanPage;
