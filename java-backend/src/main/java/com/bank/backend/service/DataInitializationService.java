package com.bank.backend.service;

import com.bank.backend.entity.UserDetails;
import com.bank.backend.entity.Transaction;
import com.bank.backend.repository.UserDetailsRepository;
import com.bank.backend.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
public class DataInitializationService implements CommandLineRunner {

    @Autowired
    private UserDetailsRepository userDetailsRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Override
    public void run(String... args) throws Exception {
        // Check if data already exists
        if (userDetailsRepository.count() == 0) {
            System.out.println("🔄 Initializing sample data...");

            // Create sample users
            UserDetails user1 = new UserDetails(
                    "1234567890", "John Doe", "SBIN0001234", "9876543210",
                    "123 Main St, City", "1234", new BigDecimal("50000.00"),
                    LocalDate.of(2023, 1, 15), "Main Branch");

            UserDetails user2 = new UserDetails(
                    "0987654321", "Jane Smith", "SBIN0005678", "9876543211",
                    "456 Oak Ave, Town", "5678", new BigDecimal("75000.00"),
                    LocalDate.of(2023, 2, 20), "Downtown Branch");

            UserDetails user3 = new UserDetails(
                    "1122334455", "Alice Johnson", "SBIN0009999", "9876543212",
                    "789 Pine St, Village", "9999", new BigDecimal("25000.00"),
                    LocalDate.of(2023, 3, 10), "Central Branch");

            UserDetails user4 = new UserDetails(
                    "5566778899", "Bob Wilson", "SBIN0008888", "9876543213",
                    "321 Elm St, City", "8888", new BigDecimal("100000.00"),
                    LocalDate.of(2023, 4, 5), "North Branch");

            UserDetails user5 = new UserDetails(
                    "90808888231", "Test User", "2333531156", "9876543214",
                    "Test Address, Test City", "1111", new BigDecimal("30000.00"),
                    LocalDate.of(2023, 5, 1), "Test Branch");

            // Save users
            userDetailsRepository.save(user1);
            userDetailsRepository.save(user2);
            userDetailsRepository.save(user3);
            userDetailsRepository.save(user4);
            userDetailsRepository.save(user5);

            // Create sample transactions
            Transaction trans1 = new Transaction(
                    null, "1234567890", "deposit", new BigDecimal("10000.00"),
                    LocalDateTime.of(2023, 3, 1, 10, 30), new BigDecimal("60000.00"));

            Transaction trans2 = new Transaction(
                    null, "1234567890", "withdrawal", new BigDecimal("5000.00"),
                    LocalDateTime.of(2023, 3, 2, 14, 20), new BigDecimal("55000.00"));

            Transaction trans3 = new Transaction(
                    null, "0987654321", "deposit", new BigDecimal("15000.00"),
                    LocalDateTime.of(2023, 3, 1, 11, 15), new BigDecimal("90000.00"));

            Transaction trans4 = new Transaction(
                    null, "1122334455", "deposit", new BigDecimal("5000.00"),
                    LocalDateTime.of(2023, 3, 15, 9, 0), new BigDecimal("30000.00"));

            Transaction trans5 = new Transaction(
                    null, "5566778899", "withdrawal", new BigDecimal("20000.00"),
                    LocalDateTime.of(2023, 4, 10, 16, 30), new BigDecimal("80000.00"));

            Transaction trans6 = new Transaction(
                    null, "90808888231", "deposit", new BigDecimal("10000.00"),
                    LocalDateTime.of(2023, 5, 2, 12, 0), new BigDecimal("40000.00"));

            // Save transactions
            transactionRepository.save(trans1);
            transactionRepository.save(trans2);
            transactionRepository.save(trans3);
            transactionRepository.save(trans4);
            transactionRepository.save(trans5);
            transactionRepository.save(trans6);

            System.out.println("✅ Sample data initialized successfully!");
            System.out.println("📊 Created " + userDetailsRepository.count() + " users and "
                    + transactionRepository.count() + " transactions");
        } else {
            System.out.println("📊 Database already contains " + userDetailsRepository.count() + " users");
        }
    }
}

