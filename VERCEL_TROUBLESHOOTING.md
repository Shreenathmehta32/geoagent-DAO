# Vercel Deployment Troubleshooting Guide

## Common Vercel Errors & Solutions

### Error 1: "Build failed" or "Command failed"

**Cause:** Vercel can't find the correct build directory or package.json

**Solution:**
1. In Vercel Dashboard → Project Settings → General
2. Set **Root Directory** to: `frontend`
3. Set **Build Command** to: `npm run build`
4. Set **Output Directory** to: `dist`
5. Set **Install Command** to: `npm install`

### Error 2: "Module not found" or dependency errors

**Cause:** Missing dependencies in package.json

**Solution:**
All dependencies are already in `frontend/package.json`. Vercel should auto-install them.

If it fails, check that these are in `dependencies` (not `devDependencies`):
- react
- react-dom
- react-router-dom
- @rainbow-me/rainbowkit
- wagmi
- viem
- ethers

### Error 3: TypeScript compilation errors

**Cause:** Strict TypeScript checking

**Solution:**
The `tsconfig.json` is already configured with:
```json
"noUnusedLocals": false,
"noUnusedParameters": false
```

If you still get errors, you can temporarily disable TypeScript checking:
1. Change build command to: `vite build` (removes `tsc &&`)
2. Or set `"skipLibCheck": true` in tsconfig.json

### Error 4: Environment variables not set

**Cause:** Missing required env vars

**Solution:**
In Vercel Dashboard → Project Settings → Environment Variables, add:

| Variable | Value | Required? |
|----------|-------|-----------|
| `VITE_CONTRACT_ADDRESS` | `0x0000000000000000000000000000000000000000` | Yes (placeholder) |
| `VITE_CHAIN_ID` | `84532` | Yes |
| `VITE_WALLETCONNECT_PROJECT_ID` | Get from cloud.walletconnect.com | Optional for now |

### Error 5: "No routes matched" or blank pages

**Cause:** React Router needs proper configuration

**Solution:**
The `vercel.json` in the root directory handles this with rewrites.

### Error 6: PostCSS or Tailwind errors

**Cause:** Config file format issues

**Solution:**
✅ Already fixed! We renamed `postcss.config.js` to `postcss.config.cjs`

---

## Step-by-Step Vercel Setup

### Method 1: Vercel Dashboard (Recommended)

1. **Go to Vercel**
   - Visit: https://vercel.com
   - Sign in with GitHub

2. **Import Project**
   - Click "Add New..." → "Project"
   - Select `geoagent-DAO` repository
   - Click "Import"

3. **Configure Build Settings**
   ```
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   Node.js Version: 20.x
   ```

4. **Add Environment Variables**
   - Click "Environment Variables"
   - Add the variables from Error 4 above
   - Click "Deploy"

5. **Wait for Build**
   - Build takes 2-3 minutes
   - Check build logs if it fails

### Method 2: Vercel CLI

```bash
# From project root
cd c:\Users\Shreenath Mehta\OneDrive\Desktop\lnmhacks

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Y
# - Link to existing project? N
# - Project name? geoagent-dao
# - Directory? ./frontend
# - Override settings? N
```

---

## Debugging Build Failures

### View Build Logs
1. Go to Vercel Dashboard
2. Click on your project
3. Click on the failed deployment
4. Click "View Build Logs"
5. Look for the error message (usually in red)

### Common Error Messages

**"Cannot find module '@rainbow-me/rainbowkit'"**
- Solution: Ensure `frontend/package.json` exists
- Check that dependencies are in `dependencies`, not `devDependencies`

**"Command 'npm run build' exited with 1"**
- Solution: Test build locally first:
  ```bash
  cd frontend
  npm run build
  ```
- Fix any errors shown locally, then push to GitHub

**"ENOENT: no such file or directory"**
- Solution: Check Root Directory is set to `frontend` in Vercel settings

**"Module parse failed: Unexpected token"**
- Solution: Ensure `vite.config.ts` is correct
- Check that all imports use correct paths

---

## Quick Fix Checklist

Before redeploying, verify:

- [ ] Root Directory = `frontend` in Vercel settings
- [ ] `frontend/package.json` exists and has all dependencies
- [ ] `frontend/vite.config.ts` exists
- [ ] `postcss.config.cjs` exists (not .js)
- [ ] Environment variables are set in Vercel
- [ ] Latest code is pushed to GitHub
- [ ] Local build works: `cd frontend && npm run build`

---

## Alternative: Deploy Static Demo

If Vercel build keeps failing, you can deploy the static demo as a temporary solution:

1. Create a new `public` folder in root
2. Copy `frontend/demo.html` to `public/index.html`
3. Set Vercel Output Directory to `public`
4. This gives you a working landing page while you debug the full build

---

## Get Help

**Share these with me for debugging:**
1. Screenshot of Vercel build error
2. Copy of build logs (last 50 lines)
3. Vercel project settings screenshot

**Or paste the error message here and I'll help fix it!**
