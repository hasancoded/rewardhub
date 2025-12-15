# RewardHub Fresh Start Guide

This guide explains how to completely reset your RewardHub project to a clean state with no data in the database or blockchain.

## Prerequisites

- Ganache running (GUI or CLI)
- MongoDB running
- Backend and frontend servers stopped

---

## Step-by-Step Reset Process

### 1. Stop All Running Services

Stop these services if running:

- Backend server (`npm start`)
- Frontend dev server (`npm run dev`)

Press `Ctrl+C` in each terminal.

---

### 2. Clear MongoDB Database

**Option A: Using mongosh (Recommended)**

```bash
cd backend
mongosh --eval "use rewardhub; db.dropDatabase();"
```

**Option B: Using MongoDB Compass**

1. Open MongoDB Compass
2. Connect to `mongodb://localhost:27017`
3. Find `rewardhub` database
4. Click "Drop Database"

**Verification:**

```bash
mongosh --eval "use rewardhub; db.getCollectionNames();"
```

Should return empty array: `[]`

---

### 3. Reset Ganache Blockchain

**Option A: Restart Ganache GUI (Easiest)**

1. Close Ganache application completely
2. Reopen Ganache
3. Click "Quickstart" or load your workspace
4. Fresh blockchain created with new accounts

**Option B: Ganache CLI Reset**

If using Ganache CLI, stop it (`Ctrl+C`) and restart:

```bash
ganache --port 7545 --networkId 5777
```

**Important:** After resetting Ganache, your accounts and private keys will change!

---

### 4. Update Environment Variables

After resetting Ganache, you need to update your `.env` file with new values:

1. **Copy new private key from Ganache:**

   - Open Ganache
   - Click on the first account (index 0)
   - Copy the private key (click the key icon)

2. **Update `backend/.env`:**

   ```env
   PRIVATE_KEY=<paste_new_private_key_here>
   ```

3. **Note the new account address:**
   - This will be your contract owner address
   - You'll use this for testing

---

### 5. Redeploy Smart Contract

Deploy the RewardHub contract to the fresh blockchain:

```bash
cd backend
npx hardhat compile
npx hardhat run scripts/deploy.js --network ganache
```

**Expected output:**

```
✅ Contract deployed at: 0x...
👤 Contract owner (initialOwner): 0x...
```

**Update `backend/.env`:**

```env
CONTRACT_ADDRESS=<paste_new_contract_address_here>
```

---

### 6. Restart Services

**Terminal 1 - Backend:**

```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

---

### 7. Create Fresh Admin Account

Since the database is empty, you need to create a new admin user:

**Option A: Using registration endpoint**

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@rewardhub.com",
    "password": "admin123",
    "role": "admin"
  }'
```

**Option B: Using MongoDB directly**

```bash
mongosh
use rewardhub
db.users.insertOne({
  name: "Admin User",
  email: "admin@rewardhub.com",
  password: "$2a$10$...", // You'll need to hash this
  role: "admin",
  walletConnected: false,
  createdAt: new Date()
})
```

---

### 8. Reconnect Wallets (For All Users)

Since the blockchain was reset, all users need to reconnect their wallets:

1. Log in to RewardHub
2. Click "Connect Wallet"
3. Approve MetaMask connection
4. Wallet address saved to profile

**Important:** Make sure MetaMask is connected to the correct network:

- Network Name: Ganache Local
- RPC URL: `http://127.0.0.1:7545`
- Chain ID: `1337` or `5777` (check Ganache)

---

## Verification Checklist

After completing the reset, verify everything is clean:

- [ ] MongoDB database is empty or has only new admin user

  ```bash
  mongosh --eval "use rewardhub; db.users.countDocuments()"
  ```

  Should return `0` or `1` (if admin created)

- [ ] Ganache shows fresh blockchain (block number near 0)
- [ ] Contract deployed successfully with new address

- [ ] Backend starts without errors

- [ ] Frontend loads without errors

- [ ] Can register new users

- [ ] Can connect wallets

- [ ] No old achievements or perks exist

---

## Quick Reset Script (Advanced)

Create a script `backend/scripts/fresh-start.sh`:

```bash
#!/bin/bash

echo "🧹 Starting fresh reset..."

# Stop services (if running in background)
# pkill -f "npm start"
# pkill -f "npm run dev"

# Clear database
echo "📦 Clearing MongoDB..."
mongosh --eval "use rewardhub; db.dropDatabase();"

# Note: You must manually restart Ganache GUI

echo "⚠️  MANUAL STEP REQUIRED:"
echo "1. Close and restart Ganache"
echo "2. Copy new private key from first account"
echo "3. Update PRIVATE_KEY in .env"
echo ""
echo "After Ganache restart, run:"
echo "  npx hardhat run scripts/deploy.js --network ganache"
echo "  Then update CONTRACT_ADDRESS in .env"
```

Make executable:

```bash
chmod +x scripts/fresh-start.sh
```

Run:

```bash
./scripts/fresh-start.sh
```

---

## Common Issues

### Issue: "Contract not found" error

**Cause:** Old contract address in `.env`

**Solution:** Redeploy contract and update `CONTRACT_ADDRESS`

### Issue: "Wallet connection failed"

**Cause:** MetaMask connected to wrong network or old blockchain

**Solution:**

1. Open MetaMask
2. Switch to Ganache network
3. If network doesn't exist, add it manually
4. Reconnect wallet in RewardHub

### Issue: "Nonce too high" error

**Cause:** MetaMask has cached nonce from old blockchain

**Solution:**

1. Open MetaMask
2. Settings → Advanced → Clear activity tab data
3. Reconnect wallet

### Issue: Database not empty after drop

**Cause:** Wrong database name or connection

**Solution:**

```bash
mongosh
show dbs
use rewardhub
db.dropDatabase()
```

---

## Summary

To completely fresh start RewardHub:

1. ✅ Drop MongoDB database
2. ✅ Restart Ganache (new blockchain)
3. ✅ Update `PRIVATE_KEY` in `.env`
4. ✅ Redeploy smart contract
5. ✅ Update `CONTRACT_ADDRESS` in `.env`
6. ✅ Restart backend and frontend
7. ✅ Create new admin user
8. ✅ Reconnect all wallets

Your RewardHub is now in a completely fresh state! 🎉
