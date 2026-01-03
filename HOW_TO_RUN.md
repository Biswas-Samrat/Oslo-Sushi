# ✅ .env Files Created Successfully!

## What Was Created

### 1. Backend .env File ✅
**Location:** `c:\Users\HP\Desktop\Star\backend\.env`

Contains:
- MongoDB connection string ✅
- JWT secret ✅
- Admin email: samrat.tx@gmail.com ✅
- Admin password hash (bcrypt) ✅
- CORS settings ✅

### 2. Frontend .env.local File ✅
**Location:** `c:\Users\HP\Desktop\Star\frontend\.env.local`

Contains:
- API URL: http://localhost:5000/api/v1 ✅
- Site name ✅

---

## 🚀 How to Run the Application

### Option 1: Run in Separate Terminals (RECOMMENDED)

#### Terminal 1 - Start Backend

Open PowerShell and run:
```powershell
cd c:\Users\HP\Desktop\Star\backend
npm run dev
```

**Expected Output:**
```
✅ MongoDB connected successfully
📊 Database: star-garter-db
🚀 Server running on port 5000
🌐 Environment: development
📡 API Base: http://localhost:5000/api/v1
🏥 Health Check: http://localhost:5000/api/v1/health
🕐 Running scheduled job: Expiring old specials...
```

**Keep this terminal open!** ← Backend must stay running

---

#### Terminal 2 - Start Frontend

Open a **NEW** PowerShell window and run:
```powershell
cd c:\Users\HP\Desktop\Star\frontend
npm start
```

**Expected Output:**
```
Compiled successfully!

You can now view star-garter-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

**Browser will automatically open at http://localhost:3000**

---

### Option 2: Quick Start Commands (Copy & Paste)

**Backend:**
```powershell
cd c:\Users\HP\Desktop\Star\backend; npm run dev
```

**Frontend (in new terminal):**
```powershell
cd c:\Users\HP\Desktop\Star\frontend; npm start
```

---

## 🌐 Access Your Application

Once both servers are running:

| What | URL | Purpose |
|------|-----|---------|
| **🏠 Website** | http://localhost:3000 | Main restaurant website |
| **🔐 Admin Panel** | http://localhost:3000/admin/login | Login to admin dashboard |
| **💚 Backend Health** | http://localhost:5000/api/v1/health | Check backend is running |

---

## 🔐 Admin Login Credentials

When you go to http://localhost:3000/admin/login:

- **Email:** `samrat.tx@gmail.com`
- **Password:** `samrat2324$`

---

## ✅ Verification Steps

### 1. Test Backend (5 seconds)
Open browser and go to: http://localhost:5000/api/v1/health

**You should see:**
```json
{
  "status": "OK",
  "message": "Star and Garter API is running",
  "timestamp": "2026-01-03T...",
  "environment": "development"
}
```

### 2. Test Frontend (5 seconds)
Go to: http://localhost:3000

**You should see:**
- ✅ Star & Garter header
- ✅ Hero section with "Welcome to Star & Garter"
- ✅ Navigation menu (Home, Menu, Daily Specials, etc.)

### 3. Test Admin Login (30 seconds)
1. Go to: http://localhost:3000/admin/login
2. Enter email: `samrat.tx@gmail.com`
3. Enter password: `samrat2324$`
4. Click "Login"
5. **You should be redirected to the admin dashboard!** ✅

---

## 🛑 How to Stop the Servers

**In each terminal window, press:**
```
Ctrl + C
```

Then confirm by pressing `Y` if asked.

---

## 🔄 Restart Servers

Just run the same commands again:

**Backend:**
```powershell
cd c:\Users\HP\Desktop\Star\backend
npm run dev
```

**Frontend:**
```powershell
cd c:\Users\HP\Desktop\Star\frontend
npm start
```

---

## 🆘 Troubleshooting

### ❌ "Cannot find module" error
**Solution:** Dependencies not installed
```powershell
cd backend
npm install
# OR
cd frontend
npm install
```

### ❌ "Port 3000 already in use"
**Solution:** Another app is using port 3000
```powershell
# Kill the process on port 3000
netstat -ano | findstr :3000
# Then use Task Manager to end that process
# Or change the port in package.json
```

### ❌ "Port 5000 already in use"
**Solution:** Another app is using port 5000
```powershell
# Kill the process on port 5000
netstat -ano | findstr :5000
```

### ❌ MongoDB connection failed
**Solution:** Check your internet connection
- MongoDB Atlas requires internet access
- Verify the `MONGO_URI` in backend/.env is correct

### ❌ Login fails with "Invalid credentials"
**Solution:** 
1. Check you're using the correct password: `samrat2324$`
2. Verify the bcrypt hash in `backend/.env` matches the one generated
3. Restart the backend server

### ❌ Frontend shows blank page
**Solution:**
1. Open browser console (F12)
2. Check for errors
3. Verify backend is running
4. Check `frontend/.env.local` has correct API_URL

---

## 📊 Development Workflow

**Daily work cycle:**

1. **Morning - Start servers**
   ```powershell
   # Terminal 1
   cd c:\Users\HP\Desktop\Star\backend
   npm run dev
   
   # Terminal 2 (new window)
   cd c:\Users\HP\Desktop\Star\frontend
   npm start
   ```

2. **During work - Code changes**
   - Backend: Save file → Server auto-restarts (nodemon)
   - Frontend: Save file → Browser auto-refreshes

3. **Evening - Stop servers**
   - Press `Ctrl+C` in each terminal

---

## 🎯 Next Steps

Now that your app is running, you can:

1. **Browse the website** at http://localhost:3000
2. **Test admin login** at http://localhost:3000/admin/login
3. **Start building pages** (Menu, Booking, etc.)
4. **Add test data** to MongoDB

Would you like me to build any of the remaining pages?

---

**✅ Environment Setup Complete!**
**✅ Servers Ready to Run!**
**🚀 Happy Coding!**
