package com.bank.backend.service;

import com.bank.backend.entity.UserDetails;
import com.bank.backend.repository.UserDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserDetailsService {

    @Autowired
    private UserDetailsRepository userDetailsRepository;

    public List<UserDetails> getAllUsers() {
        return userDetailsRepository.findAll();
    }

    public Optional<UserDetails> getUserByAccountNumber(String accountNumber) {
        return userDetailsRepository.findById(accountNumber);
    }

    public UserDetails createUser(UserDetails userDetails) {
        return userDetailsRepository.save(userDetails);
    }

    public UserDetails updateUser(String accountNumber, UserDetails userDetails) {
        if (userDetailsRepository.existsById(accountNumber)) {
            userDetails.setAccountNumber(accountNumber);
            return userDetailsRepository.save(userDetails);
        }
        return null;
    }

    public boolean deleteUser(String accountNumber) {
        if (userDetailsRepository.existsById(accountNumber)) {
            userDetailsRepository.deleteById(accountNumber);
            return true;
        }
        return false;
    }

    public UserDetails updateBalance(String accountNumber, java.math.BigDecimal newBalance) {
        Optional<UserDetails> userOpt = userDetailsRepository.findById(accountNumber);
        if (userOpt.isPresent()) {
            UserDetails user = userOpt.get();
            user.setBalance(newBalance);
            return userDetailsRepository.save(user);
        }
        return null;
    }
}

