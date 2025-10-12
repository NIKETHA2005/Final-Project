package com.bank.backend.service;

import com.bank.backend.entity.Transaction;
import com.bank.backend.entity.UserDetails;
import com.bank.backend.repository.TransactionRepository;
import com.bank.backend.repository.UserDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private UserDetailsService userDetailsService;

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAllOrderByDateDesc();
    }

    public List<Transaction> getTransactionsByAccountNumber(String accountNumber) {
        return transactionRepository.findByAccountNumberOrderByDateDesc(accountNumber);
    }

    @Transactional
    public Transaction processTransaction(String accountNumber, String type, BigDecimal amount) {
        // Validate transaction type
        if (!"deposit".equals(type) && !"withdrawal".equals(type)) {
            throw new IllegalArgumentException("Invalid transaction type");
        }

        // Get user details
        Optional<UserDetails> userOpt = userDetailsService.getUserByAccountNumber(accountNumber);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("Account not found");
        }

        UserDetails user = userOpt.get();
        BigDecimal currentBalance = user.getBalance();
        BigDecimal newBalance;

        // Process transaction
        if ("deposit".equals(type)) {
            newBalance = currentBalance.add(amount);
        } else { // withdrawal
            if (amount.compareTo(currentBalance) > 0) {
                throw new RuntimeException("Insufficient balance");
            }
            newBalance = currentBalance.subtract(amount);
        }

        // Update user balance
        userDetailsService.updateBalance(accountNumber, newBalance);

        // Create transaction record
        Transaction transaction = new Transaction();
        transaction.setAccountNumber(accountNumber);
        transaction.setType(type);
        transaction.setAmount(amount);
        transaction.setDate(LocalDateTime.now());
        transaction.setBalanceAfter(newBalance);

        return transactionRepository.save(transaction);
    }
}

