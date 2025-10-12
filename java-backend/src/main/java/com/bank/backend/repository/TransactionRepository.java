package com.bank.backend.repository;

import com.bank.backend.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findByAccountNumberOrderByDateDesc(String accountNumber);

    @Query("SELECT t FROM Transaction t ORDER BY t.date DESC")
    List<Transaction> findAllOrderByDateDesc();
}

