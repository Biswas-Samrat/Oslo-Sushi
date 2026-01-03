# ⚠️ IMPORTANT: FOLLOW THESE STEPS TO CREATE YOUR .env FILE

## Step 1: Generate Bcrypt Hash

Run this command in the backend folder:

```powershell
node generate-hash.js
```

This will output a bcrypt hash. Copy it!

## Step 2: Create .env File

Create a file named `.env` (no extension) in the `backend` folder with this content:

```env
PORT=5000
NODE_ENV=development

# MongoDB Connection String (ALREADY PROVIDED BY YOU)
MONGO_URI=mongodb+srv://samrattx_db_user:mJ6ixqDwfNRoHgt1@cluster0.3q6nyiz.mongodb.net/star-garter-db?retryWrites=true&w=majority&appName=Cluster0

# JWT Secret - CHANGE THIS IN PRODUCTION (make it long and random)
JWT_SECRET=star_garter_restaurant_jwt_secret_2026_minimum_32_characters_required

# Admin Credentials
ADMIN_EMAIL=samrat.tx@gmail.com

# PASTE THE BCRYPT HASH FROM STEP 1 HERE:
ADMIN_PW_HASH=$2b$10$PASTE_YOUR_GENERATED_HASH_HERE

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Upload folder path (relative to backend)
UPLOAD_PATH=../frontend/public/upload
```

## Example (with a real hash):

```env
ADMIN_PW_HASH=$2b$10$XqZ5XqZ5XqZ5XqZ5XqZ5XuJ7GqZ5XqZ5XqZ5XqZ5XqZ5XqZ5XqZ
```

## Step 3: Verify

After creating the `.env` file, you can test the backend:

```powershell
npm run dev
```

Then visit: http://localhost:5000/api/v1/health

---

## Quick Command Reference

**In backend folder:**
```powershell
# Generate hash
node generate-hash.js

# Start backend
npm run dev
```

**In frontend folder:**
```powershell
# Start frontend  
npm start
```

---

## Cannot create .env because it's in .gitignore

This is CORRECT and for security! The `.env` file contains sensitive credentials and should NEVER be committed to Git.

You must manually create it by:
1. Opening Notepad or VS Code
2. Creating a new file
3. Saving it as `.env` (with the dot) in the backend folder
4. Pasting the content above with your generated hash

Or use PowerShell:
```powershell
cd backend
New-Item -Path .env -ItemType File
```

Then edit it with your text editor.
