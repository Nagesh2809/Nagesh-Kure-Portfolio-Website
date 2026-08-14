# Deploying Nagesh Kure Portfolio to Render

## Prerequisites
1. GitHub account
2. Render account (sign up at https://render.com)
3. Your code pushed to GitHub

## Step-by-Step Deployment Guide

### 1. Push Your Code to GitHub
```bash
git add .
git commit -m "Ready for Render deployment"
git push origin main
```

### 2. Create New Static Site on Render

1. Go to https://dashboard.render.com
2. Click **"New +"** button → Select **"Static Site"**
3. Connect your GitHub repository
4. Configure the site:
   - **Name**: `anurag-sharma-portfolio`
   - **Branch**: `main`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

### 3. Add Environment Variables

In the Render dashboard, go to **Environment** tab and add:

```
GEMINI_API_KEY=your-actual-gemini-api-key
GEMINI_MODEL=gemini-2.0-flash-exp
```

⚠️ **IMPORTANT**: Replace `your-actual-gemini-api-key` with your actual API key from the `.env` file

### 4. Deploy!

Click **"Create Static Site"** and Render will:
- Install dependencies
- Build your React app
- Deploy it to a live URL

## Your Live URL

After deployment, your portfolio will be available at:
```
https://anurag-sharma-portfolio.onrender.com
```

(or the custom URL Render provides)

## Features Deployed

✅ Futuristic loading screen with your name
✅ Dark/Light mode toggle
✅ JARVIS AI chatbot (with Gemini API)
✅ Resume download
✅ Contact section with LinkedIn, GitHub, Phone
✅ Responsive design
✅ Smooth animations

## Troubleshooting

### Build Fails?
- Check that `package.json` has all dependencies
- Ensure Node version is 18+

### AI Chat Not Working?
- Verify `GEMINI_API_KEY` is set correctly in Render environment variables
- Check browser console for errors

### Resume Download Not Working?
- Make sure `resume.pdf` file is in the `public/` folder
- Commit and push the file to GitHub

## Updating Your Site

Whenever you push changes to GitHub main branch, Render will automatically rebuild and redeploy!

```bash
git add .
git commit -m "Update portfolio"
git push origin main
```

## Custom Domain (Optional)

To use your own domain (e.g., `anurag-sharma.com`):
1. Go to Render dashboard → Settings → Custom Domain
2. Add your domain
3. Update DNS records as instructed by Render

---

🎉 **Your portfolio is now live!** Share it with recruiters and showcase your AI/ML expertise!
