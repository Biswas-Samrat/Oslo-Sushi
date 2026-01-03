# Star and Garter Oamaru - MERN Stack Restaurant Website

Full-featured restaurant website with admin panel, table booking, reviews, daily specials scheduling, and SEO optimization.

## 🏗️ Tech Stack

- **Frontend**: React 18+, TailwindCSS, React Router, Axios, react-toastify, lucide-react
- **Backend**: Node.js (LTS), Express, MongoDB (Atlas), Mongoose
- **Authentication**: JWT (admin panel)
- **File Upload**: Multer (images saved to frontend/public/upload/)
- **Scheduling**: node-cron (auto-expire specials)

## 📁 Project Structure

```
/star-and-garter-omaru
  /frontend
    /public
      /upload/          # Daily special images stored here
    /src
      /components       # Reusable UI components
      /pages           # All pages (Home, Menu, Admin, etc.)
      /utils           # Helper functions (currency formatter, etc.)
      /api             # API client setup
    .env.local         # Frontend environment variables
    tailwind.config.js
    package.json
  /backend
    /controllers       # Business logic
    /models           # Mongoose schemas
    /routes           # API endpoints
    /middleware       # Auth & validation
    server.js         # Express server entry point
    .env              # Backend environment variables
    package.json
  .gitignore
  README.md
```

## 🔒 Security Notes

⚠️ **IMPORTANT SECURITY WARNINGS:**

1. **Admin Credentials**: This project uses a single set of admin credentials stored in `.env`. Password is hashed with bcrypt.
   - **Email**: samrat.tx@gmail.com
   - **Password**: samrat2324$ (hashed in .env)

2. **Image Uploads**: Images are saved to `frontend/public/upload/` for simplicity. 
   - ⚠️ **NOT RECOMMENDED FOR PRODUCTION**: Use AWS S3, Cloudinary, or backend-served static folder in production.

3. **Environment Files**: Never commit `.env` or `.env.local` to Git. They are in `.gitignore`.

## 🚀 Quick Start

### Prerequisites

- Node.js (LTS version 18+ recommended)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### 1. Clone & Install Dependencies

```bash
# Navigate to project root
cd c:/Users/HP/Desktop/Star

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Environment Setup

#### Backend `.env` file

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://samrattx_db_user:mJ6ixqDwfNRoHgt1@cluster0.3q6nyiz.mongodb.net/star-garter-db?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
ADMIN_EMAIL=samrat.tx@gmail.com
ADMIN_PW_HASH=$2b$10$YourBcryptHashHere
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

**Generate bcrypt hash for password:**

```bash
# In backend folder, run this Node script
node -e "const bcrypt = require('bcrypt'); bcrypt.hash('samrat2324$', 10, (err, hash) => console.log(hash));"
```

Copy the output hash and paste it into `ADMIN_PW_HASH` in your `.env` file.

#### Frontend `.env.local` file

Create `frontend/.env.local`:

```env
REACT_APP_API_URL=http://localhost:5000/api/v1
REACT_APP_SITE_NAME=Star and Garter Oamaru
```

### 3. Run the Application

**Option A: Run Backend & Frontend Separately**

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

**Option B: Run Concurrently (from project root)**

```bash
npm run dev
```

### 4. Access the Application

- **Website**: http://localhost:3000
- **Admin Login**: http://localhost:3000/admin/login
  - Email: samrat.tx@gmail.com
  - Password: samrat2324$
- **API Health Check**: http://localhost:5000/api/v1/health

## 📋 Features

### Public Features

✅ **Home Page**
- Hero section with CTA
- Daily specials carousel (auto-rotate if multiple)
- Brief intro, opening hours, contact info
- JSON-LD LocalBusiness structured data for SEO

✅ **Menu Page**
- Grouped menu items (Starters, Mains, Desserts, Kids)
- NZD currency formatting
- Discount badge and "Local Favorite" tag display
- Responsive grid layout

✅ **Daily Specials**
- Shows active specials with schedule info
- Carousel with arrows (if multiple specials)
- Auto-expires based on endDate

✅ **Table Booking**
- Form: name, phone, email (optional), date, time, party size, special requests
- Validation & phone masking
- Success toast notification

✅ **Reviews**
- Display existing reviews (with featured reviews highlighted)
- Submit new review: name, rating (1-5), comment, optional email
- Toast notification on submission

✅ **Contact Page**
- Embedded map
- Address: Ground Floor/9 Itchen Street, Oamaru 9400, New Zealand
- Phone, email, social links

### Admin Panel Features

🔐 **Authentication**
- JWT-based login (8-hour expiry)
- Protected routes

📊 **Dashboard**
- Quick stats cards (total bookings, reviews, active specials, menu items)

🍽️ **Menu Manager**
- Add/Edit/Delete menu items
- Upload images
- Set discount & "Local Favorite" tag
- Confirmation modal for delete

🎯 **Specials Manager**
- Create single or multiple specials
- Schedule: startDate, endDate, optional startTime
- Upload images (saved to frontend/public/upload/)
- Stop running specials (moves to "Stopped" section)
- Delete with confirmation
- View expired specials history
- Restore historic specials back to active
- Auto-expiration via cron job

📅 **Bookings & Reviews**
- View all bookings (filter, search, date range)
- Confirm/Cancel bookings
- View all reviews
- Delete reviews (with confirmation)
- Mark reviews as "Featured"

## 🌐 API Endpoints

All endpoints prefixed with `/api/v1`

### Authentication
- `POST /admin/login` - Admin login (returns JWT)

### Menu
- `GET /menu` - List all menu items
- `GET /menu/:id` - Get single item
- `POST /menu` - Create item (admin)
- `PUT /menu/:id` - Update item (admin)
- `DELETE /menu/:id` - Delete item (admin)

### Specials
- `GET /specials/active` - Active specials only
- `GET /specials` - All specials (admin)
- `POST /specials` - Create (accepts single or array) (admin)
- `PUT /specials/:id` - Edit special (admin)
- `POST /specials/:id/stop` - Stop special (admin)
- `DELETE /specials/:id` - Delete special (admin)
- `POST /specials/:id/restore` - Restore from history (admin)

### Bookings
- `POST /bookings` - Create booking (public)
- `GET /bookings` - List bookings (admin)
- `PUT /bookings/:id` - Update status (admin)

### Reviews
- `POST /reviews` - Submit review (public)
- `GET /reviews` - List reviews
- `DELETE /reviews/:id` - Delete review (admin)
- `PUT /reviews/:id/feature` - Toggle featured (admin)

### Upload
- `POST /upload` - Upload image (admin) - saves to frontend/public/upload/

### Health
- `GET /health` - Health check

## 🎨 Frontend Components

- **Header** - SEO-friendly nav, mobile hamburger menu
- **Footer** - Address, hours, JSON-LD schema
- **SpecialCard** - Display daily special with image, pricing, schedule
- **MenuItemCard** - Menu item with discount/favorite badges
- **BookingForm** - Table reservation form
- **ReviewForm** - Submit review form
- **ReviewCard** - Display single review with rating stars
- **AdminTable** - Reusable table for admin data
- **ConfirmModal** - Yes/No confirmation dialog
- **Toast notifications** - Success/error messages

## 💰 NZD Currency Formatting

All prices displayed using:

```javascript
new Intl.NumberFormat('en-NZ', { 
  style: 'currency', 
  currency: 'NZD' 
}).format(price)
```

Example: `$25.00` (NZD)

## 🔍 SEO Implementation

✅ Meta tags (react-helmet)
✅ Open Graph tags
✅ JSON-LD LocalBusiness schema
✅ Menu item structured data
✅ Semantic HTML5
✅ Accessible navigation
✅ Fast load times
✅ Mobile-responsive

**LocalBusiness Schema Data:**
- Name: Star and Garter Oamaru
- Address: Ground Floor/9 Itchen Street, Oamaru 9400, New Zealand
- Price Range: $20–40
- Opening Hours: (configure in code)
- Telephone: (configure in code)

## 📦 Dependencies

### Backend

```json
{
  "express": "^4.18.2",
  "mongoose": "^8.0.0",
  "bcrypt": "^5.1.1",
  "jsonwebtoken": "^9.0.2",
  "cors": "^2.8.5",
  "multer": "^1.4.5-lts.1",
  "node-cron": "^3.0.3",
  "helmet": "^7.1.0",
  "express-validator": "^7.0.1",
  "dotenv": "^16.3.1"
}
```

### Frontend

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.0",
  "axios": "^1.6.2",
  "react-hook-form": "^7.48.2",
  "react-toastify": "^9.1.3",
  "lucide-react": "^0.294.0",
  "react-helmet": "^6.1.0"
}
```

## 🔄 Daily Specials Auto-Expiration

Backend uses `node-cron` to run a scheduled job every hour:

```javascript
// Checks all active specials
// If endDate < now, moves to status: 'history'
```

Also checked lazily when `GET /specials/active` is called.

## 🛠️ Development Scripts

### Backend

```bash
npm run dev     # Start with nodemon (hot reload)
npm start       # Production start
```

### Frontend

```bash
npm start       # Development server
npm run build   # Production build
```

## 🚀 Production Deployment

### Recommendations

1. **Environment Variables**
   - Use production MongoDB URI
   - Generate strong JWT_SECRET (64+ characters)
   - Set FRONTEND_URL to production domain
   - Update CORS settings in backend

2. **Image Uploads**
   - ⚠️ Move from frontend/public/upload to:
     - AWS S3 / Cloudinary (recommended)
     - Backend static folder served via Express
   - Update Multer config & API accordingly

3. **Security**
   - Enable HTTPS
   - Use helmet.js (already included)
   - Rate limiting for API endpoints
   - Consider multi-admin system with proper user management

4. **Build & Deploy**
   - Build frontend: `cd frontend && npm run build`
   - Serve via Nginx or use platforms:
     - Frontend: Vercel, Netlify
     - Backend: Railway, Render, AWS EC2

5. **MongoDB**
   - Ensure MongoDB Atlas is in production cluster
   - Whitelist production server IP
   - Enable connection pooling

## 📝 Changing Admin Credentials

To change admin email/password:

1. Update `ADMIN_EMAIL` in `backend/.env`
2. Generate new hash:
   ```bash
   node -e "const bcrypt = require('bcrypt'); bcrypt.hash('your_new_password', 10, (err, hash) => console.log(hash));"
   ```
3. Update `ADMIN_PW_HASH` in `backend/.env`
4. Restart backend server

## ♿ Accessibility

- Keyboard navigation support
- ARIA labels on modals and interactive elements
- Alt text on all images
- Focus states on buttons and links
- Semantic HTML structure

## 📞 Support & Contact

For issues or questions regarding this project:
- Review the code comments
- Check MongoDB connection string is correct
- Ensure both .env files are properly configured
- Verify all dependencies are installed

## 📄 License

Private project - All rights reserved

---

**Built with ❤️ for Star and Garter Oamaru**
