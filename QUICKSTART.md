# ⚡ QUICK START GUIDE - Star & Garter Oamaru

## 🚀 Get Running in 5 Minutes!

### Step 1: Generate Password Hash (30 seconds)
```powershell
cd c:\Users\HP\Desktop\Star\backend
node generate-hash.js
```
**→ COPY THE HASH THAT APPEARS!**

---

### Step 2: Create backend/.env (1 minute)
```powershell
cd c:\Users\HP\Desktop\Star\backend
New-Item -Path .env -ItemType File
```

Then open `.env` and paste:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://samrattx_db_user:mJ6ixqDwfNRoHgt1@cluster0.3q6nyiz.mongodb.net/star-garter-db?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=star_garter_restaurant_jwt_secret_2026_change_this_in_production
ADMIN_EMAIL=samrat.tx@gmail.com
ADMIN_PW_HASH=<PASTE YOUR HASH HERE>
FRONTEND_URL=http://localhost:3000
UPLOAD_PATH=../frontend/public/upload
```

---

### Step 3: Create frontend/.env.local (30 seconds)
```powershell
cd c:\Users\HP\Desktop\Star\frontend
New-Item -Path .env.local -ItemType File
```

Then open `.env.local` and paste:
```env
REACT_APP_API_URL=http://localhost:5000/api/v1
REACT_APP_SITE_NAME=Star and Garter Oamaru
```

---

### Step 4: Start Backend (Terminal 1)
```powershell
cd c:\Users\HP\Desktop\Star\backend
npm run dev
```
**Wait for:** ✅ MongoDB connected successfully

---

### Step 5: Start Frontend (Terminal 2)
```powershell
cd c:\Users\HP\Desktop\Star\frontend
npm start
```
**Wait for:** Browser opens at http://localhost:3000

---

## ✅ DONE! Your app is running!

### Test It:
- 🌐 Website: http://localhost:3000
- 🔐 Admin: http://localhost:3000/admin/login
  - Email: **samrat.tx@gmail.com**
  - Password: **samrat2324$**
- 💚 API: http://localhost:5000/api/v1/health

---

## 🆘 Common Issues

**"Cannot find module 'bcrypt'"**  
→ Backend dependencies not installed. Run: `cd backend && npm install`

**"Cannot connect to MongoDB"**  
→ Check your internet connection. MongoDB Atlas needs internet access.

**"Token verification failed"**  
→ Wrong bcrypt hash. Regenerate it with `node generate-hash.js`

**Frontend won't start**  
→ Wait for npm install to finish, then try again.

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `README.md` | Full documentation |
| `PROJECT_STATUS.md` | Current status & next steps |
| `SETUP.md` | Detailed setup guide |
| `backend/.env` | **YOU MUST CREATE THIS** |
| `frontend/.env.local` | **YOU MUST CREATE THIS** |

---

## 🎯 What's Next?

The foundation is 100% complete! Now you need to build the remaining page components.

**Recommended order:**
1. Menu page (2 hours)
2. Booking page (1.5 hours)
3. Reviews page (1.5 hours)
4. Specials page (1 hour)
5. Admin panels (4 hours)

**Total estimated time:** 10-12 hours of development

---

## 💡 Need Help Building Pages?

Just ask me! I can build:
- ✨ "Build the Menu page with filters"
- ✨ "Create the booking form with validation"
- ✨ "Build the admin menu manager"
- ✨ "Create all remaining pages"

---

**Happy Coding! 🚀**
