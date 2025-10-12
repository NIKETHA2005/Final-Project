const express = require('express');
const router = express.Router();
const pool = require('C:/Users/91994/Desktop/Challan_Project/backend/db.js');

// Fetch all users
router.get('/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM userdetails ORDER BY account_number ASC');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Create a new user
router.post('/users', async (req, res) => {
    const { name, accountNumber, ifsc, phoneNo, address, pin, balance } = req.body;
    try {
        await pool.query(
            'INSERT INTO userdetails (account_number, account_holder_name, ifsc, phone_no, customer_address, pin, balance) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [accountNumber, name, ifsc, phoneNo, address, pin, balance]
        );
        res.json({ message: 'User added successfully' });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update user details
router.put('/users/:accountNumber', async (req, res) => {
    const { name, ifsc, phoneNo, address, pin, balance } = req.body;
    const { accountNumber } = req.params;
    try {
        await pool.query(
            'UPDATE userdetails SET account_holder_name = $1, ifsc = $2, phone_no = $3, customer_address = $4, pin = $5, balance = $6 WHERE account_number = $7',
            [name, ifsc, phoneNo, address, pin, balance, accountNumber]
        );
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete user
router.delete('/users/:accountNumber', async (req, res) => {
    const { accountNumber } = req.params;
    try {
        await pool.query('DELETE FROM userdetails WHERE account_number = $1', [accountNumber]);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
