# Bank Management System - Java Backend

This is a Java Spring Boot backend that has been migrated from the original Express.js backend. It provides the same API endpoints and functionality while using Java, Spring Boot, and MySQL instead of Node.js, Express, and PostgreSQL.

## 🚀 Technologies Used

- **Java 17+**
- **Spring Boot 3.2.0**
- **Spring Data JPA**
- **Spring Security**
- **MySQL 8.0**
- **Maven**
- **Lombok**
- **Tess4J (OCR)**
- **JWT (for authentication)**

## 📋 Prerequisites

Before running this application, make sure you have:

1. **Java 17 or higher** installed
2. **Maven 3.6+** installed
3. **MySQL 8.0+** installed and running
4. **Git** (for cloning the repository)

## 🛠️ Setup Instructions

### 1. Database Setup

1. **Install MySQL** (if not already installed):

   ```bash
   # On macOS with Homebrew
   brew install mysql

   # Start MySQL service
   brew services start mysql
   ```

2. **Create Database**:

   ```sql
   mysql -u root -p
   CREATE DATABASE bank_db;
   ```

3. **Update Database Configuration** (if needed):
   Edit `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/bank_db
   spring.datasource.username=root
   spring.datasource.password=your_mysql_password
   ```

### 2. Build and Run

1. **Navigate to the project directory**:

   ```bash
   cd java-backend
   ```

2. **Build the project**:

   ```bash
   mvn clean install
   ```

3. **Run the application**:

   ```bash
   mvn spring-boot:run
   ```

   Or run the JAR file:

   ```bash
   java -jar target/backend-1.0.0.jar
   ```

The server will start on **port 5000** (same as the original Express.js backend).

## 📊 Database Schema

The application will automatically create the following tables:

### `userdetails` table:

- `account_number` (VARCHAR, Primary Key)
- `account_holder_name` (VARCHAR)
- `ifsc` (VARCHAR)
- `phone_no` (VARCHAR)
- `customer_address` (VARCHAR)
- `pin` (VARCHAR)
- `balance` (DECIMAL)
- `account_opening_date` (DATE)
- `branch` (VARCHAR)

### `transactions` table:

- `id` (BIGINT, Primary Key, Auto Increment)
- `account_number` (VARCHAR)
- `type` (VARCHAR) - 'deposit' or 'withdrawal'
- `amount` (DECIMAL)
- `date` (DATETIME)
- `balance_after` (DECIMAL)

## 🔗 API Endpoints

All endpoints maintain the same structure as the original Express.js backend:

### Authentication

- `POST /api/authenticate` - Admin authentication

### User Management

- `GET /api/users` - Get all users
- `GET /api/user-details/{accountNumber}` - Get user by account number
- `POST /api/users` - Create new user
- `PUT /api/users/{accountNumber}` - Update user
- `DELETE /api/users/{accountNumber}` - Delete user

### Transactions

- `GET /api/transactions` - Get all transactions
- `GET /api/transactions/{accountNumber}` - Get transactions for specific account
- `POST /api/process-transaction` - Process deposit/withdrawal

### OCR

- `POST /api/ocr/scan` - Scan passbook image for account details

### Health Check

- `GET /` - Server status

## 🔧 Configuration

### Application Properties

The main configuration is in `src/main/resources/application.properties`:

```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/bank_db
spring.datasource.username=root
spring.datasource.password=root
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

# Server Configuration
server.port=5000

# File Upload Configuration
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB
```

## 🧪 Testing the API

You can test the API using:

1. **Postman** - Import the endpoints
2. **curl** commands:

   ```bash
   # Health check
   curl http://localhost:5000/

   # Get all users
   curl http://localhost:5000/api/users

   # Authenticate
   curl -X POST http://localhost:5000/api/authenticate \
        -H "Content-Type: application/json" \
        -d '{"username":"admin","password":"admin123"}'
   ```

## 🔄 Migration Notes

This Java backend is a complete migration from the original Express.js backend with the following changes:

### What Changed:

- **Language**: Node.js → Java 17
- **Framework**: Express.js → Spring Boot
- **Database**: PostgreSQL → MySQL
- **ORM**: Raw SQL → Spring Data JPA
- **OCR**: Tesseract.js → Tess4J

### What Stayed the Same:

- **API Endpoints**: All routes remain identical
- **Request/Response Format**: JSON structure unchanged
- **Business Logic**: All functionality preserved
- **Port**: Still runs on port 5000
- **CORS**: Configured for frontend integration

## 🐛 Troubleshooting

### Common Issues:

1. **Database Connection Error**:

   - Ensure MySQL is running
   - Check database credentials in `application.properties`
   - Verify database `bank_db` exists

2. **Port Already in Use**:

   - Change port in `application.properties`: `server.port=8080`
   - Or stop the process using port 5000

3. **OCR Not Working**:

   - Ensure `eng.traineddata` is in `src/main/resources/tessdata/`
   - Check file upload permissions

4. **Build Errors**:
   - Ensure Java 17+ is installed: `java -version`
   - Clean and rebuild: `mvn clean install`

## 📝 Development

### Project Structure:

```
java-backend/
├── src/main/java/com/bank/backend/
│   ├── entity/          # JPA Entities
│   ├── repository/      # Data Repositories
│   ├── service/         # Business Logic
│   ├── controller/       # REST Controllers
│   ├── dto/            # Data Transfer Objects
│   └── config/         # Configuration
├── src/main/resources/
│   ├── application.properties
│   └── tessdata/       # OCR training data
└── pom.xml
```

## 🤝 Integration with Frontend

The Java backend is designed to be a drop-in replacement for the Express.js backend. The React frontend should work without any changes since:

- All API endpoints are identical
- Response formats are the same
- CORS is properly configured
- Port remains 5000

Simply update your frontend's API base URL to point to the Java backend if needed.

## 📄 License

This project is part of the Final Year Project and maintains the same license as the original Express.js backend.

