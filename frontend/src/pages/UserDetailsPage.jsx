import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './UserDetailsPage.module.css';
import UserDetails from '../components/UserDetails';

const UserDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const { state } = location;
  const accountNumber = state?.accountNumber;

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        console.log(`Fetching user details for account number: ${accountNumber}`);
        const response = await fetch(`http://localhost:8080/api/user-details/${accountNumber}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }
        const data = await response.json();

        // Ensure balance is converted to a number
        if (data.balance) {
          data.balance = parseFloat(data.balance);
        }

        console.log('Fetched user details:', data);
        setUser(data);
      } catch (error) {
        console.error('Error fetching user details:', error.message);
        setUser(null);
        setError(t('errorFetchingUserDetails'));
      }
    };

    if (accountNumber) {
      fetchUserDetails();
    } else {
      setError(t('noAccountNumberProvided'));
    }
  }, [accountNumber, t]);

  const handleAction = (action) => {
    // navigate(`/${action}`, { state: { user } });
    if (action === 'withdrawal') {
      navigate('/withdrawal', { state: { user } });
    } else if (action === 'deposit') {
      navigate('/deposit', { state: { user } });
    }
  };

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  if (!user) {
    return <p className={styles.loading}>{t('loading')}</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>{t('userDetails')}</h2>
        <p className={styles.detailRow}>
          <strong>{t('name')}:</strong> {user?.accountHolderName || t('unknown')}
        </p>
        <p className={styles.detailRow}>
          <strong>{t('accountNumber')}:</strong> {accountNumber || t('unknown')}
        </p>
        <p className={styles.detailRow}>
          <strong>{t('branch')}:</strong> {user?.branch || t('unknown')}
        </p>
        <p className={styles.detailRow}>
          <strong>{t('ifsc')}:</strong> {user?.ifsc || t('unknown')}
        </p>
        <p className={styles.detailRow}>
          <strong>{t('balance')}:</strong> ₹{user?.balance?.toFixed(2) || t('unknown')}
        </p>
      </div>

      <div className={styles.buttons}>
        <button className={styles.button} onClick={() => handleAction('deposit')}>
          {t('deposit')}
        </button>
        <button className={styles.button} onClick={() => handleAction('withdrawal')}>
          {t('withdrawal')}
        </button>
        <button
          className={styles.button}
          onClick={() =>
            navigate('/transaction-history', { state: { accountNumber } })
          }
        >
          View Transactions
        </button>
      </div>
    </div>
  );
};

export default UserDetailsPage;
