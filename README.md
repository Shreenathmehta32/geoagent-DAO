# 🤖 GeoAgent DAO - Autonomous Neighborhood Energy Platform

> AI-powered decentralized autonomous organization for community solar investment and energy trading

[![Built with Solidity](https://img.shields.io/badge/Built%20with-Solidity-363636?logo=solidity)](https://soliditylang.org/)
[![Deployed on Base](https://img.shields.io/badge/Deployed%20on-Base%20Sepolia-0052FF)](https://base.org)
[![Framework: React](https://img.shields.io/badge/Framework-React%2018-61DAFB?logo=react)](https://react.dev)

## 🌟 Hackathon Project

**Event:** LNM Hacks 2026  
**Theme:** Agentic-RWA DAO (AI Agents + Real-World Assets + Blockchain)  
**Built:** January 2026 | 72-Hour Sprint  
**Team:** Solo Developer

---

## 🎯 The Problem

Community solar projects fail because:
- ❌ Manual governance is slow and inefficient
- ❌ Members don't trust human treasurers
- ❌ Missed opportunities in energy markets
- ❌ Complex decision-making paralyzes DAOs

## 💡 The Solution: GeoAgent

An **autonomous AI agent** manages community energy investments within constitutional rules:
- ✅ **Buys energy** when prices drop below threshold
- ✅ **Sells solar surplus** when prices spike
- ✅ **Distributes profits** automatically to members
- ✅ **Zero human intervention** for operations
- ✅ **100% transparent** on-chain governance

---

## 🚀 Live Demo

### 🌐 Deployed Dashboard
**URL:** [Coming Soon - Deploying to Vercel]

### 📄 Smart Contract
**Network:** Base Sepolia Testnet  
**Contract Address:** `[Deploying...]`  
**Tests:** 28/28 Passing ✅

---

## 🛠️ Tech Stack

### Blockchain Layer
- **Network:** Base Sepolia (Ethereum L2)
- **Smart Contracts:** Solidity 0.8.19
- **Framework:** Hardhat
- **Libraries:** OpenZeppelin (Ownable, ReentrancyGuard)
- **Testing:** Hardhat/Chai (28/28 tests passing ✅)

### Frontend Layer
- **Framework:** React 18 + TypeScript + Vite
- **Web3 Library:** ethers.js v6
- **Wallet Connection:** RainbowKit + Wagmi
- **State Management:** TanStack Query (React Query)
- **Styling:** Tailwind CSS
- **Deployment:** Vercel

### AI Agent Layer (In Progress)
- **Framework:** LangChain + TypeScript
- **Runtime:** Node.js 20+
- **Blockchain Integration:** ethers.js v6
- **Scheduling:** node-cron (60-second monitoring)

---

## ✨ Key Features

### 1. Autonomous Trading
- AI agent monitors energy markets every 60 seconds
- Executes buy orders when price < $30 threshold
- Executes sell orders when price > $80 threshold
- Respects constitutional spending limits

### 2. DAO Governance
- Constitutional rules encoded in smart contract
- Member voting on parameter updates
- Transparent treasury management
- Share-based profit distribution

### 3. Real-Time Dashboard
- Live treasury balance updates
- AI agent activity feed
- Transaction history with BaseScan links
- Member portfolio tracking

---

## 📦 Project Structure

```
geoagent-DAO/
├── contracts/                 # Hardhat smart contract project
│   ├── contracts/
│   │   └── DAOConstitution.sol    # Main governance contract
│   ├── scripts/
│   │   └── deploy.js              # Deployment script
│   ├── test/
│   │   └── DAOConstitution.test.js  # 28 unit tests
│   └── hardhat.config.js
│
├── frontend/                  # React dashboard
│   ├── src/
│   │   ├── components/        # UI components
│   │   ├── hooks/             # Custom React hooks
│   │   ├── pages/             # Dashboard, Admin, Member pages
│   │   └── contracts/         # ABI and config
│   └── vite.config.ts
│
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- MetaMask wallet
- Base Sepolia testnet ETH ([Get from faucet](https://www.alchemy.com/faucets/base-sepolia))

### 1. Clone Repository
```bash
git clone https://github.com/Shreenathmehta32/geoagent-DAO.git
cd geoagent-DAO
```

### 2. Smart Contract Setup
```bash
cd contracts
npm install

# Create .env file
echo "DEPLOYER_PRIVATE_KEY=your_wallet_private_key" > .env

# Compile contracts
npx hardhat compile

# Run tests
npx hardhat test

# Deploy to Base Sepolia
npx hardhat run scripts/deploy.js --network baseSepolia
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install

# Create .env file
echo "VITE_CONTRACT_ADDRESS=deployed_contract_address" > .env
echo "VITE_CHAIN_ID=84532" >> .env

# Start dev server (or deploy to Vercel)
npm run dev
```

---

## 📊 Smart Contract Details

### DAOConstitution.sol

**Key Functions:**
- `setAIAgent(address)` - Register autonomous agent
- `buyEnergy(uint256 amount, uint256 price)` - Agent purchases energy
- `sellEnergy(uint256 amount, uint256 price)` - Agent sells surplus
- `distributeProfits()` - Distribute earnings to members
- `addMember(address, uint256 shares)` - Onboard new member

**Events:**
- `EnergyPurchased` - Emitted on buy transactions
- `EnergySold` - Emitted on sell transactions
- `ProfitsDistributed` - Emitted on profit distribution
- `MemberAdded` - Emitted when member joins

---

## 🧪 Testing

### Smart Contract Tests
```bash
cd contracts
npx hardhat test
```

**Coverage:** 28/28 tests passing ✅
- Deployment tests
- Access control tests
- Trading logic tests
- Governance tests
- Event emission tests

---

## 🌍 Deployment

### Smart Contract Deployment
1. Get Base Sepolia testnet ETH from [faucet](https://www.alchemy.com/faucets/base-sepolia)
2. Add private key to `contracts/.env`
3. Run: `npx hardhat run scripts/deploy.js --network baseSepolia`
4. Verify on BaseScan

### Frontend Deployment (Vercel)
1. Push code to GitHub
2. Connect repository to [Vercel](https://vercel.com)
3. Set root directory to `frontend`
4. Add environment variables:
   - `VITE_CONTRACT_ADDRESS`
   - `VITE_CHAIN_ID=84532`
5. Deploy automatically

---

## 🔮 Future Roadmap

### Phase 1: MVP (Hackathon - IN PROGRESS)
- ✅ Smart contract deployment
- ✅ Dashboard UI
- 🔄 AI agent implementation
- 🔄 Live deployment

### Phase 2: Production
- 📋 Real Chainlink oracle integration
- 📋 The Graph subgraph indexing
- 📋 ZK location proofs (Noir)
- 📋 Multi-signature treasury

### Phase 3: Scale
- 📋 Mainnet deployment on Base
- 📋 IoT sensor integration
- 📋 Cross-DAO collaboration
- 📋 Mobile app

---

## 👤 Author

**Shreenath Mehta**
- GitHub: [@Shreenathmehta32](https://github.com/Shreenathmehta32)
- Project: [GeoAgent DAO](https://github.com/Shreenathmehta32/geoagent-DAO)

---

## 🙏 Acknowledgments

- **Base** - Ethereum L2 infrastructure
- **OpenZeppelin** - Secure smart contract libraries
- **LangChain** - AI agent framework
- **Vercel** - Frontend hosting
- **LNM Hacks** - For the amazing opportunity

---

<div align="center">

**⭐ Star this repo if you find it interesting!**

**Built with ❤️ for the future of decentralized energy**

</div>
