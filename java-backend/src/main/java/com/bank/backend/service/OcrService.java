package com.bank.backend.service;

import com.bank.backend.dto.OcrResponse;
import net.sourceforge.tess4j.ITesseract;
import net.sourceforge.tess4j.Tesseract;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class OcrService {

    public OcrResponse extractDataFromImage(MultipartFile file) throws Exception {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File is null or empty");
        }

        // Save uploaded file temporarily
        String uploadDir = "uploads/";
        File uploadDirFile = new File(uploadDir);
        if (!uploadDirFile.exists()) {
            uploadDirFile.mkdirs();
        }

        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(uploadDir + fileName);

        try {
            Files.copy(file.getInputStream(), filePath);
            System.out.println("File saved to: " + filePath.toString());

            // Initialize Tesseract
            ITesseract tesseract = new Tesseract();

            // Try different tessdata paths
            String[] possiblePaths = {
                    "src/main/resources/tessdata",
                    "tessdata",
                    "./tessdata",
                    "classpath:tessdata",
                    "target/classes/tessdata"
            };

            boolean tessdataFound = false;
            for (String path : possiblePaths) {
                File tessdataDir = new File(path);
                if (tessdataDir.exists() && tessdataDir.isDirectory()) {
                    tesseract.setDatapath(path);
                    tessdataFound = true;
                    System.out.println("Tessdata found at: " + path);
                    break;
                }
            }

            // If still not found, try to get the resource path
            if (!tessdataFound) {
                try {
                    String resourcePath = getClass().getClassLoader().getResource("tessdata").getPath();
                    if (resourcePath != null) {
                        tesseract.setDatapath(resourcePath);
                        tessdataFound = true;
                        System.out.println("Tessdata found at resource path: " + resourcePath);
                    }
                } catch (Exception e) {
                    System.err.println("Could not find tessdata in resources: " + e.getMessage());
                }
            }

            if (!tessdataFound) {
                throw new RuntimeException(
                        "Tessdata directory not found. Tried paths: " + String.join(", ", possiblePaths));
            }

            tesseract.setLanguage("eng");

            // Perform OCR with image format handling
            System.out.println("Starting OCR processing on file: " + filePath.toString());

            // Convert image to a supported format if needed
            File processedImageFile = convertImageIfNeeded(new File(filePath.toString()));

            String text = tesseract.doOCR(processedImageFile);
            System.out.println("OCR Extracted Text: " + text);

            // Clean up processed image if it's different from original
            if (!processedImageFile.getAbsolutePath().equals(filePath.toString())) {
                try {
                    Files.deleteIfExists(processedImageFile.toPath());
                } catch (Exception e) {
                    System.err.println("Failed to delete processed image: " + e.getMessage());
                }
            }

            // Clean text
            String cleanedText = text.replaceAll("\\s+", " ");

            // Extract Account Number
            String accountNumber = extractAccountNumber(cleanedText);

            // Extract IFSC Code
            String ifscCode = extractIfscCode(cleanedText);

            return new OcrResponse(accountNumber, ifscCode);

        } catch (Exception e) {
            System.err.println("OCR Error: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("OCR processing failed: " + e.getMessage(), e);
        } finally {
            // Clean up temporary file
            try {
                Files.deleteIfExists(filePath);
            } catch (Exception e) {
                System.err.println("Failed to delete temporary file: " + e.getMessage());
            }
        }
    }

    private String extractAccountNumber(String text) {
        // Pattern to match Account Number
        Pattern pattern = Pattern.compile("Account\\s*Number\\s*[:\\-\\s]*([\\d]+)", Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(text);

        if (matcher.find()) {
            return matcher.group(1);
        }
        return null;
    }

    private String extractIfscCode(String text) {
        // Pattern to match IFSC Code
        Pattern pattern = Pattern.compile("IFSC\\s*Code\\s*[:\\-\\s]*([A-Z0-9]+)", Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(text);

        if (matcher.find()) {
            return matcher.group(1);
        }
        return null;
    }

    private File convertImageIfNeeded(File originalFile) throws IOException {
        try {
            // Try to read the image
            BufferedImage image = ImageIO.read(originalFile);
            if (image == null) {
                throw new IOException("Could not read image from file: " + originalFile.getName());
            }

            // If the image is already in a supported format, return the original
            String fileName = originalFile.getName().toLowerCase();
            if (fileName.endsWith(".png") || fileName.endsWith(".jpg") || fileName.endsWith(".jpeg")) {
                return originalFile;
            }

            // Convert to PNG format
            String originalFileName = originalFile.getName();
            String baseName = originalFileName;
            int lastDotIndex = originalFileName.lastIndexOf('.');
            if (lastDotIndex > 0) {
                baseName = originalFileName.substring(0, lastDotIndex);
            }
            String convertedFileName = baseName + "_converted.png";
            File convertedFile = new File(originalFile.getParent(), convertedFileName);

            // Write as PNG
            ImageIO.write(image, "png", convertedFile);
            System.out.println("Image converted to PNG: " + convertedFile.getAbsolutePath());

            return convertedFile;

        } catch (IOException e) {
            System.err.println("Error converting image: " + e.getMessage());
            // If conversion fails, try the original file anyway
            return originalFile;
        }
    }
}
