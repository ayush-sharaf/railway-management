# Railway Management System API

This document explains how to set up the project, initialize the database, and use the API endpoints for both users and admins.

---

## **Setup Instructions**

### **1. Clone the Repository**
```bash
git clone <repository-url>
cd railway-management
```

### **2. Install Node Modules**
```bash
npm install
```

### **3. Setup the MySQL Database**
1. Install MySQL on your system if not already installed.
2. Create a database named `railway_management`.
3. Update your `.env` file with the database configuration:
    ```
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=<your-password>
    DB_NAME=railway_management
    ```

### **4. Run Database Migrations**
Use Sequelize to sync the database models:
```bash
node src/db/sync.js
```

### **5. Start the Server**
```bash
npm start
```

The server should start on `http://localhost:3000`.

---

## **Authentication**

### **Register a User**
**Endpoint:** `POST /api/register`  
**Request Body:**
```json
{
    "username": "exampleUser",
    "password": "examplePassword",
    "isAdmin": false
}
```

### **Login**
**Endpoint:** `POST /api/login`  
**Request Body:**
```json
{
    "username": "exampleUser",
    "password": "examplePassword"
}
```
**Response:** Returns an authorization token for user authentication.

---

## **User Endpoints**

### **1. Book a Seat**
**Endpoint:** `POST /api/booking`  
**Headers:**  
`Authorization: Bearer <your-token>`  
**Request Body:**
```json
{
    "trainId": 1,
    "seat_count": 2
}
```

### **2. Get Booking Details**
**Endpoint:** `GET /api/booking/:id`  
**Headers:**  
`Authorization: Bearer <your-token>`  
**Response:**
```json
{
    "id": 1,
    "trainId": 1,
    "userId": 2,
    "seat_count": 2
}
```

---

## **Admin Endpoints**

### **1. Add a New Train**
**Endpoint:** `POST /api/admin/train`  
**Headers:**  
`x-api-key: <admin-api-key>`  
**Request Body:**
```json
{
    "name": "Express Train",
    "source": "Station A",
    "destination": "Station B",
    "available_seats": 100
}
```

### **2. Update Train Seats**
**Endpoint:** `PUT /api/admin/train/:id`  
**Headers:**  
`x-api-key: <admin-api-key>`  
**Request Body:**
```json
{
    "available_seats": 150
}
```

### **3. Delete a Train**
**Endpoint:** `DELETE /api/admin/train/:id`  
**Headers:**  
`x-api-key: <admin-api-key>`  

---

## **Admin API Key**
To protect the admin routes, you must include the admin API key in the request header:
```json
"x-api-key": "<admin-api-key>"
```
Set the API key in your `.env` file:
```
ADMIN_API_KEY=your-admin-api-key
```

---

## **Testing**

### **1. Run API Tests**
Use tools like **Postman**, **JMeter**, or **Curl** to test the API endpoints.

### **2. Concurrency Testing**
Simulate multiple users attempting to book the same train simultaneously to verify proper handling of race conditions.

---

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

