# 🚀 Vercel Deployment - Step by Step Guide

## ✅ GitHub Push Complete!

Your code is now live at: **https://github.com/Shreenathmehta32/geoagent-DAO**

---

## 📋 Vercel Deployment Steps

### Option 1: Vercel Dashboard (Recommended - Easiest)

#### Step 1: Go to Vercel
1. Open browser: https://vercel.com
2. Click **"Sign Up"** or **"Log In"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub

#### Step 2: Import Project
1. Click **"Add New..."** → **"Project"**
2. Find **"geoagent-DAO"** in your repository list
3. Click **"Import"**

#### Step 3: Configure Build Settings
Vercel will auto-detect Vite. Verify these settings:

```
Framework Preset: Vite
Root Directory: frontend
Build Command: npm run build
Output Directory: dist
Install Command: npm install
Node.js Version: 20.x
```

#### Step 4: Add Environment Variables
Click **"Environment Variables"** and add:

| Name | Value |
|------|-------|
| `VITE_CONTRACT_ADDRESS` | `0x0000000000000000000000000000000000000000` (placeholder) |
| `VITE_CHAIN_ID` | `84532` |
| `VITE_WALLETCONNECT_PROJECT_ID` | Get from https://cloud.walletconnect.com |

> **Note:** You'll update `VITE_CONTRACT_ADDRESS` after deploying your smart contract

#### Step 5: Deploy!
1. Click **"Deploy"** button
2. Wait 2-3 minutes for build
3. Get your live URL: `https://geoagent-dao-xxxxx.vercel.app`

---

### Option 2: Vercel CLI (Alternative)

If you prefer command line:

```bash
cd c:\Users\Shreenath Mehta\OneDrive\Desktop\lnmhacks\frontend
vercel
```

Follow prompts:
- Set up and deploy? **Y**
- Link to existing project? **N**
- Project name? **geoagent-dao**
- Directory? **./** (press Enter)
- Override settings? **N**

---

## 🔧 After Deployment

### 1. Get WalletConnect Project ID
1. Go to https://cloud.walletconnect.com
2. Sign up/Login
3. Create new project: "GeoAgent DAO"
4. Copy the **Project ID**
5. Add to Vercel env vars: `VITE_WALLETCONNECT_PROJECT_ID`

### 2. Deploy Smart Contract
```bash
cd c:\Users\Shreenath Mehta\OneDrive\Desktop\lnmhacks
npx hardhat run scripts/deploy.js --network baseSepolia
```

Copy the deployed contract address.

### 3. Update Vercel Environment Variable
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Edit `VITE_CONTRACT_ADDRESS`
3. Paste your deployed contract address
4. Click **"Save"**
5. Go to Deployments → Click **"..."** → **"Redeploy"**

---

## ✅ Verification Checklist

After deployment, test these:

- [ ] Open Vercel URL in browser
- [ ] Landing page loads with GeoAgent branding
- [ ] Click "Connect Wallet" button
- [ ] MetaMask prompts to connect
- [ ] Switch to Base Sepolia network
- [ ] Dashboard shows treasury data (after contract deployment)
- [ ] No console errors in browser DevTools

---

## 🎯 For Hackathon Judges

Share these links:

1. **Live Dashboard:** [Your Vercel URL]
2. **GitHub Repository:** https://github.com/Shreenathmehta32/geoagent-DAO
3. **Smart Contract:** https://sepolia.basescan.org/address/[CONTRACT_ADDRESS]

---

## 🐛 Troubleshooting

### Build Fails on Vercel
- Check that `frontend/package.json` exists
- Verify `build` script is defined
- Check Vercel build logs for specific errors

### Wallet Won't Connect
- Verify `VITE_CHAIN_ID=84532`
- Check MetaMask is on Base Sepolia
- Clear browser cache

### Contract Data Not Loading
- Verify `VITE_CONTRACT_ADDRESS` is correct
- Check contract is deployed on Base Sepolia
- Open browser console for errors

---

## 📊 Deployment Timeline

- ⏱️ **GitHub Push:** ✅ Complete
- ⏱️ **Vercel Setup:** 5 minutes
- ⏱️ **First Deploy:** 2-3 minutes
- ⏱️ **Contract Deploy:** 5 minutes
- ⏱️ **Update & Redeploy:** 2 minutes
- **Total:** ~15 minutes to fully live dashboard

---

## 🚀 Next Steps

1. **Deploy to Vercel** (follow steps above)
2. **Deploy smart contract** to Base Sepolia
3. **Update environment variables** with contract address
4. **Test live dashboard** with wallet connection
5. **Share links** with hackathon judges

---

**Ready to deploy!** Start with Option 1 (Vercel Dashboard) - it's the easiest! 🎉
