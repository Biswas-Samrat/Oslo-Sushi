# 🚀 Deployment Guide for Render

I have configured the project so you can deploy it as a **single Web Service** on Render. This is the most efficient way for MERN apps.

## Step 1: Login to Render
Go to [dashboard.render.com](https://dashboard.render.com) and log in with your GitHub account.

## Step 2: Create a New Web Service
1. Click **New +** and select **Web Service**.
2. Select your repository: `Biswas-Samrat/star`.

## Step 3: Configure Settings
| Field | Value |
| :--- | :--- |
| **Name** | `star-garter-oamaru` (or any name you like) |
| **Root Directory** | (Leave empty) |
| **Language** | `Node` |
| **Build Command** | `npm run build` |
| **Start Command** | `npm start` |

## Step 4: Add Environment Variables
Click on **Advanced** -> **Add Environment Variable**:

| Key | Value |
| :--- | :--- |
| **NODE_ENV** | `production` |
| **PORT** | `10000` (Render will override this, but good to have) |
| **MONGO_URI** | `mongodb+srv://samrattx_db_user:mJ6ixqDwfNRoHgt1@cluster0.3q6nyiz.mongodb.net/star-garter-db?retryWrites=true&w=majority` |
| **JWT_SECRET** | `your_secret_key_here` (make it complex) |
| **ADMIN_EMAIL** | `samrat.tx@gmail.com` |
| **ADMIN_PW_HASH** | `$2b$10$km0v7FbiZCn0Ra3Q6SjBHuTKQtNkroOuY2SLlwPvpfezML4nddU4y` |
| **FRONTEND_URL** | (The URL of your Render app, e.g., `https://star-garter-oamaru.onrender.com`) |

## Step 5: Deploy!
Click **Create Web Service**. Render will now:
1.  Download your code.
2.  Run `npm run build` (which builds the React frontend).
3.  Run `npm start` (which starts the Node.js server).
4.  Serve your website!

---

### Important Notes:
*   **MongoDB Atlas:** Ensure your IP whitelist on MongoDB Atlas includes `0.0.0.0/0` or you use a static IP (Render free tier IPs change frequently).
*   **Startup time:** On the free tier, the service might take ~30-60 seconds to "wake up" if it hasn't been used for a while.
