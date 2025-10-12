

const express = require('express');
const router = express.Router();
const pool = require('C:/Users/91994/Desktop/Challan_Project/backend/db.js');

//  Fetch all users
router.get('/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM userdetails ORDER BY account_number ASC');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//  Fetch a single user by account number (Already exists)
router.get('/user-details/:accountNumber', async (req, res) => {
    const { accountNumber } = req.params;
    try {
        const result = await pool.query(
            `SELECT account_number, account_holder_name AS name, ifsc, branch, balance, phone_no, customer_address, pin
            FROM userdetails
            WHERE account_number = $1`,
            [accountNumber]
        );

        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user details:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//  Create a new user
router.post('/users', async (req, res) => {
    const { account_holder_name, account_number, ifsc, phone_no, customer_address, pin, balance, account_opening_date, branch } = req.body;

    if (!account_holder_name || !account_number || !ifsc || !phone_no || !customer_address || !pin || !balance || !account_opening_date || !branch) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const result = await pool.query(
            `INSERT INTO userdetails (account_number, account_holder_name, ifsc, phone_no, customer_address, pin, balance, account_opening_date, branch)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
            [account_number, account_holder_name, ifsc, phone_no, customer_address, pin, balance, account_opening_date, branch]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating user:', error.message);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});


router.put('/users/:accountNumber', async (req, res) => {
    const { name, ifsc, phoneNo, address, pin, balance, accountOpeningDate, branch } = req.body;
    const { accountNumber } = req.params;

    console.log("🔵 Received UPDATE request:", { accountNumber, name, ifsc, phoneNo, address, pin, balance, accountOpeningDate, branch });

    try {
        const result = await pool.query(
            `UPDATE userdetails 
            SET account_holder_name = $1, ifsc = $2, phone_no = $3, customer_address = $4, pin = $5, balance = $6, account_opening_date = $7, branch = $8 
            WHERE account_number = $9 
             RETURNING *`,
            [name, ifsc, phoneNo, address, pin, balance, accountOpeningDate, branch, accountNumber]
        );

        console.log("🟢 Database Update Result:", result.rows);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'User updated successfully', user: result.rows[0] });
    } catch (error) {
        console.error('🔴 Error updating user:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});




router.delete('/users/:accountNumber', async (req, res) => {
    const { accountNumber } = req.params;
    try {
        const result = await pool.query('DELETE FROM userdetails WHERE account_number = $1 RETURNING *', [accountNumber]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
