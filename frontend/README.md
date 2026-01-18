# GeoAgent DAO - Frontend Dashboard

React + TypeScript dashboard for the GeoAgent autonomous energy DAO built on Base Sepolia testnet.

## 🚀 Features

- **Wallet Connection**: RainbowKit integration for MetaMask, WalletConnect, and more
- **Real-time Data**: Auto-refreshing treasury stats and AI agent status
- **Admin Panel**: Protected interface for DAO management (owner-only)
- **Member Portal**: View shares, earnings, and membership status
- **Live Activity**: Real-time transaction feed with AI decision monitoring
- **Responsive Design**: Mobile-first Tailwind CSS with dark theme

## 📋 Prerequisites

- Node.js 18+ and npm
- MetaMask or compatible Web3 wallet
- Base Sepolia testnet ETH
- Deployed DAOConstitution contract address

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your contract address
# VITE_CONTRACT_ADDRESS=0x...
# VITE_WALLETCONNECT_PROJECT_ID=your_project_id
```

## 🔧 Configuration

### 1. Get WalletConnect Project ID

Visit [WalletConnect Cloud](https://cloud.walletconnect.com/) and create a free project to get your Project ID.

### 2. Update Contract Address

After deploying the smart contract, update `.env`:

```env
VITE_CONTRACT_ADDRESS=0xYourDeployedContractAddress
VITE_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
```

### 3. Verify Chain Configuration

The app is configured for Base Sepolia (Chain ID: 84532). Update `src/contracts/config.ts` if deploying to a different network.

## 🏃 Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will open at `http://localhost:3000`

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Navbar.tsx
│   │   ├── StatCard.tsx
│   │   ├── TransactionRow.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── AdminGuard.tsx
│   ├── pages/           # Main page components
│   │   ├── Landing.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Admin.tsx
│   │   ├── Member.tsx
│   │   └── Activity.tsx
│   ├── hooks/           # Custom React hooks
│   │   ├── useTreasuryData.ts
│   │   ├── useGovernanceParams.ts
│   │   ├── useMemberData.ts
│   │   ├── useContractEvents.ts
│   │   ├── useAdminActions.ts
│   │   └── useIsOwner.ts
│   ├── contracts/       # Contract ABI and config
│   │   ├── abi.ts
│   │   └── config.ts
│   ├── types/           # TypeScript interfaces
│   ├── lib/             # Utility functions
│   ├── App.tsx          # Main app with routing
│   └── main.tsx         # Entry point
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## 🎨 Key Components

### Pages

- **Landing**: Hero section with DAO mission and features
- **Dashboard**: Treasury stats, AI agent status, recent transactions
- **Admin**: Protected panel for owner-only functions (set agent, add members, update thresholds)
- **Member**: View shares, earnings calculator, membership status
- **Activity**: Real-time transaction feed and AI monitoring

### Custom Hooks

- `useTreasuryData()`: Fetch DAO stats with 5-second auto-refresh
- `useGovernanceParams()`: Get thresholds and AI agent address
- `useMemberData(address)`: Check membership and shares for an address
- `useContractEvents()`: Listen to contract events in real-time
- `useAdminActions()`: Write functions for admin operations
- `useIsOwner()`: Check if connected wallet is contract owner

## 🔐 Admin Functions

The Admin panel is protected and only accessible to the contract owner. Available functions:

- **Set AI Agent**: Register the autonomous agent wallet
- **Add Member**: Add new DAO members with share allocation
- **Update Thresholds**: Modify buy/sell price thresholds
- **Fund Treasury**: Deposit ETH into DAO treasury

## 📊 Data Refresh Intervals

- Treasury stats: 5 seconds
- Governance parameters: 30 seconds
- Member data: 10 seconds
- Contract events: 10 seconds

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `VITE_CONTRACT_ADDRESS`
   - `VITE_WALLETCONNECT_PROJECT_ID`
4. Deploy!

### Manual Build

```bash
npm run build
# Upload dist/ folder to your hosting provider
```

## 🎯 Usage Flow

1. **Connect Wallet**: Click "Connect Wallet" in navbar
2. **Switch to Base Sepolia**: Wallet will prompt if on wrong network
3. **View Dashboard**: See real-time treasury and AI agent status
4. **Check Membership**: Go to Member portal to view your shares
5. **Admin Actions** (owner only): Manage DAO via Admin panel
6. **Monitor Activity**: Watch AI agent transactions in real-time

## 🐛 Troubleshooting

**Wallet won't connect:**
- Ensure you're on Base Sepolia testnet
- Check WalletConnect Project ID is valid

**Contract data not loading:**
- Verify `VITE_CONTRACT_ADDRESS` is correct
- Ensure contract is deployed on Base Sepolia
- Check browser console for errors

**Admin panel shows "Access Denied":**
- Only contract owner can access admin functions
- Verify you're connected with the deployer wallet

## 🔗 Resources

- [Base Sepolia Faucet](https://www.coinbase.com/faucets/base-ethereum-goerli-faucet)
- [Base Sepolia Explorer](https://sepolia.basescan.org/)
- [RainbowKit Docs](https://www.rainbowkit.com/)
- [Wagmi Docs](https://wagmi.sh/)
- [Vite Docs](https://vitejs.dev/)

## 📄 License

MIT License

---

Built with ⚡ for the hackathon
