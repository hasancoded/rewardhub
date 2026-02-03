# RewardHub

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](https://nodejs.org/)
[![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Ethereum](https://img.shields.io/badge/Ethereum-Smart%20Contracts-3C3C3D?logo=ethereum&logoColor=white)](https://ethereum.org/)
[![Hardhat](https://img.shields.io/badge/Built%20with-Hardhat-yellow)](https://hardhat.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)

A blockchain-integrated student reward management system that enables educational institutions to award achievements and manage perks using ERC20 tokens on Ethereum. The system combines traditional database management with blockchain transparency, ensuring token balances are verifiable on-chain while maintaining flexible off-chain data management.

## Features

- **Blockchain Integration**: ERC20 token-based rewards with Ethereum smart contracts
- **Role-Based Access Control**: Admin, Faculty, and Student roles with specific permissions
- **Achievement Management**: Create, award, and track student achievements
- **Perk Redemption**: Students can redeem earned tokens for rewards
- **MetaMask Integration**: Secure wallet connection with signature-based verification
- **Real-Time Balance Tracking**: On-chain token balance verification
- **RESTful API**: Comprehensive backend API for all operations
- **Modern Frontend**: Vue.js 3 with Composition API and Pinia state management

## Tech Stack

### Backend

- **Runtime**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Blockchain**: Ethereum (Hardhat, ethers.js v6)
- **Smart Contracts**: Solidity with OpenZeppelin libraries
- **Authentication**: JWT with bcrypt password hashing
- **Network**: CORS-enabled for cross-origin requests

### Frontend

- **Framework**: Vue.js 3 (Composition API)
- **Build Tool**: Vite
- **Routing**: Vue Router 4
- **State Management**: Pinia
- **HTTP Client**: Axios
- **Blockchain**: ethers.js for Web3 interactions
- **Testing**: Vitest (unit), Playwright (E2E)

### Smart Contract

- **Standard**: ERC20 token implementation
- **Features**: Minting (achievements), Burning (redemptions), Access control
- **Development**: Hardhat framework
- **Testing**: Hardhat test suite

## Project Structure

```
RewardHub/
├── backend/                     # Node.js/Express backend
│   ├── blockchain/              # Blockchain integration layer
│   │   ├── contract.js          # Smart contract interaction functions
│   │   └── RewardHubTokenABI.json
│   ├── config/                  # Configuration files
│   │   └── db.js                # MongoDB connection
│   ├── contracts/               # Solidity smart contracts
│   │   └── RewardHubToken.sol
│   ├── controllers/             # Request handlers
│   ├── middleware/              # Express middleware (auth, roles)
│   ├── models/                  # Mongoose schemas
│   ├── routes/                  # API route definitions
│   ├── scripts/                 # Utility scripts
│   │   ├── deploy.js            # Contract deployment
│   │   ├── seedTestData.js      # Database seeding
│   │   └── generateAdminToken.js
│   ├── docs/                    # API documentation
│   ├── .env.example             # Environment variables template
│   ├── hardhat.config.js        # Hardhat configuration
│   ├── package.json
│   └── server.js                # Application entry point
│
├── frontend/                    # Vue.js frontend
│   ├── public/                  # Static assets
│   ├── src/
│   │   ├── assets/              # Styles and images
│   │   ├── components/          # Vue components
│   │   ├── composables/         # Composition API utilities
│   │   ├── router/              # Vue Router configuration
│   │   ├── services/            # API service layer
│   │   ├── stores/              # Pinia stores
│   │   ├── utils/               # Helper functions
│   │   ├── views/               # Page components
│   │   ├── App.vue              # Root component
│   │   └── main.js              # Application entry
│   ├── tests/                   # Test files
│   ├── .env.example             # Environment variables template
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

## Prerequisites

- **Node.js** v16 or higher
- **npm** or **yarn**
- **MongoDB** (Atlas account or local instance)
- **MetaMask** browser extension
- **Ganache** (for local blockchain development) or **Infura** account (for testnet)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/RewardHub.git
cd RewardHub
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file based on `.env.example`:

```env
# MongoDB Configuration
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/rewardhub

# JWT Secret (generate a secure random string)
JWT_SECRET=your_secure_jwt_secret_here

# Server Configuration
PORT=5000

# Blockchain Configuration
PRIVATE_KEY=your_ethereum_private_key
GANACHE_RPC_URL=http://127.0.0.1:7545
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID
CONTRACT_ADDRESS=deployed_contract_address
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file based on `.env.example`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_BLOCKCHAIN_NETWORK=ganache
VITE_CONTRACT_ADDRESS=your_deployed_contract_address
```

### 4. Smart Contract Deployment

#### Option A: Local Development (Ganache)

1. Install and start Ganache:

   ```bash
   npm install -g ganache
   ganache
   ```

2. Deploy the contract:

   ```bash
   cd backend
   npx hardhat compile
   npx hardhat run scripts/deploy.js --network ganache
   ```

3. Copy the deployed contract address to both `.env` files

#### Option B: Sepolia Testnet

1. Get Sepolia test ETH from a [faucet](https://sepoliafaucet.com/)

2. Update `.env` with your Infura RPC URL and private key

3. Deploy:
   ```bash
   npx hardhat run scripts/deploy.js --network sepolia
   ```

### 5. Seed Database (Optional)

```bash
cd backend
node scripts/seedTestData.js
```

## Running the Application

### Start Backend Server

```bash
cd backend
npm start
# or for development with auto-reload
npm run dev
```

Server will run on `http://localhost:5000`

### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

Frontend will run on `http://localhost:3000`

## API Documentation

Comprehensive API documentation is available in `backend/docs/API_DOCUMENTATION.md`.

### Key Endpoints

#### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

#### Wallet Management

- `POST /api/users/wallet/nonce` - Generate nonce for wallet verification
- `POST /api/users/wallet/verify` - Verify wallet signature
- `GET /api/users/wallet/status` - Get wallet connection status

#### Admin Routes

- `POST /api/admin/users` - Create user
- `GET /api/admin/users` - List all users
- `POST /api/admin/achievements` - Create achievement
- `POST /api/admin/perks` - Create perk
- `GET /api/admin/dashboard-stats` - Get system statistics

#### Faculty Routes

- `POST /api/student-achievements` - Award achievement to student
- `GET /api/admin/students` - View student list

#### Student Routes

- `GET /api/student-achievements/student/:studentId` - View personal achievements
- `POST /api/redemptions` - Redeem a perk
- `GET /api/redemptions/student/:studentId` - View redemption history

#### Blockchain

- `GET /api/blockchain/balance/:wallet` - Get token balance

## User Roles

### Admin

- Full system access
- User management (CRUD)
- Achievement and perk management
- System statistics and monitoring

### Faculty

- Award achievements to students
- View student lists
- Track awarded achievements

### Student

- View personal achievements
- Connect MetaMask wallet
- Redeem perks with tokens
- View token balance and transaction history

## Development

### Run Tests

```bash
# Backend tests
cd backend
npm test

# Frontend unit tests
cd frontend
npm run test:unit

# Frontend E2E tests
npm run test:e2e
```

### Build for Production

```bash
# Frontend production build
cd frontend
npm run build

# Output will be in frontend/dist/
```

### Smart Contract Development

```bash
# Compile contracts
npx hardhat compile

# Run Hardhat tests
npx hardhat test

# Deploy to network
npx hardhat run scripts/deploy.js --network <network-name>
```

## Environment Variables

### Backend

| Variable           | Description                     | Required      |
| ------------------ | ------------------------------- | ------------- |
| `MONGO_URI`        | MongoDB connection string       | Yes           |
| `JWT_SECRET`       | Secret key for JWT signing      | Yes           |
| `PORT`             | Server port (default: 5000)     | No            |
| `PRIVATE_KEY`      | Ethereum wallet private key     | Yes           |
| `GANACHE_RPC_URL`  | Local Ganache RPC URL           | For local dev |
| `SEPOLIA_RPC_URL`  | Sepolia testnet RPC URL         | For testnet   |
| `CONTRACT_ADDRESS` | Deployed smart contract address | Yes           |

### Frontend

| Variable                  | Description                    | Required |
| ------------------------- | ------------------------------ | -------- |
| `VITE_API_BASE_URL`       | Backend API base URL           | Yes      |
| `VITE_BLOCKCHAIN_NETWORK` | Network name (ganache/sepolia) | Yes      |
| `VITE_CONTRACT_ADDRESS`   | Smart contract address         | Yes      |

## Security Considerations

- Never commit `.env` files to version control
- Use strong, randomly generated JWT secrets
- Never expose private keys
- Use test networks for development
- Implement rate limiting in production
- Enable HTTPS in production
- Validate all user inputs
- Use prepared statements for database queries

## Deployment

### Backend Deployment (Example: Heroku)

1. Create a Heroku app
2. Set environment variables in Heroku dashboard
3. Deploy:
   ```bash
   git push heroku main
   ```

### Frontend Deployment (Example: Vercel)

1. Build the frontend:
   ```bash
   npm run build
   ```
2. Deploy the `dist/` directory to Vercel or Netlify

### Smart Contract Deployment

For production, deploy to Ethereum mainnet or a production-ready L2 solution. Ensure thorough testing and security audits before mainnet deployment.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenZeppelin for secure smart contract libraries
- Hardhat for Ethereum development environment
- Vue.js team for the excellent frontend framework
- MongoDB for flexible data storage

## Support

For issues, questions, or contributions, please open an issue on GitHub or contact the development team.

---

**Built with modern web technologies and blockchain innovation**
