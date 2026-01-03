# 🔧 MongoDB Setup Guide - Complete Solution

## ❌ Current Problem

**mongosh connection failed with:**
```
MongoServerSelectionError: SSL routines:ssl3_read_bytes:tlsv1 alert internal error
It looks like this is a MongoDB Atlas cluster. 
Please ensure that your Network Access List allows connections from your IP.
```

**This means:**
1. ✅ mongosh is installed (version 2.3.4)
2. ❌ SSL/TLS error (Node.js v22 / mongosh compatibility issue)
3. ⚠️ IP address might not be whitelisted in MongoDB Atlas

---

## ✅ RECOMMENDED SOLUTION: Install Local MongoDB

Since you have mongosh installed, let's use **local MongoDB** instead of Atlas. This will:
- ✅ Fix SSL errors instantly
- ✅ Work perfectly with Node.js v22
- ✅ No internet required
- ✅ Faster development
- ✅ No IP whitelist needed

---

## 📥 Step-by-Step: Install MongoDB Locally

### Step 1: Download MongoDB Community Edition

**Windows Download:**
https://www.mongodb.com/try/download/community

1. Select: **Windows**
2. Select: **MSI** package
3. Click **Download**

### Step 2: Install MongoDB

1. Run the downloaded installer
2. Choose **Complete** installation
3. Select **"Install MongoDB as a Service"** ✅
4. Keep default port: **27017**
5. Click **Install**

### Step 3: Verify MongoDB is Running

After installation, run:
```powershell
mongosh
```

You should see:
```
Current Mongosh Log ID: ...
Connecting to: mongodb://127.0.0.1:27017
Using MongoDB: 7.x.x
test>
```

If connected successfully, type `exit` to exit mongosh.

### Step 4: Update Backend .env

**Edit:** `c:\Users\HP\Desktop\Star\backend\.env`

**Change this line:**
```env
MONGO_URI=mongodb+srv://samrattx_db_user:mJ6ixqDwfNRoHgt1@cluster0.3q6nyiz.mongodb.net/?retryWrites=true&w=majority
```

**To this:**
```env
MONGO_URI=mongodb://localhost:27017/star-garter-db
```

### Step 5: Restart Backend

Your backend is running with nodemon, so it will auto-restart.

**Check backend terminal - you should see:**
```
[nodemon] restarting due to changes...
[nodemon] starting `node server.js`
🚀 Server running on port 5000
🌐 Environment: development
✅ MongoDB connected successfully
📊 Database: star-garter-db
```

### Step 6: Seed Menu Data

Once backend shows "MongoDB connected successfully":

```powershell
cd c:\Users\HP\Desktop\Star\backend
node seedMenu.js
```

**Expected output:**
```
🔄 Connecting to MongoDB...
✅ MongoDB connected!
🗑️ Clearing existing menu items...
📝 Inserting menu items...
✅ Successfully inserted 39 menu items!

Menu items by category:
  - Starters: 6 items
  - Mains: 18 items
  - Desserts: 8 items
  - Kids: 6 items
```

### Step 7: Test Admin Login

1. Go to: http://localhost:3000/admin/login
2. Email: `samrat.tx@gmail.com`
3. Password: `samrat2324$`
4. Click **Login**
5. **Should successfully log in!** ✅

### Step 8: Test Menu Page

1. Go to: http://localhost:3000/menu
2. **Should display all 39 menu items!** ✅

---

## 🎯 Quick Setup (No Installation)

If MongoDB Community Edition installer is too large or takes too long, you can use **MongoDB Portable**:

1. Download MongoDB ZIP (portable version)
2. Extract to `C:\mongodb`
3. Create folder `C:\mongodb\data`
4. Run: `C:\mongodb\bin\mongod.exe --dbpath C:\mongodb\data`
5. In another terminal: `mongosh`
6. Update `.env` to: `MONGO_URI=mongodb://localhost:27017/star-garter-db`

---

## 🔄 Alternative: Fix MongoDB Atlas Connection

If you prefer to keep using MongoDB Atlas, you need to:

### 1. Whitelist Your IP Address

1. Go to: https://cloud.mongodb.com
2. Login to your account
3. Select your cluster
4. Click **Network Access** (left sidebar)
5. Click **Add IP Address**
6. Click **Add Current IP Address**
7. Or click **Allow Access from Anywhere** (0.0.0.0/0) for testing

### 2. Downgrade to Node.js v18

The SSL error is caused by Node.js v22 incompatibility.

**Steps:**
1. Go to: https://nodejs.org/en/download/
2. Download **Node.js 18.x LTS**
3. Uninstall current Node.js v22
4. Install Node.js v18
5. Restart all terminals
6. Run `node --version` (should show v18.x.x)
7. Restart backend: `cd backend && npm run dev`

### 3. Update Connection String

If after downgrading to Node 18, the connection still fails, try:

**Edit backend/.env:**
```env
MONGO_URI=mongodb+srv://samrattx_db_user:mJ6ixqDwfNRoHgt1@cluster0.3q6nyiz.mongodb.net/star-garter-db?retryWrites=true&w=majority&tls=true
```

---

## ✅ Recommended Path

**For fastest results:**

1. ✅ **Install MongoDB locally** (10 minutes)
2. ✅ Update `.env` to use localhost
3. ✅ Backend auto-restarts and connects
4. ✅ Seed menu data
5. ✅ **Everything works!**

**Pros of Local MongoDB:**
- No internet needed
- Faster queries
- No IP restrictions
- No SSL issues
- Easy to inspect data with MongoDB Compass
- Perfect for development

**Cons:**
- Need to install MongoDB (200-400 MB)
- Data is only on your computer
- Need to migrate to Atlas for production deployment

---

## 🆘 Need Help?

**If MongoDB installation fails:**
- Try MongoDB Portable (ZIP version)
- Or I can help you fix Atlas connection
- Or try Docker MongoDB (if you have Docker)

**If backend still won't connect:**
- Check MongoDB service is running: `services.msc` (Windows)
- Look for "MongoDB" service, ensure it's "Running"
- Try connecting with mongosh first: `mongosh`

---

## 📝 Summary

**Current Status:**
✅ mongosh installed  
✅ Frontend working  
✅ Backend running  
❌ MongoDB not connected (SSL error)  

**Next Step:**
Choose ONE:
1. **Install MongoDB locally** ← RECOMMENDED
2. **Whitelist IP + Downgrade Node.js**
3. **Use MongoDB Docker**

**Once MongoDB connects:**
✅ Login works  
✅ Menu displays  
✅ Bookings save  
✅ Everything works perfectly!

---

**Which solution would you like to try first?**
