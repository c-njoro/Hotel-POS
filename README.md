INSTRUCTIONS TO USE THE RESTAURANT MANAGEMENT SYSTEM

# COMPUTER REQUIREMENTS

## Prerequisites

Before proceeding, ensure you have the following installed:

- Node.js (vXX or higher)
- MongoDB Community Server
- MongoDB Compass
- Git (optional but recommended)
- VS Code (or any code editor)

If not installed:

- Install MongoDB from 👉 https://www.mongodb.com/try/download/community
- Install MongoDB Compass from 👉 https://www.mongodb.com/try/download/compass
- Install Node.js from 👉 https://nodejs.org/en/download

Then start MongoDB and ensure its state is active:

- **Windows:** `net start MongoDB`
- **Linux:** `sudo systemctl start mongod`

---

# INSTRUCTIONS TO SET UP THE SYSTEM

1. Download the `hotel-pos` folder and open it in VS Code.
2. Open the terminal in VS Code.

### ▶️ SET UP THE BACKEND AND DATABASE

1. In the terminal, navigate to `hotel-pos/backend`
2. Run the command: `npm install` to install backend dependencies.
3. In the `backend/` folder, create a new file named `.env` and add the following:
   ```env
   PORT=5000
   LOCAL_KEY=mongodb://localhost:27017/HotelDatabase
   ```

### ▶️ SET UP THE FRONTEND

1. In the terminal, navigate to `hotel-pos/userend`
2. Run the command: `npm install` to install frontend dependencies.
3. In the `userend/` folder, create a new file named `.env.local` and add the following:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=4kDc8bMI6SiuIGV4iC0gwBeOVICyXIbuF79VLtHVFI4
   NEXT_PUBLIC_BASE_URL=http://localhost:5000
   NEXT_PUBLIC_DISHES_URL=${NEXT_PUBLIC_BASE_URL}/api/dishes
   NEXT_PUBLIC_USERS_URL=${NEXT_PUBLIC_BASE_URL}/api/users
   NEXT_PUBLIC_STOCK_URL=${NEXT_PUBLIC_BASE_URL}/api/stock
   NEXT_PUBLIC_ORDERS_URL=${NEXT_PUBLIC_BASE_URL}/api/orders
   NEXT_PUBLIC_MESSAGES_URL=${NEXT_PUBLIC_BASE_URL}/api/messages
   NEXT_PUBLIC_BASE_URL_FOR_ADMIN=${NEXT_PUBLIC_BASE_URL}/api
   NEXT_PUBLIC_MANAGER_AUTH=njoroge
   INSTA_SECRET_API=ISSecretKey_test_484250d8-6fae-4d5b-a82f-6a44259e4336
   INSTA_PUBLISHABLE_KEY=ISPubKey_test_63b16bac-38b7-4d16-bd5e-847ceddf4911
   NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
   ```

### 💡 Folder Structure Should Look Like This

```bash
hotel-pos/
├── backend/
│   ├── .env
│   └── ...
├── userend/
│   ├── .env.local
│   └── ...
└── README.md
```

---

# INSTRUCTIONS TO RUN THE SYSTEM

1. In the VS Code terminal, ensure you are in the `hotel-pos/` directory.
2. Run the command: `npm run start-app`

### 🧑‍💼 Add a Manager User via MongoDB Compass

1. Create a `.json` file anywhere with the following content:
   ```json
   {
     "_id": { "$oid": "66fa7f5497f89fc474655dad" },
     "name": "Charles Njoroge",
     "username": "njoro",
     "email": "manager@gmail.com",
     "password": "manager1234",
     "profilePicture": "https://images.pexels.com/photos/3760373/pexels-photo-3760373.jpeg",
     "isActive": true,
     "role": "manager",
     "dateCreated": { "$date": "2024-09-30T10:37:08.150Z" },
     "dateUpdated": { "$date": "2024-09-30T10:37:08.150Z" },
     "__v": 0,
     "shifts": []
   }
   ```
2. Open MongoDB Compass and connect to your local database.
3. Navigate to `HotelDatabase > users`
4. Click **Add Data** → **Import File** → Choose the `.json` file.

### 🔐 Log in as the Manager

1. Open a browser and go to: `http://localhost:3000`
2. Click **Login** and use:
   - **Email:** `manager@gmail.com`
   - **Password:** `manager1234`
3. On the manager’s dashboard, click **Main Management**.
4. Go to the **Users** section and create new users with roles:
   - Waiter
   - Kitchen
   - Cashier

You can now log in with different roles in separate browsers or sessions to use the system.

---

# ✅ VERIFY INSTALLATION CHECKLIST

- [ ] MongoDB service is running
- [ ] Backend server is running on `localhost:5000`
- [ ] Frontend is running on `localhost:3000`
- [ ] Able to log in as manager

---

# ❗ COMMON ERRORS AND FIXES

### ⚠️ Error: "Could not connect to database"

**Possible Causes:**

- MongoDB service is not running
- `.env` file in `backend/` is missing or incorrect

**Solutions:**

- Start MongoDB:
  - Windows: `net start MongoDB`
  - Linux: `sudo systemctl start mongod`
- Ensure your `.env` contains:
  ```env
  LOCAL_KEY=mongodb://localhost:27017/HotelDatabase
  ```
- Make sure MongoDB Compass and your app are referring to the same database name: `HotelDatabase`

---

Need help? Reach out to the project maintainer.
