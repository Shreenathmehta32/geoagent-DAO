# GeoAgent DAO - Vercel Deployment Guide

## 🚀 Quick Deployment Steps

### 1. Run Vercel CLI
```bash
cd c:\Users\Shreenath Mehta\OneDrive\Desktop\lnmhacks\frontend
vercel
```

### 2. Follow the Prompts

When you run `vercel`, you'll see:

**First Time Setup:**
```
? Set up and deploy "~/frontend"? [Y/n] y
? Which scope do you want to deploy to? [Your Account]
? Link to existing project? [y/N] n
? What's your project's name? geoagent-dao
? In which directory is your code located? ./
```

**Configuration:**
```
Auto-detected Project Settings (Vite):
- Build Command: npm run build
- Output Directory: dist
- Development Command: npm run dev

? Want to override the settings? [y/N] n
```

### 3. Deployment

Vercel will:
- ✅ Upload your code
- ✅ Install dependencies
- ✅ Build the project (using their Node.js version - no local issues!)
- ✅ Deploy to a live URL

### 4. Get Your Live URL

After deployment completes, you'll see:
```
✅ Production: https://geoagent-dao-xxxxx.vercel.app
```

## 🔧 Adding Environment Variables

After first deployment, add your contract address:

```bash
vercel env add VITE_CONTRACT_ADDRESS
# Paste your deployed contract address when prompted

vercel env add VITE_WALLETCONNECT_PROJECT_ID  
# Paste your WalletConnect project ID
```

Then redeploy:
```bash
vercel --prod
```

## 📝 Important Notes

1. **Vercel uses their own Node.js version** - the local Vite crash won't happen!
2. **Free tier** - Perfect for hackathon demos
3. **Automatic HTTPS** - Secure by default
4. **Fast CDN** - Global edge network

## 🎯 What Happens Next

Once deployed, your dashboard will be live at:
- Landing page with DAO mission
- All 5 pages accessible
- Wallet connection working (once you add env vars)
- Real-time blockchain data (once contract is deployed)

## ⚡ Quick Commands

```bash
# Deploy to production
vercel --prod

# View deployment logs
vercel logs

# List all deployments
vercel list

# Open project in browser
vercel open
```

---

**Ready to deploy!** Just run `vercel` in your terminal and follow the prompts.
