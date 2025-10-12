import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './DepositPage.module.css'; // Import the CSS module

const DepositPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user || {};
  const { t } = useTranslation();
  

  const [denominations, setDenominations] = useState({
    10: 0,
    20: 0,
    50: 0,
    100: 0,
    200: 0,
    500: 0,
    2000: 0,
  });

  const handleChange = (event, denomination) => {
    setDenominations({
      ...denominations,
      [denomination]: parseInt(event.target.value || 0, 10),
    });
  };

  const calculateTotal = () => {
    return Object.entries(denominations).reduce(
      (total, [denomination, count]) => total + denomination * count,
      0
    );
  };

  const handleNext = () => {
    const total = calculateTotal();
    navigate('/authentication', { state: { user, total, denominations, type: 'deposit' } });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t('depositPageTitle')}</h1>
      <div className={styles.userDetails}>
        <p>
          <strong>{t('userLabel')}</strong> {user.accountHolderName || t('unknown')}
        </p>
        <p>
          <strong>{t('accountNumberLabel')}</strong> {user.accountNumber || t('unknown')}
        </p>
      </div>

      <div className={styles.denominations}>
        <h2>{t('currencyDenominationHeader')}</h2>
        {Object.keys(denominations).map((denomination) => (
          <div className={styles.denominationRow} key={denomination}>
            <label>
              ₹{denomination}:
              <input
                type="number"
                min="0"
                value={denominations[denomination]}
                onChange={(e) => handleChange(e, denomination)}
              />
            </label>
          </div>
        ))}
      </div>

      <h3 className={styles.total}>{t('totalAmountLabel')} ₹{calculateTotal()}</h3>
      <button className={styles.nextButton} onClick={handleNext}>
        {t('nextButton')}
      </button>
    </div>
  );
};

export default DepositPage;
