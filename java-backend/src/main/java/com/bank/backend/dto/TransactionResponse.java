package com.bank.backend.dto;

import java.math.BigDecimal;

public class TransactionResponse {
    private String message;
    private BigDecimal newBalance;

    public TransactionResponse() {
    }

    public TransactionResponse(String message, BigDecimal newBalance) {
        this.message = message;
        this.newBalance = newBalance;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public BigDecimal getNewBalance() {
        return newBalance;
    }

    public void setNewBalance(BigDecimal newBalance) {
        this.newBalance = newBalance;
    }
}
