import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import styles from './TransactionMonitor.module.css';

const TransactionMonitor = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      console.log('Fetching transactions...');
      const response = await axios.get('/transactions');
      console.log('Fetched transactions:', response.data);
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading transactions...</p>;
  }
  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Transaction Monitor</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Account Number</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.accountNumber}</td>
              <td>₹{transaction.amount}</td>
              <td>{transaction.type}</td>
              <td>{transaction.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionMonitor;