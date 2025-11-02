# Jobs Tracker API

A RESTful API for managing job applications — built with **Node.js**, **Express.js**, and **MongoDB**.
This API allows users to register, log in, and track their job applications with CRUD functionality.

---

## Live API

**Base URL:**

```
https://jobstracker-app.fly.dev/api/v1
```

---

## Features

* User authentication with JWT (Register / Login)
* Create, Read, Update, Delete job entries
* Protected routes (only accessible with valid token)
* Error handling & validation
* Hosted on **Fly.io**

---

## Technologies

* **Node.js**
* **Express.js**
* **MongoDB (Mongoose)**
* **JWT Authentication**
* **dotenv**
* **CORS**
* **Fly.io** for deployment

---

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Omar-Issa1/JobsTracker-App
   cd jobs-tracker-api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create `.env` file**

   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   JWT_LIFETIME=1d
   ```

4. **Run the server**

   ```bash
   npm start
   ```

---

## Testing Locally

Use a tool like **Postman** or **Insomnia** to test the endpoints.

Example base URL:

```
http://localhost:3000/api/v1
```

---

## Authentication Endpoints

### Register

`POST /auth/register`

```json
{
  "name": "Omar",
  "email": "omar@example.com",
  "password": "123456"
}
```

### Login

`POST /auth/login`

```json
{
  "email": "omar@example.com",
  "password": "123456"
}
```

Response:

```json
{
  "user": {
    "name": "Omar"
  },
  "token": "your_jwt_token_here"
}
```

---

## Jobs Endpoints

🔒 Requires valid JWT token in headers:
`Authorization: Bearer <token>`

### Get All Jobs

`GET /jobs`

### Create Job

`POST /jobs`

```json
{
  "company": "Netflix",
  "position": "Backend Developer",
  "location": "San Francisco, CA",
  "expectedSalary": 120000,
  "status": "interview"
}
```

### Update Job

`PATCH /jobs/:id`

### Delete Job

`DELETE /jobs/:id`

---

## Common Issues

**CORS Error:**
Make sure the deployed frontend URL matches exactly the value in your CORS setup in Express:

```js
app.use(cors({
  origin: "https://your-frontend-url.vercel.app"
}));
```

---

## ☁️ Deployment (Fly.io)


This project is deployed on **Fly.io**.  
You can access the live Api here:  
```
[https://jobstracker-app.fly.dev/api/v1](https://jobstracker-app.fly.dev/api/v1)
```
---

---
## Deployment (Vercel)

This project is deployed on **Vercel**.  
You can access the live version here:  
=> [https://jobs-frontend-one.vercel.app/](https://jobs-frontend-one.vercel.app/)
---


## 👨‍💻 Author

**Omar Issa**
Backend Developer | Node.js Enthusiast
GitHub: [Omar Issa](https://github.com/Omar-Issa1)
Live APP: [Live App](https://jobs-frontend-one.vercel.app/)

---

## License

[MIT License](LICENSE)
