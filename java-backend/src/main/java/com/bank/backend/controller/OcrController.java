package com.bank.backend.controller;

import com.bank.backend.dto.OcrResponse;
import com.bank.backend.service.OcrService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/ocr")
@CrossOrigin(origins = "*")
public class OcrController {

    @Autowired
    private OcrService ocrService;

    @PostMapping("/scan")
    public ResponseEntity<?> scanPassbook(@RequestParam("image") MultipartFile file) {
        try {
            if (file == null || file.isEmpty()) {
                return ResponseEntity.badRequest().body("No image file provided");
            }

            System.out.println("Received file: " + file.getOriginalFilename() + ", size: " + file.getSize());
            OcrResponse result = ocrService.extractDataFromImage(file);
            System.out.println("OCR result: " + result);
            return ResponseEntity.ok(result);
        } catch (IllegalArgumentException e) {
            System.err.println("Invalid file: " + e.getMessage());
            return ResponseEntity.badRequest().body("Invalid file: " + e.getMessage());
        } catch (Exception e) {
            System.err.println("OCR processing failed: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("OCR processing failed: " + e.getMessage());
        }
    }
}
