# RewardHub Backend

A blockchain-integrated reward management system built with Node.js, Express, MongoDB, and Ethereum smart contracts.

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Blockchain:** Ethereum (ethers.js), Hardhat
- **Authentication:** JWT, bcrypt
- **Smart Contracts:** Solidity, OpenZeppelin

## Project Structure

```
backend/
├── blockchain/        # Blockchain integration services
├── config/           # Database and configuration
├── contracts/        # Solidity smart contracts
├── controllers/      # Express route controllers
├── middleware/       # Auth and role-based middleware
├── models/           # Mongoose schemas
├── routes/           # API route definitions
├── scripts/          # Deployment and utility scripts
├── abi/              # Contract ABIs
└── server.js         # Express server entry point
```

## Setup

### Prerequisites
- Node.js (v16+)
- MongoDB
- Ganache (for local blockchain)

### Installation

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create `.env` file in `backend/` directory with:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RPC_URL=http://127.0.0.1:8545
PRIVATE_KEY=your_private_key
CONTRACT_ADDRESS=deployed_contract_address
```

4. Start local blockchain (Ganache):
```bash
ganache --deterministic --accounts 10 --wallet.defaultBalance 1000
```

5. Deploy smart contract:
```bash
cd backend
npx hardhat run scripts/deploy.js --network localhost
```

6. Start backend server:
```bash
npm start
```

Server will run on `http://localhost:5000`

## API Documentation

See `backend/docs/` for comprehensive API documentation.

## Development

```bash
# Run with auto-reload
npm run dev

# Run tests
npm test
```

## License

ISC
