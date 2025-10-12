import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admin Dashboard</h1>
      <div className={styles.cardContainer}>
        <Link to="/admin/users" className={styles.card}>
          <h2>User Management</h2>
          <p>Add, edit, or delete user data.</p>
        </Link>
        <Link to="/admin/transactions" className={styles.card}>
          <h2>Transaction Monitor</h2>
          <p>View all user transactions.</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
