# EduCRM - Lead Management System

This project is a full-stack MERN (MongoDB, Express, React, Node.js) application built as a Customer Relationship Management (CRM) system for an educational company. It allows counselors to manage and claim new student enquiries (leads) submitted through a public form.

This application was based on the Fastor Node.js Developer assignment.

## Features

* **Public Landing Page:** A modern, responsive landing page for prospective clients.
* **Public Enquiry Form:** A public-facing form for clients to submit their course interests.
* **Counselor Authentication:** Secure registration and login for employees/counselors using JWT (JSON Web Tokens).
* **Counselor Dashboard:** A private, protected dashboard for logged-in counselors.
* **Tabbed Navigation:** Easily switch between "Public Enquiries" and "My Enquiries".
* **Claim Leads:** Counselors can "claim" a public lead, which assigns it to them and removes it from the public pool.
* **Unclaim Leads:** Counselors can "unclaim" one of their private leads, returning it to the public pool for others.

## 🛠️ Tech Stack

### Backend (Server-side)

* **Node.js:** JavaScript runtime environment.
* **Express:** Web framework for Node.js.
* **MongoDB:** NoSQL database for storing user and enquiry data.
* **Mongoose:** Object Data Modeling (ODM) library for MongoDB.
* **jsonwebtoken (JWT):** For secure user authentication.
* **bcryptjs:** For hashing passwords.
* **dotenv:** For managing environment variables.
* **cors:** For enabling cross-origin requests.

### Frontend (Client-side)

* **React:** JavaScript library for building user interfaces.
* **React Router (`react-router-dom`):** For client-side routing.
* **Axios:** For making HTTP requests to the backend API.
* **date-fns:** For formatting dates (e.g., "submitted 1 minute ago").
* **react-icons:** For icons used in the UI.

## 📂 Project Structure"# customer-relationship-management-frontend" 
