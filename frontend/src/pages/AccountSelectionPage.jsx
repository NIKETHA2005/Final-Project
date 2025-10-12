import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AccountSelectionPage.module.css';

const AccountSelectionPage = ({ user }) => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);

  useEffect(() => {
    // Fetch accounts from backend
    const fetchAccounts = async () => {
      const response = await fetch(`http://localhost:8080/api/users`);
      const data = await response.json();
      setAccounts(data);
    };
    fetchAccounts();
  }, [user]);

  const handleNext = () => {
    if (!selectedAccount) {
      alert('Please select an account!');
      return;
    }
    navigate('/user-details', { state: { account: selectedAccount } });
  };

  return (
    <div className={styles.container}>
      <h1>Select an Account</h1>
      <ul>
        {accounts.map((account) => (
          <li key={account.accountNumber}>
            <input
              type="radio"
              id={account.accountNumber}
              name="selectedAccount"
              value={account}
              onChange={() => setSelectedAccount(account)}
            />
            <label htmlFor={account.accountNumber}>
              {account.accountNumber} - {account.branch}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleNext} disabled={!selectedAccount}>
        Next
      </button>
    </div>
  );
};

export default AccountSelectionPage;
