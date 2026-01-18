# 🚀 Smart Contract Deployment Guide - Base Sepolia

## Quick Start (5 Steps - 10 Minutes)

### Step 1: Get Testnet ETH (2 minutes)

1. **Add Base Sepolia to MetaMask:**
   - Open MetaMask
   - Click network dropdown → "Add Network"
   - Enter these details:
     - Network Name: `Base Sepolia`
     - RPC URL: `https://sepolia.base.org`
     - Chain ID: `84532`
     - Currency Symbol: `ETH`
     - Block Explorer: `https://sepolia.basescan.org`
   - Click "Save"

2. **Get Free Testnet ETH:**
   - Visit: https://www.alchemy.com/faucets/base-sepolia
   - Connect your MetaMask wallet
   - Click "Send Me ETH"
   - Wait 30-60 seconds
   - You should receive 0.1-0.5 ETH

### Step 2: Create .env File (1 minute)

**CRITICAL: Get Your Private Key from MetaMask**

1. Open MetaMask
2. Click the 3 dots menu → "Account details"
3. Click "Show private key"
4. Enter your MetaMask password
5. **Copy the private key** (64 characters, no 0x prefix)

**Create the .env file:**

```bash
cd c:\Users\Shreenath Mehta\OneDrive\Desktop\lnmhacks
```

Create a file named `.env` (in the root directory, NOT in contracts/) with this content:

```
DEPLOYER_PRIVATE_KEY=your_private_key_here_without_0x
AGENT_PRIVATE_KEY=your_private_key_here_without_0x
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
BASESCAN_API_KEY=PLACEHOLDER
```

**Replace `your_private_key_here_without_0x` with your actual private key!**

⚠️ **SECURITY WARNING:**
- NEVER share this private key
- NEVER commit .env to GitHub (it's already in .gitignore)
- This key controls your funds!

### Step 3: Compile Contract (30 seconds)

```bash
cd c:\Users\Shreenath Mehta\OneDrive\Desktop\lnmhacks
npx hardhat compile
```

Expected output:
```
Compiling 1 file with 0.8.19
Compilation finished successfully
```

### Step 4: Run Tests (1 minute)

```bash
npx hardhat test
```

Expected output:
```
  28 passing
```

### Step 5: Deploy! (2 minutes)

```bash
npx hardhat run scripts/deploy.js --network baseSepolia
```

**Expected Output:**
```
Deploying DAOConstitution...
DAOConstitution deployed to: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
Constructor parameters:
  Max Spend Per Transaction: 0.1 ETH
  Buy Threshold Price: 30
  Sell Threshold Price: 80
  Owner: 0x...
  AI Agent: 0x...
Deployment info saved to deployments/deployments.json
```

**🎉 COPY THE CONTRACT ADDRESS!** You'll need it for Vercel.

---

## After Deployment

### Update Vercel Environment Variable

1. Go to https://vercel.com/dashboard
2. Select your `geoagent-dao` project
3. Click "Settings" → "Environment Variables"
4. Find `VITE_CONTRACT_ADDRESS`
5. Click "Edit"
6. Paste your deployed contract address: `0x...`
7. Click "Save"
8. Vercel will auto-redeploy (2-3 minutes)

### Verify Your Contract on BaseScan

Visit: `https://sepolia.basescan.org/address/YOUR_CONTRACT_ADDRESS`

You should see:
- ✅ Contract creation transaction
- ✅ Contract balance (0 ETH initially)
- ✅ Contract code (after verification)

---

## Troubleshooting

### Error: "insufficient funds for gas"
**Solution:** Get more testnet ETH from faucet
- Visit: https://www.alchemy.com/faucets/base-sepolia
- Or: https://coinbase.com/faucets/base-sepolia-faucet

### Error: "invalid address" or "invalid private key"
**Solution:** Check your .env file
- Private key should be 64 characters (no 0x prefix)
- No spaces or quotes around the key
- File should be in root directory: `lnmhacks/.env`

### Error: "could not detect network"
**Solution:** Check internet connection and RPC URL
- Verify hardhat.config.js has correct RPC
- Try alternative RPC: `https://base-sepolia-rpc.publicnode.com`

### Deployment succeeds but no address shown
**Solution:** Check deploy.js script
- Should have: `console.log("Deployed to:", await dao.getAddress())`
- Should call: `await dao.waitForDeployment()`

---

## Testing Your Deployed Contract

### Method 1: BaseScan (No Code)

1. Go to: `https://sepolia.basescan.org/address/YOUR_CONTRACT_ADDRESS`
2. Click "Contract" tab → "Write Contract"
3. Click "Connect to Web3" (connects MetaMask)
4. Try these functions:
   - `setAIAgent(address)` - Set your wallet as AI agent
   - `addMember(address, shares)` - Add yourself with 100 shares
   - `fundTreasury()` - Send 0.1 ETH (enter value field)
5. Click "Read Contract" to verify:
   - `aiAgent()` - Should show your address
   - `getMemberShares(your_address)` - Should show 100
   - `treasuryBalance()` - Should show 100000000000000000 (0.1 ETH)

### Method 2: Your Dashboard (After Vercel Update)

1. Visit your Vercel URL
2. Click "Connect Wallet"
3. Go to "Dashboard" - should show real contract data
4. Go to "Admin Panel" - interact with contract
5. Fund treasury, add members, update parameters

---

## Deployment Checklist

**Before Deploying:**
- [ ] MetaMask installed with Base Sepolia network
- [ ] Wallet has 0.05+ ETH from faucet
- [ ] `.env` file created with DEPLOYER_PRIVATE_KEY
- [ ] `.env` is in .gitignore (security check)
- [ ] Tests passing: `npx hardhat test`

**After Deploying:**
- [ ] Contract address copied (starts with 0x)
- [ ] Contract visible on BaseScan
- [ ] Vercel env var updated with contract address
- [ ] Vercel redeployed successfully
- [ ] Dashboard loads contract data

---

## Quick Commands Reference

```bash
# Navigate to project
cd c:\Users\Shreenath Mehta\OneDrive\Desktop\lnmhacks

# Compile
npx hardhat compile

# Test
npx hardhat test

# Deploy
npx hardhat run scripts/deploy.js --network baseSepolia

# Verify contract (optional)
npx hardhat verify --network baseSepolia CONTRACT_ADDRESS "100000000000000000" "30" "80"
```

---

## What Happens During Deployment

1. **Hardhat connects** to Base Sepolia RPC
2. **Compiles** your Solidity contract
3. **Sends transaction** to deploy contract
4. **Waits** for transaction confirmation (~5 seconds)
5. **Returns** deployed contract address
6. **Saves** deployment info to `deployments/deployments.json`
7. **Logs** constructor parameters and gas used

**Gas Cost:** ~0.002-0.005 ETH (very cheap on Base!)

---

## Ready to Deploy?

Run these commands:

```bash
cd c:\Users\Shreenath Mehta\OneDrive\Desktop\lnmhacks
npx hardhat run scripts/deploy.js --network baseSepolia
```

**Then share the contract address with me and I'll help you update Vercel!** 🚀
