package com.bank.backend.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "userdetails")
public class UserDetails {

    @Id
    @Column(name = "account_number")
    private String accountNumber;

    @Column(name = "account_holder_name")
    private String accountHolderName;

    @Column(name = "ifsc")
    private String ifsc;

    @Column(name = "phone_no")
    private String phoneNo;

    @Column(name = "customer_address")
    private String customerAddress;

    @Column(name = "pin")
    private String pin;

    @Column(name = "balance")
    private BigDecimal balance;

    @Column(name = "account_opening_date")
    private LocalDate accountOpeningDate;

    @Column(name = "branch")
    private String branch;

    // Constructors
    public UserDetails() {
    }

    public UserDetails(String accountNumber, String accountHolderName, String ifsc, String phoneNo,
            String customerAddress, String pin, BigDecimal balance,
            LocalDate accountOpeningDate, String branch) {
        this.accountNumber = accountNumber;
        this.accountHolderName = accountHolderName;
        this.ifsc = ifsc;
        this.phoneNo = phoneNo;
        this.customerAddress = customerAddress;
        this.pin = pin;
        this.balance = balance;
        this.accountOpeningDate = accountOpeningDate;
        this.branch = branch;
    }

    // Getters and Setters
    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getAccountHolderName() {
        return accountHolderName;
    }

    public void setAccountHolderName(String accountHolderName) {
        this.accountHolderName = accountHolderName;
    }

    public String getIfsc() {
        return ifsc;
    }

    public void setIfsc(String ifsc) {
        this.ifsc = ifsc;
    }

    public String getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }

    public String getCustomerAddress() {
        return customerAddress;
    }

    public void setCustomerAddress(String customerAddress) {
        this.customerAddress = customerAddress;
    }

    public String getPin() {
        return pin;
    }

    public void setPin(String pin) {
        this.pin = pin;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    public LocalDate getAccountOpeningDate() {
        return accountOpeningDate;
    }

    public void setAccountOpeningDate(LocalDate accountOpeningDate) {
        this.accountOpeningDate = accountOpeningDate;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }
}
