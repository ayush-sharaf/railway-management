# Railway Management System API

This project provides an API for a Railway Management System built with **Node.js**, **Express**, and **MySQL**. The API allows users to:
- **Sign up and log in**
- **Check for available trains between two stations**
- **Reserve seats on trains**
- **View details of their bookings**

Admins have the ability to:
- **Add new trains**
- **Edit train information**

---

## **1. Prerequisites**

Before starting, ensure you have the following installed:
- **Node.js** (v16 or higher): [Install Node.js](https://nodejs.org)
- **MySQL**: [Install MySQL](https://dev.mysql.com/downloads/installer/)


---

## **2. Cloning the Repository**

1. Open your terminal or command prompt.
2. Navigate to the directory where you want to clone the project.
3. Execute the following command to clone the repository:
   ```bash
   git clone https://github.com/ayush-sharaf/railway-management.git
   ```

4. Move into the project directory:
   ```bash
   cd railway-management
   ```

---

## **3. Setting Up the MySQL Database**

1. Open your MySQL client (MySQL Workbench).
2. Create a new database:
   ```sql
   CREATE DATABASE railway_db;
   ```

---

## **4. Setting Up the Project**

1. Open the terminal in the project directory.
2. Install the necessary Node.js modules by running:
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root directory to store environment variables:
   ```bash
   touch .env
   ```

4. Add the following environment variables to the `.env` file:
   ```plaintext
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=railway_db
   JWT_SECRET=yourjwtsecret
   ADMIN_API_KEY=your-admin-api-key
   ```
   - Replace `yourpassword` with the MySQL password you set earlier.
   - Replace `yourjwtsecret` and `your-admin-api-key` with strong, random strings.

---

## **5. Starting the Server**

To start the server, run:
```bash
npm start
```

---

## **6. Using the API**

You can use tools like **Postman** or **curl** to interact with the API.

### **6.1. User Authentication**

#### **6.1.1 Register a User**
```bash
curl -X POST http://localhost:3000/api/auth/register \
-H "Content-Type: application/json" \
-d '{
    "username": "user1",
    "password": "password123",
    "role": "user"
}'
```

#### **6.1.2 Log in a User**
```bash
curl -X POST http://localhost:3000/api/auth/login \
-H "Content-Type: application/json" \
-d '{
    "username": "user1",
    "password": "password123"
}'
```
- **Response**: You will receive a JWT token:
  ```json
  { "token": "your-jwt-token" }
  ```

---

### **6.2. Admin Endpoints (API Key Required)**

#### **6.2.1 Add a Train**
```bash
curl -X POST http://localhost:3000/api/trains/admin/train \
-H "Content-Type: application/json" \
-H "X-API-KEY: your-admin-api-key" \
-H "Authorization: Bearer your-admin-jwt-token" \
-d '{
    "train_name": "Express 101",
    "source": "Station A",
    "destination": "Station B",
    "total_seats": 100
}'
```

---

### **6.3. User Endpoints**

#### **6.3.1 Check Train Availability**
```bash
curl -X GET "http://localhost:3000/api/trains?source=Station%20A&destination=Station%20B"
```

#### **6.3.2 Book Seats**
```bash
curl -X POST http://localhost:3000/api/book \
-H "Content-Type: application/json" \
-H "Authorization: Bearer your-user-jwt-token" \
-d '{
    "trainId": 1,
    "seat_count": 2
}'
```

#### **6.3.3 View Booking Details**
```bash
curl -X GET http://localhost:3000/api/bookings/1 \
-H "Authorization: Bearer your-user-jwt-token"
```


## **Examples**

### **Booking Seats (User Endpoint)**
Using Curl:
```bash
curl -X POST http://localhost:3000/api/booking \
-H "Authorization: Bearer <your-token>" \
-H "Content-Type: application/json" \
-d '{
    "trainId": 1,
    "seat_count": 2
}'
```

### **Adding a Train (Admin Endpoint)**
Using Curl:
```bash
curl -X POST http://localhost:3000/api/admin/train \
-H "x-api-key: <admin-api-key>" \
-H "Content-Type: application/json" \
-d '{
    "name": "Express Train",
    "source": "Station A",
    "destination": "Station B",
    "available_seats": 100
}'
```
---

### **Stopping the Server**
To stop the server, press **Ctrl+C** in the terminal where it's running.

### **Verifying Installed Node Modules**
To ensure that all dependencies are installed, run:
```bash
npm install
```

### **Debugging**
If you encounter issues:
- Make sure MySQL is running.
- Double-check the `.env` file settings.
- Review any error messages in the terminal where the server is running.

---

## **8. Project Structure**

The project follows a modular structure:
- **src/controllers**: Handles API logic.
- **src/models**: Database models.
- **src/routes**: Defines API routes.
- **src/middlewares**: Middleware for authentication and authorization.
- **src/server.js**: Starts the server.

---
