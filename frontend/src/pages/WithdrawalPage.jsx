import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import the translation hook
import styles from './WithdrawalPage.module.css';

const WithdrawalPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation(); // Initialize translation hook

  const user = location.state?.user || {}; // Extract user from state
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [error, setError] = useState('');

  const handleNext = () => {
    setError('');
    const accountBalance = user?.balance; // Fetch balance from user object

    if (!withdrawalAmount || isNaN(withdrawalAmount)) {
      setError(t('enterValidAmount'));
      return;
    }

    if (withdrawalAmount > accountBalance) {
      setError(t('insufficientBalance'));
      return;
    }

    navigate('/authentication', { state: { user, total: withdrawalAmount, type: 'withdrawal' } });
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>{t('withdrawalPageTitle')}</h1>
        <p className={styles.subtitle}>
          <strong>{t('accountHolder')}</strong> {user?.accountHolderName || t('unknown')}
        </p>
        <p className={styles.subtitle}>
          <strong>{t('accountNumberLabel')}</strong> {user?.accountNumber || t('unknown')}
        </p>
        <p className={styles.subtitle}>
          <strong>{t('accountBalance')}</strong> ₹{user?.balance?.toFixed(2) || t('unknown')}
        </p>

        <div className={styles.inputContainer}>
          <label htmlFor="withdrawalAmount" className={styles.label}>
            {t('enterWithdrawalAmount')}
          </label>
          <input
            type="number"
            id="withdrawalAmount"
            className={styles.input}
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(parseFloat(e.target.value))}
            placeholder={t('enterWithdrawalAmount')}
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button onClick={handleNext} className={styles.button}>
          {t('nextButton')}
        </button>
      </div>
    </div>
  );
};

export default WithdrawalPage;
