-- Database setup script for Bank Management System
-- Run this script to create the database and initial schema

-- Create database
CREATE DATABASE IF NOT EXISTS bank_db;
USE bank_db;

-- Create userdetails table
CREATE TABLE IF NOT EXISTS userdetails (
    account_number VARCHAR(50) PRIMARY KEY,
    account_holder_name VARCHAR(255) NOT NULL,
    ifsc VARCHAR(20) NOT NULL,
    phone_no VARCHAR(15) NOT NULL,
    customer_address TEXT NOT NULL,
    pin VARCHAR(10) NOT NULL,
    balance DECIMAL(15,2) DEFAULT 0.00,
    account_opening_date DATE NOT NULL,
    branch VARCHAR(100) NOT NULL
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    account_number VARCHAR(50) NOT NULL,
    type ENUM('deposit', 'withdrawal') NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    date DATETIME NOT NULL,
    balance_after DECIMAL(15,2) NOT NULL,
    FOREIGN KEY (account_number) REFERENCES userdetails(account_number)
);

-- Insert sample data (optional)
INSERT INTO userdetails (account_number, account_holder_name, ifsc, phone_no, customer_address, pin, balance, account_opening_date, branch) VALUES
('1234567890', 'John Doe', 'SBIN0001234', '9876543210', '123 Main St, City', '1234', 50000.00, '2023-01-15', 'Main Branch'),
('0987654321', 'Jane Smith', 'SBIN0005678', '9876543211', '456 Oak Ave, Town', '5678', 75000.00, '2023-02-20', 'Downtown Branch');

-- Insert sample transactions
INSERT INTO transactions (account_number, type, amount, date, balance_after) VALUES
('1234567890', 'deposit', 10000.00, '2023-03-01 10:30:00', 60000.00),
('1234567890', 'withdrawal', 5000.00, '2023-03-02 14:20:00', 55000.00),
('0987654321', 'deposit', 15000.00, '2023-03-01 11:15:00', 90000.00);

-- Show tables
SHOW TABLES;

-- Show sample data
SELECT * FROM userdetails;
SELECT * FROM transactions;

