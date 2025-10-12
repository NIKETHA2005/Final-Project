package com.bank.backend.controller;

import com.bank.backend.dto.AuthRequest;
import com.bank.backend.dto.AuthResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class AuthController {

    private static final String ADMIN_USERNAME = "admin";
    private static final String ADMIN_PASSWORD = "admin123";

    @PostMapping("/authenticate")
    public ResponseEntity<AuthResponse> authenticate(@RequestBody AuthRequest request) {
        String username = request.getUsername();
        String password = request.getPassword();

        if (ADMIN_USERNAME.equals(username) && ADMIN_PASSWORD.equals(password)) {
            return ResponseEntity.ok(new AuthResponse(true, "Authentication successful"));
        }

        return ResponseEntity.status(401).body(new AuthResponse(false, "Invalid credentials"));
    }
}

