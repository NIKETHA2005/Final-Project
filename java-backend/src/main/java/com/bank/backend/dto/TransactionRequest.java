package com.bank.backend.dto;

import java.math.BigDecimal;

public class TransactionRequest {
    private String accountNumber;
    private String type;
    private BigDecimal amount;

    public TransactionRequest() {
    }

    public TransactionRequest(String accountNumber, String type, BigDecimal amount) {
        this.accountNumber = accountNumber;
        this.type = type;
        this.amount = amount;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
}
