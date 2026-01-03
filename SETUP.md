# Star and Garter Oamaru - Setup Instructions

## Quick Start Guide

Follow these steps to get the project running on your local machine.

### Step 1: Install Backend Dependencies

```powershell
cd backend
npm install
```

### Step 2: Generate Admin Password Hash

After installing backend dependencies, generate the bcrypt hash for the admin password:

```powershell
node -e "const bcrypt = require('bcrypt'); bcrypt.hash('samrat2324$', 10, (err, hash) => { if (err) console.error(err); else console.log('Copy this hash:', hash); });"
```

### Step 3: Create Backend .env File

Create a file named `.env` in the `backend` folder with the following content:

```env
PORT=5000
NODE_ENV=development

# MongoDB Connection String (ALREADY PROVIDED)
MONGO_URI=mongodb+srv://samrattx_db_user:mJ6ixqDwfNRoHgt1@cluster0.3q6nyiz.mongodb.net/star-garter-db?retryWrites=true&w=majority&appName=Cluster0

# JWT Secret - CHANGE THIS IN PRODUCTION
JWT_SECRET=star_garter_jwt_secret_key_2026_change_in_production_minimum_32_chars

# Admin Credentials
ADMIN_EMAIL=samrat.tx@gmail.com
# Paste the bcrypt hash from Step 2 here:
ADMIN_PW_HASH=<PASTE_YOUR_HASH_HERE>

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Upload folder path (relative to backend)
UPLOAD_PATH=../frontend/public/upload
```

**IMPORTANT**: Replace `<PASTE_YOUR_HASH_HERE>` with the hash generated in Step 2.

### Step 4: Install Frontend Dependencies

Open a **new terminal window** and run:

```powershell
cd frontend
npm install
```

### Step 5: Create Frontend .env.local File

Create a file named `.env.local` in the `frontend` folder:

```env
REACT_APP_API_URL=http://localhost:5000/api/v1
REACT_APP_SITE_NAME=Star and Garter Oamaru
```

### Step 6: Start the Application

#### Option A: Run Backend and Frontend Separately

**Terminal 1 - Backend:**
```powershell
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm start
```

#### Option B: Coming Soon - Concurrent Script
(You can add a concurrent script in the root package.json later)

### Step 7: Access the Application

- **Frontend Website**: http://localhost:3000
- **Admin Login**: http://localhost:3000/admin/login
  - Email: samrat.tx@gmail.com
  - Password: samrat2324$
- **Backend API**: http://localhost:5000/api/v1
- **Health Check**: http://localhost:5000/api/v1/health

---

## Remaining Tasks

The following page files need to be created:

### Frontend Pages (Public)
- [x] `frontend/src/pages/Home.jsx` ✅ Created
- [ ] `frontend/src/pages/Menu.jsx`
- [ ] `frontend/src/pages/Specials.jsx`
- [ ] `frontend/src/pages/Booking.jsx`
- [ ] `frontend/src/pages/Reviews.jsx`
- [ ] `frontend/src/pages/Contact.jsx`

### Frontend Pages (Admin)
- [x] `frontend/src/pages/Admin/Auth/Login.jsx` ✅ Created
- [ ] `frontend/src/pages/Admin/Dashboard.jsx`
- [ ] `frontend/src/pages/Admin/MenuManager.jsx`
- [ ] `frontend/src/pages/Admin/SpecialsManager.jsx`
- [ ] `frontend/src/pages/Admin/BookingsReviews.jsx`

### Components
- [x] `frontend/src/components/Header.jsx` ✅ Created
- [x] `frontend/src/components/Footer.jsx` ✅ Created
- [x] `frontend/src/components/ProtectedRoute.jsx` ✅ Created
- [ ] `frontend/src/components/MenuItemCard.jsx`
- [ ] `frontend/src/components/SpecialCard.jsx`
- [ ] `frontend/src/components/BookingForm.jsx`
- [ ] `frontend/src/components/ReviewCard.jsx`
- [ ] `frontend/src/components/ConfirmModal.jsx`

## Next Steps

After completing the setup:

1. **Test the backend API** using the health check endpoint
2. **Login to admin panel** to verify authentication works
3. **Create the remaining page components** (I can help with this!)
4. **Add some test data** to MongoDB (menu items, specials, etc.)
5. **Test all features** (booking, reviews, menu management)

---

## Troubleshooting

### Backend won't start
- Check MongoDB connection string is correct
- Ensure `.env` file exists in `backend` folder
- Verify all dependencies are installed: `npm install`

### Frontend won't start  
- Ensure `.env.local` file exists in `frontend` folder
- Delete `node_modules` and run `npm install` again
- Clear browser cache

### Can't login to admin
- Verify the bcrypt hash is correctly pasted in backend `.env`
- Check browser console for errors
- Ensure backend is running on port 5000

---

## Need Help?

Let me know if you'd like me to:
1. Create the remaining page components
2. Add sample data seeding script
3. Create additional reusable components
4. Add more features or functionality
