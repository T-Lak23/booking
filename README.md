# 🌍 BookIt: Experiences & Slots

A fullstack web application that lets users explore travel experiences, check available time slots, and book experiences seamlessly — with promo codes, discounts, and booking confirmation.

---

## 🚀 Tech Stack

### **Frontend**

- React (Vite)
- TailwindCSS (UI Styling)
- React Hot Toast (Notifications)
- React Router (Navigation)
- TypeScript (Type Safety)

### **Backend**

- Node.js + Express.js
- MongoDB + Mongoose (Database)
- RESTful API Architecture

---

## Folder Structure

### **Backend**

```
backend/
├── src/
│ ├── config/ # Database connection, environment variables
│ ├── controllers/ # Route controller logic
│ ├── middlewares/ # Middleware utilities
│ ├── models/ # Mongoose models
│ ├── routes/ # API routes
│ ├── utils/ # Helper functions and error handling
│ ├── seed/ # Seed data for initial setup
│ └── index.js # Entry point for backend server
└── package.json
```

### **Frontend**

```
frontend/
├── src/
│ ├── components/ # UI components (Navbar, Button, Layout, etc.)
│ ├── hooks/ # Custom React hooks (e.g., useBooking)
│ ├── config/ # API configuration and environment setup
│ ├── store/ # Zustand state management
│ ├── pages/ # Page components (Home, Details, Confirmation)
│ ├── types/ # TypeScript types and interfaces
│ └── main.tsx # Entry point for the React app
├── public/
│ └── assets/ # Static assets like images/icons
└── package.json

```

## Features

**Browse Experiences**

- Displays all experiences with images, titles, and prices.
- Search functionality.

**Book a Slot**

- Select date, time, and quantity of seats.
- Prevents double booking and updates seat availability dynamically.

**Promo Code System**

- Apply discount codes (`percent` or `flat`) before checkout.

**Final Breakdown**

- Displays total cost, taxes, and applied discounts before payment.

**Booking Confirmation**

- Shows unique booking reference ID (e.g., `BOOK-DKLDBBCS`).
- Automatically clears stored booking data after completion.

---

## ⚙️ Environment Setup

### Clone the repository

```bash
git clone https://github.com/T-Lak23/booking.git
cd booking
```

### Install dependencies

**Backend**

```bash
cd backend
npm install
```

**Frontend**

```bash
cd frontend
npm install
```

### Create `.env` in `backend/`

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=frontend_url
NODE_ENV=development or production
```

### Create `.env` in `frontend/`

```env
VITE_BACKEND_URL=backend_url
```

### Run both servers

**Backend**

```bash
npm run dev
```

**Frontend**

```bash
npm run dev
```

Visit 👉 **[https://booking-frontend-w0nk.onrender.com](https://booking-frontend-w0nk.onrender.com)**

---

## Booking Flow

1. User browses an experience → selects slot.
2. Enter name and email
3. User applies promo code.
4. Confirmation page displays booking reference (REF ID).

---

## Example Booking Response

```json
{
  "message": "Booking successful",
  "booking": {
    "bookingId": "BOOK-DKLDBBCS",
    "experienceId": "671f21cc39...",
    "date": "2025-10-30",
    "time": "10:00 AM",
    "seatsBooked": 2,
    "finalAmount": 799
  }
}
```

---

## 🪪 License

This project is licensed under the MIT License.

---
