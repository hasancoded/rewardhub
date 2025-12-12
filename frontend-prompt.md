# Vue 3 + Vite Frontend Development Prompt for RewardHub

You are tasked with creating a **minimal, clean, and professional MVP frontend** for RewardHub using **Vue 3 + Vite**. This frontend must implement **every single backend route, API endpoint, and functionality** from the existing backend.

---

## 🎯 Project Overview

**RewardHub** is a blockchain-based student reward system that allows:

- **Admins** to manage users, achievements, and perks
- **Faculty** to award achievements to students
- **Students** to view their achievements, connect wallets, and redeem perks

The system integrates with:

- **MongoDB** for data persistence
- **Ethereum blockchain** (via Ganache/Hardhat) for token rewards
- **MetaMask** for wallet connection and signature verification

---

## 📋 Backend API Reference

### Base URL

```
http://localhost:5000/api
```

### Authentication & Authorization

#### 1. **POST /api/auth/register**

- **Description**: Register a new user
- **Body**: `{ name, email, password, role? }`
- **Response**: `{ msg, token, user }`

#### 2. **POST /api/auth/login**

- **Description**: Login user
- **Body**: `{ email, password }`
- **Response**: `{ token, user }`

#### 3. **GET /api/auth/profile**

- **Description**: Get current user profile
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ user }`

---

### Wallet Management

#### 4. **POST /api/users/wallet/nonce**

- **Description**: Generate nonce for wallet signature
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ walletAddress }`
- **Response**: `{ nonce }`

#### 5. **POST /api/users/wallet/verify**

- **Description**: Verify wallet signature and connect wallet
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ walletAddress, signature }`
- **Response**: `{ msg, user }`

#### 6. **POST /api/users/wallet/disconnect**

- **Description**: Disconnect wallet from account
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ msg, user }`

#### 7. **GET /api/users/wallet/status**

- **Description**: Get wallet connection status
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ walletConnected, walletAddress }`

---

### Admin Routes (Require Admin Role)

#### 8. **POST /api/admin/users**

- **Description**: Register a new user (admin-only)
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ name, email, password, role }`
- **Response**: `{ msg, user }`

#### 9. **GET /api/admin/users**

- **Description**: List all users with optional filters
- **Headers**: `Authorization: Bearer <token>`
- **Query Params**: `role`, `walletConnected`, `search`
- **Response**: `{ users }`

#### 10. **PUT /api/admin/users/:id**

- **Description**: Update user details
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ name?, email?, role?, walletAddress? }`
- **Response**: `{ msg, user }`

#### 11. **DELETE /api/admin/users/:id**

- **Description**: Delete user
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ msg }`

#### 12. **GET /api/admin/dashboard-stats**

- **Description**: Get comprehensive dashboard statistics
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ totalUsers, totalStudents, totalFaculty, totalAdmins, walletsConnected, totalAchievements, totalPerks, totalAchievementsAwarded, totalRedemptions, onChainAchievements, onChainPerks, recentActivity }`

---

### Achievement Management (Admin)

#### 13. **POST /api/admin/achievements**

- **Description**: Create a new achievement
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ title, description, tokenReward, syncToBlockchain? }`
- **Response**: `{ msg, achievement }`

#### 14. **GET /api/admin/achievements**

- **Description**: List all achievements
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ achievements }`

#### 15. **GET /api/admin/achievements/:id**

- **Description**: Get single achievement
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ achievement }`

#### 16. **PUT /api/admin/achievements/:id**

- **Description**: Update achievement
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ title?, description?, tokenReward?, syncToBlockchain? }`
- **Response**: `{ msg, achievement }`

#### 17. **DELETE /api/admin/achievements/:id**

- **Description**: Delete achievement
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ msg }`

---

### Perk Management (Admin)

#### 18. **POST /api/admin/perks**

- **Description**: Create a new perk (reward)
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ title, description, tokenCost, syncToBlockchain? }`
- **Response**: `{ msg, perk }`

#### 19. **GET /api/admin/perks**

- **Description**: List all perks
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ perks }`

#### 20. **GET /api/admin/perks/:id**

- **Description**: Get single perk
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ perk }`

#### 21. **PUT /api/admin/perks/:id**

- **Description**: Update perk
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ title?, description?, tokenCost?, syncToBlockchain? }`
- **Response**: `{ msg, perk }`

#### 22. **DELETE /api/admin/perks/:id**

- **Description**: Delete perk
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ msg }`

---

### Student Management (Faculty & Admin)

#### 23. **GET /api/admin/students**

- **Description**: List all students (for faculty to award achievements)
- **Headers**: `Authorization: Bearer <token>`
- **Access**: Faculty, Admin
- **Response**: `{ students }`

---

### Student Achievements (Faculty & Admin)

#### 24. **POST /api/student-achievements**

- **Description**: Award achievement to student
- **Headers**: `Authorization: Bearer <token>`
- **Access**: Faculty, Admin
- **Body**: `{ studentId, achievementId }`
- **Response**: `{ msg, studentAchievement }`

#### 25. **GET /api/student-achievements**

- **Description**: Get all student achievements with optional filters
- **Query Params**: `studentId`, `achievementId`, `status`
- **Response**: `{ achievements }`

#### 26. **GET /api/student-achievements/:id**

- **Description**: Get single student achievement by ID
- **Response**: `{ achievement }`

#### 27. **GET /api/student-achievements/student/:studentId**

- **Description**: Get all achievements for a specific student
- **Response**: `{ achievements }`

#### 28. **DELETE /api/student-achievements/:id**

- **Description**: Delete student achievement (admin only)
- **Headers**: `Authorization: Bearer <token>`
- **Access**: Admin
- **Response**: `{ msg }`

---

### Achievements (Public)

#### 29. **POST /api/achievements**

- **Description**: Create achievement (legacy endpoint)
- **Body**: `{ title, description, tokenReward }`
- **Response**: `{ achievement }`

#### 30. **GET /api/achievements**

- **Description**: Get all achievements
- **Response**: `{ achievements }`

---

### Rewards/Perks (Public)

#### 31. **POST /api/rewards**

- **Description**: Create reward (legacy endpoint)
- **Body**: `{ title, description, tokenCost }`
- **Response**: `{ reward }`

#### 32. **GET /api/rewards**

- **Description**: Get all rewards/perks
- **Response**: `{ rewards }`

---

### Redemptions

#### 33. **POST /api/redemptions**

- **Description**: Redeem a perk (requires wallet connection)
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ rewardId }`
- **Response**: `{ msg, redemption }`

#### 34. **GET /api/redemptions/student/:studentId**

- **Description**: Get redemptions for a specific student
- **Response**: `{ redemptions }`

#### 35. **GET /api/redemptions**

- **Description**: Get all redemptions (admin view)
- **Response**: `{ redemptions }`

---

### Blockchain

#### 36. **GET /api/blockchain/balance/:wallet**

- **Description**: Get token balance for a wallet address
- **Response**: `{ wallet, balance, formattedBalance }`

---

### Students (Blockchain Registration)

#### 37. **POST /api/students/register**

- **Description**: Register student on blockchain
- **Body**: `{ walletAddress, name }`
- **Response**: `{ msg, txHash }`

---

## 🗂️ Data Models

### User

```typescript
{
  _id: string;
  name: string;
  email: string;
  password: string(hashed);
  role: "student" | "faculty" | "admin";
  walletAddress: string | null;
  walletConnected: boolean;
  walletNonce: string | null;
  createdAt: Date;
  updatedAt: Date;
}
```

### Achievement

```typescript
{
  _id: string;
  title: string;
  description: string;
  tokenReward: number;
  createdBy: string(User._id);
  onChainCreated: boolean;
  onChainTx: string | null;
  createdAt: Date;
  updatedAt: Date;
}
```

### Reward (Perk)

```typescript
{
  _id: string;
  title: string;
  description: string;
  tokenCost: number;
  createdBy: string(User._id);
  onChainCreated: boolean;
  onChainTx: string | null;
  createdAt: Date;
  updatedAt: Date;
}
```

### StudentAchievement

```typescript
{
  _id: string;
  studentId: string(User._id);
  achievementId: string(Achievement._id);
  dateAwarded: Date;
  txHash: string;
  status: "pending_onchain" | "confirmed" | "failed";
  awardedBy: string(User._id);
}
```

### Redemption

```typescript
{
  _id: string;
  studentId: string(User._id);
  rewardId: string(Reward._id);
  date: Date;
  status: "pending" | "approved" | "rejected";
  txHash: string;
}
```

---

## 🎨 Frontend Requirements

### Tech Stack

- **Vue 3** (Composition API with `<script setup>`)
- **Vite** (build tool)
- **Vue Router** (for routing)
- **Pinia** (state management)
- **Axios** (HTTP client)
- **Ethers.js** (blockchain interaction)
- **CSS** (minimal, clean styling - NO Tailwind unless specified)

---

### Project Structure

```
frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/          # Reusable components (Button, Card, Modal, etc.)
│   │   ├── admin/           # Admin-specific components
│   │   ├── faculty/         # Faculty-specific components
│   │   └── student/         # Student-specific components
│   ├── views/
│   │   ├── auth/
│   │   │   ├── LoginView.vue
│   │   │   └── RegisterView.vue
│   │   ├── admin/
│   │   │   ├── DashboardView.vue
│   │   │   ├── ManageUsersView.vue
│   │   │   ├── ManageAchievementsView.vue
│   │   │   └── ManagePerksView.vue
│   │   ├── faculty/
│   │   │   ├── DashboardView.vue
│   │   │   └── AwardAchievementsView.vue
│   │   └── student/
│   │       ├── DashboardView.vue
│   │       ├── MyAchievementsView.vue
│   │       ├── PerksView.vue
│   │       └── WalletView.vue
│   ├── stores/
│   │   ├── auth.js          # Authentication state
│   │   ├── wallet.js        # Wallet connection state
│   │   ├── achievements.js  # Achievements data
│   │   ├── perks.js         # Perks data
│   │   └── users.js         # User management (admin)
│   ├── services/
│   │   ├── api.js           # Axios instance with interceptors
│   │   ├── auth.service.js
│   │   ├── wallet.service.js
│   │   ├── admin.service.js
│   │   ├── achievement.service.js
│   │   ├── perk.service.js
│   │   ├── redemption.service.js
│   │   └── blockchain.service.js
│   ├── router/
│   │   └── index.js         # Vue Router configuration
│   ├── utils/
│   │   ├── constants.js     # API URLs, contract addresses
│   │   └── helpers.js       # Utility functions
│   ├── App.vue
│   └── main.js
├── .env
├── package.json
├── vite.config.js
└── index.html
```

---

### Core Features to Implement

#### 1. **Authentication System**

- Login/Register forms
- JWT token storage (localStorage)
- Axios interceptors for automatic token injection
- Auto-redirect based on role after login
- Protected routes with navigation guards

#### 2. **Role-Based Routing**

- **Admin**: Dashboard, Manage Users, Manage Achievements, Manage Perks
- **Faculty**: Dashboard, Award Achievements
- **Student**: Dashboard, My Achievements, Perks, Wallet

#### 3. **Wallet Integration (MetaMask)**

- Connect wallet button
- Nonce generation and signature flow
- Display wallet address and connection status
- Disconnect wallet functionality
- Token balance display

#### 4. **Admin Dashboard**

- Display statistics from `/api/admin/dashboard-stats`
- User management (CRUD operations)
- Achievement management (CRUD with blockchain sync option)
- Perk management (CRUD with blockchain sync option)

#### 5. **Faculty Dashboard**

- View list of students
- Award achievements to students
- View awarded achievements

#### 6. **Student Dashboard**

- View personal achievements
- View token balance
- Connect/disconnect wallet
- Browse and redeem perks
- View redemption history

#### 7. **Blockchain Integration**

- Display token balances from blockchain
- Show transaction hashes for achievements/redemptions
- Indicate on-chain status (pending, confirmed, failed)

---

### Design Guidelines

#### UI/UX Principles

- **Clean & Minimal**: No clutter, focus on functionality
- **Professional**: Use a simple color palette (e.g., blue/gray theme)
- **Responsive**: Mobile-friendly layout
- **Accessible**: Proper labels, ARIA attributes
- **Consistent**: Reusable components for buttons, cards, forms, tables

#### Styling Approach

- Use **vanilla CSS** or **scoped CSS in Vue components**
- Create a `styles/` folder for global styles if needed
- Use CSS variables for theming (colors, spacing, fonts)
- Keep it simple - NO complex animations or heavy frameworks

#### Component Examples

- **Button**: Primary, secondary, danger variants
- **Card**: Container for content blocks
- **Table**: For listing users, achievements, perks
- **Modal**: For forms and confirmations
- **Toast/Alert**: For success/error messages

---

### Environment Variables (.env)

```
VITE_API_BASE_URL=http://localhost:5000/api
VITE_BLOCKCHAIN_NETWORK=localhost
VITE_CONTRACT_ADDRESS=<deployed_contract_address>
```

---

### Key Implementation Notes

#### Axios Setup (services/api.js)

```javascript
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
```

#### Router Guards (router/index.js)

```javascript
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  if (to.meta.requiresAuth && !token) {
    next("/login");
  } else if (to.meta.role && to.meta.role !== userRole) {
    next("/unauthorized");
  } else {
    next();
  }
});
```

#### Wallet Connection Flow

1. User clicks "Connect Wallet"
2. Frontend requests MetaMask to connect
3. Frontend calls `POST /api/users/wallet/nonce` with wallet address
4. Backend returns nonce
5. Frontend requests MetaMask to sign nonce
6. Frontend calls `POST /api/users/wallet/verify` with signature
7. Backend verifies signature and updates user record
8. Frontend updates UI to show connected wallet

---

## ✅ Acceptance Criteria

Your frontend implementation MUST:

1. ✅ Implement **ALL 37 API endpoints** listed above
2. ✅ Support **all three user roles** (admin, faculty, student)
3. ✅ Include **wallet connection** with MetaMask signature verification
4. ✅ Display **blockchain data** (token balances, transaction hashes)
5. ✅ Use **Vue 3 Composition API** with `<script setup>`
6. ✅ Use **Pinia** for state management
7. ✅ Use **Vue Router** with role-based guards
8. ✅ Have a **clean, professional, minimal design**
9. ✅ Be **fully functional** as an MVP
10. ✅ Include **error handling** and user feedback (toasts/alerts)
11. ✅ Store **JWT tokens** securely and handle token expiration
12. ✅ Be **responsive** (mobile-friendly)

---

## 🚀 Deliverables

Provide:

1. Complete `frontend/` directory structure
2. All Vue components, views, stores, and services
3. Router configuration with guards
4. `.env.example` file
5. `package.json` with all dependencies
6. `README.md` with setup instructions

---

## 📝 Additional Notes

- **Minimize code files**: Reuse components wherever possible
- **Focus on functionality**: Don't over-engineer
- **Keep it simple**: This is an MVP, not a production app
- **Test all endpoints**: Ensure every API call works correctly
- **Handle edge cases**: Empty states, loading states, error states
- **Use TypeScript**: Optional but recommended for type safety

---

## 🎯 Final Goal

Create a **fully functional, minimal, clean, and professional Vue 3 frontend** that implements **every single backend route and API endpoint** from the RewardHub backend. The frontend should be production-ready as an MVP and demonstrate all core functionalities: authentication, role-based access, wallet connection, achievement management, perk redemption, and blockchain integration.

**Good luck! 🚀**
