package com.bank.backend.dto;

public class OcrResponse {
    private String accountNumber;
    private String ifscCode;

    public OcrResponse() {
    }

    public OcrResponse(String accountNumber, String ifscCode) {
        this.accountNumber = accountNumber;
        this.ifscCode = ifscCode;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getIfscCode() {
        return ifscCode;
    }

    public void setIfscCode(String ifscCode) {
        this.ifscCode = ifscCode;
    }
}
