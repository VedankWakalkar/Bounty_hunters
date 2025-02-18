# Bug Bounty Platform

## 🚀 Overview

The **Bug Bounty Platform** is a web application designed to bridge the gap between **companies** and **security researchers**. Companies can post security bounties for their applications, while security researchers can submit vulnerability reports and get rewarded for their contributions.

## 🎯 Key Features

- **Company Dashboard**: Companies can post, manage, and review bounties.
- **Bug Submission System**: Security researchers can submit reports with proof.
- **Review & Validation**: Companies can accept or reject submissions.
- **Reward Management**: Track and manage bounty payouts.
- **Authentication & Authorization**: Secure login with JWT-based authentication.
- **Real-Time Updates**: Track bounty status and submission progress.

## 🏗️ Tech Stack

- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Token)
- **Hosting**: Vercel (Frontend), Render/Heroku (Backend)

## 📌 API Endpoints

### **User Endpoints**

- `GET /users/` → Fetch all users
- `GET /users/:id` → Fetch a user by ID
- `GET /users/bounties` → View available bounties
- `POST /users/submit-bounty` → Submit a report
- `GET /users/get-submissions` → View user submissions

### **Company Endpoints**

- `POST /company/create-bounty` → Post a new bounty
- `GET /company/get-bounties` → View company’s bounties
- `PUT /company/update-bounty/:id` → Edit a bounty
- `DELETE /company/delete-bounty/:id` → Remove a bounty
- `GET /company/get-submissions` → View all submissions
- `PUT /company/update-submission/:id` → Review a submission

## 📂 Project Structure

```
backend/
├── controllers/
├── middleware/
├── models/
├── routes/
├── config/
└── server.js

frontend/
├── components/
├── pages/
├── styles/
└── utils/
```

## ⚡ Impact

- **Enhances Security**: Helps companies identify vulnerabilities before attackers do.
- **Empowers Researchers**: Provides ethical hackers with opportunities to earn rewards.
- **Scalable & Secure**: Built with modern technologies ensuring smooth performance.

## 🛠️ Setup & Installation

### **1. Clone the Repository**

```bash
git clone https://github.com/VedankWakalkar/Bounty_hunters
cd Bounty_hunters
```

### **2. Backend Setup**

```bash
cd backend
npm install
npm start
```

### **3. Frontend Setup**

```bash
# yet to implement frontend
cd frontend
npm install
npm run dev
```

## 🎯 Future Enhancements

- **AI-powered vulnerability analysis**
- **Leaderboard for top researchers**
- **Automated report verification system**

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## 📄 License

This project is licensed under the MIT License.
