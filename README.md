# Node User Management API (TypeScript + Express + TypeORM)

A backend API built using **Node.js**, **Express**, **TypeScript**, **SQLite**, and **TypeORM**.  
This project includes:

- User Registration
- User Login (JWT Authentication)
- List All Users (Admin Only)
- Search Users (by Name/Email)
- Filter Users (by Country)
- View Single User (Role-based Access)

---

## 🚀 Technologies Used

- Node.js
- Express.js
- TypeScript
- TypeORM (SQLite)
- JSON Web Token (jsonwebtoken)
- bcryptjs (password hashing)
- ts-node-dev (development runner)

---

## 📁 Project Structure

Node_User_Api/
│── src/
│   ├── app.ts
│   ├── server.ts
│   ├── config/
│   │     └── data-source.ts
│   ├── controllers/
│   │     └── user.controller.ts
│   ├── entity/
│   │     └── User.ts
│   ├── middleware/
│   │     └── auth.ts
│   ├── routes/
│   │     └── user.routes.ts
│   └── utils/
│         └── token.ts
│── package.json
│── tsconfig.json
│── .gitignore
│── README.md

---

## 🛠️ Installation & Setup

### 1️⃣ Clone the Repository

git clone https://github.com/Bhargavghoniya/Node_User_Api.git  
cd Node_User_Api

---

### 2️⃣ Install All Required Dependencies

mkdir node-api
cd node-api
npm init -y

Install main backend dependencies:

npm install express typeorm reflect-metadata sqlite3 bcryptjs jsonwebtoken

Install TypeScript and dev dependencies:

npm install --save-dev typescript ts-node-dev @types/node @types/express @types/jsonwebtoken

and check tsconfig.json

---


### 3️⃣ Start the Server

npx ts-node-dev src/server.ts

Server will start at:

http://localhost:3000


---

## 🔐 Environment Variables (Optional)

If you want to use a `.env` file, create it in the project root:

JWT_SECRET=your_secret_key_here

And make sure `.env` is listed in `.gitignore`.

---

## 📌 API Endpoints

---

### ✔ 1. Register User  
POST /register

Example Body:
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "admin123",
  "role": "Admin",
  "phone": "9876543210",
  "city": "Rajkot",
  "country": "India"
}

---

### ✔ 2. Login User  
POST /login

Body:
{
  "email": "admin@example.com",
  "password": "admin123"
}

Response:
{
  "access_token": "xxxxx.yyyyy.zzzzz",
  "token_type": "bearer"
}

---

### ✔ 3. List All Users (Admin Only)  
GET /users

Filters:
- Search → /users?q=bhargav
- Filter → /users?country=India
- Search + Filter → /users?q=admin&country=India

Headers:
Authorization: Bearer <token>

---

### ✔ 4. Get Single User  
GET /users/:id

Admin → can view any user  
Staff → can view only their own profile  

Example:
http://localhost:3000/users/1

---

## 🔒 Authorization Rules

Admin:
- Can view all users
- Can list all users

Staff:
- Can view only own profile
- Cannot list all users

---

## 📝 Notes

- Passwords hashed using bcryptjs  
- JWT used for authentication  
- SQLite database auto-generated  
- Clean modular folder structure  

---

## 👨‍💻 Author

**Bhargav Ghoniya**  
GitHub: https://github.com/Bhargavghoniya
