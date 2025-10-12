// const express = require('express');
// const router = express.Router();
// const pool = require('C:/Users/91994/Desktop/Challan_Project/backend/db.js'); // Replace with your PostgreSQL pool configuration

// // Get transactions for a specific account
// router.get('/transactions/:accountNumber', async (req, res) => {
//   console.log(`Fetching transactions for account: ${req.params.accountNumber}`);
//   const { accountNumber } = req.params;

//   try {
//     const result = await pool.query(
//       `SELECT id, type, amount, date, balance_after 
//       FROM transactions 
//       WHERE account_number = $1 
//       ORDER BY date DESC`,
//       [accountNumber]
//     );

//     res.json(result.rows);
//   } catch (error) {
//     console.error('Error fetching transactions:', error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Get all transactions
// router.get('/transactions', async (req, res) => {
//   console.log('Endpoint /transactions hit'); 
//   try {
//     const result = await pool.query(
//       `SELECT id, account_number AS user, amount, type, date 
//       FROM transactions 
//       ORDER BY date DESC`
//     );
//     console.log('Transactions fetched:', result.rows);
//     res.json(result.rows);
//   } catch (error) {
//     console.error('Error fetching all transactions:', error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const pool = require('C:/Users/91994/Desktop/Challan_Project/backend/db.js'); // Replace with your PostgreSQL pool configuration

// // Get transactions for a specific account
// router.get('/transactions/:accountNumber', async (req, res) => {
//   console.log(`Fetching transactions for account: ${req.params.accountNumber}`);
//   const { accountNumber } = req.params;

//   try {
//     const result = await pool.query(
//       `SELECT id, type, amount, date, balance_after 
//       FROM transactions 
//       WHERE account_number = $1 
//       ORDER BY date DESC`,
//       [accountNumber]
//     );

//     res.json(result.rows);
//   } catch (error) {
//     console.error('Error fetching transactions:', error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Get all transactions
// router.get('/transactions', async (req, res) => {
//   console.log('Endpoint /transactions hit'); 
//   try {
//     const result = await pool.query(
//       `SELECT id, account_number AS user, amount, type, date 
//       FROM transactions 
//       ORDER BY date DESC`
//     );
//     console.log('Transactions fetched:', result.rows);
//     res.json(result.rows);
//   } catch (error) {
//     console.error('Error fetching all transactions:', error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Process transaction (Deposit or Withdrawal)
// router.post('/process-transaction', async (req, res) => {
//   const { accountNumber, type, amount } = req.body;

//   try {
//     // Fetch the current balance
//     const userResult = await pool.query(
//       'SELECT balance FROM userdetails WHERE account_number = $1',
//       [accountNumber]
//     );

//     if (userResult.rows.length === 0) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     let currentBalance = parseFloat(userResult.rows[0].balance);
//     let newBalance = 
//       type === 'deposit' ? currentBalance + amount : currentBalance - amount;

//     if (newBalance < 0) {
//       return res.status(400).json({ error: 'Insufficient balance' });
//     }

//     // Update balance in userdetails
//     await pool.query(
//       'UPDATE userdetails SET balance = $1 WHERE account_number = $2',
//       [newBalance, accountNumber]
//     );

//     // Insert transaction record
//     await pool.query(
//       `INSERT INTO transactions (account_number, type, amount, balance_after, date) 
//       VALUES ($1, $2, $3, $4, NOW())`,
//       [accountNumber, type, amount, newBalance]
//     );

//     console.log(`Transaction successful: ${type} of ₹${amount} for account ${accountNumber}`);
//     res.status(200).json({ message: 'Transaction processed successfully' });
//   } catch (error) {
//     console.error('Error processing transaction:', error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const pool = require('C:/Users/91994/Desktop/Challan_Project/backend/db.js'); // Replace with the correct path to your db.js file

// Endpoint to fetch transactions for a specific account
router.get('/transactions/:accountNumber', async (req, res) => {
  const { accountNumber } = req.params; // Extract accountNumber from request parameters
  console.log(`Fetching transactions for account: ${accountNumber}`);

  try {
    // Query to fetch transactions for the given account number
    const result = await pool.query(
      `SELECT id, type, amount, date, balance_after 
      FROM transactions 
      WHERE account_number = $1 
      ORDER BY date DESC`,
      [accountNumber]
    );

    // Respond with the fetched transactions
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching transactions:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to fetch all transactions
router.get('/transactions', async (req, res) => {
  console.log('Endpoint /transactions hit'); 

  try {
    // Query to fetch all transactions
    const result = await pool.query(
      `SELECT id, account_number AS user, amount, type, date 
      FROM transactions 
      ORDER BY date DESC`
    );

    console.log('Transactions fetched:', result.rows);

    // Respond with all fetched transactions
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching all transactions:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to process deposit or withdrawal transactions
router.post('/process-transaction', async (req, res) => {
  const { accountNumber, type, amount } = req.body;

  try {
    // Validate request data
    if (!accountNumber || !type || !amount) {
      return res.status(400).json({ error: 'Invalid request data' });
    }

    // Validate transaction type
    if (type !== 'deposit' && type !== 'withdrawal') {
      return res.status(400).json({ error: 'Invalid transaction type' });
    }

    // Fetch current balance
    const userQuery = await pool.query(
      `SELECT balance FROM userdetails WHERE account_number = $1`,
      [accountNumber]
    );

    if (userQuery.rows.length === 0) {
      return res.status(404).json({ error: 'Account not found' });
    }

    const currentBalance = parseFloat(userQuery.rows[0].balance);
    let newBalance;

    // Handle deposit or withdrawal
    if (type === 'deposit') {
      newBalance = currentBalance + parseFloat(amount);
    } else {
      if (amount > currentBalance) {
        return res.status(400).json({ error: 'Insufficient balance' });
      }
      newBalance = currentBalance - parseFloat(amount);
    }

    // Update balance in userdetails table
    await pool.query(
      `UPDATE userdetails SET balance = $1 WHERE account_number = $2`,
      [newBalance, accountNumber]
    );

    // Insert transaction into transactions table
    await pool.query(
      `INSERT INTO transactions (account_number, type, amount, date, balance_after) 
      VALUES ($1, $2, $3, NOW(), $4)`,
      [accountNumber, type, amount, newBalance]
    );

    res.json({ message: 'Transaction processed successfully', newBalance });
  } catch (error) {
    console.error('Error processing transaction:', error.message);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});
module.exports = router;


