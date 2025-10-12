import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './TransactionHistoryPage.module.css';

const TransactionHistoryPage = () => {
  const location = useLocation();
  const { accountNumber } = location.state || {}; // Get account number from navigation state
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');

  // useEffect(() => {
  //   const fetchTransactions = async () => {
  //     try {
        
  //       const response = await fetch(`/api/transactions/${accountNumber}`);
  //       const data = await response.json();
  //       setTransactions(data);
  //     } catch (err) {
  //       setError('Failed to load transactions');
  //     }
  //   };

  //   if (accountNumber) fetchTransactions();
  // }, [accountNumber]);

  // if (!accountNumber) {
  //   return <div>Error: Account number not provided</div>;
  // }

  // useEffect(() => {
  //   const fetchTransactions = async () => {
  //     try {
  //       console.log(`Fetching transactions for accountNumber: ${accountNumber}`);
  //       const response = await fetch(`/api/transactions/${accountNumber}`);
  //       if (!response.ok) {
  //         console.error('Fetch failed with status:', response.status);
  //         throw new Error('Failed to fetch transactions');
  //       }
  //       const data = await response.json();
  //       console.log('Fetched transactions:', data);
  //       setTransactions(data);
  //     } catch (err) {
  //       console.error('Error loading transactions:', err.message);
  //       setError('Failed to load transactions');
  //     }
  //   };

  //   if (accountNumber) fetchTransactions();
  // }, [accountNumber]);
  

  // useEffect(() => {
  //   const fetchTransactions = async () => {
  //     try {
  //       console.log(`Fetching transactions for accountNumber: ${accountNumber}`);
  //       const response = await fetch(`http://localhost:5000/api/transactions/${accountNumber}`);
  //       console.log('Response status:', response.status);
  
  //       if (!response.ok) {
  //         console.error('Fetch failed with status:', response.status);
  //         throw new Error('Failed to fetch transactions');
  //       }
  
  //       const data = await response.json();
  //       console.log('Fetched transactions:', data);
  //       setTransactions(data);
  //     } catch (err) {
  //       console.error('Error loading transactions:', err.message);
  //       setError('Failed to load transactions');
  //     }
  //   };
  
  //   if (accountNumber) fetchTransactions();
  // }, [accountNumber]);
  

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // console.log(`Fetching transactions for accountNumber: ${accountNumber}`);
        const response = await fetch(`http://localhost:8080/api/transactions/${accountNumber}`);
        // console.log('Raw response:', response);
  
        const responseText = await response.text();
        // console.log('Raw response text:', responseText);
  
        if (!response.ok) {
          console.error('Fetch failed with status:', response.status);
          throw new Error('Failed to fetch transactions');
        }
  
        const data = JSON.parse(responseText);
        console.log('Fetched transactions:', data);
        setTransactions(data);
      } catch (err) {
        console.error('Error loading transactions:', err.message);
        setError('Failed to load transactions');
      }
    };
  
    if (accountNumber) fetchTransactions();
  }, [accountNumber]);
  

  return (
    <div className={styles.container}>
      <h1>Transaction History</h1>
      {error && <p className={styles.error}>{error}</p>}
      {!error && transactions.length === 0 && <p>No transactions available</p>}
      {transactions.length > 0 && (
        <table className={styles.transactionTable}>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Balance After</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.type}</td>
                <td>₹{transaction.amount}</td>
                <td>{new Date(transaction.date).toLocaleString()}</td>
                <td>₹{transaction.balanceAfter}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionHistoryPage;
