# RewardHub Frontend

Complete Vue 3 + Vite frontend for the RewardHub blockchain-based student reward system.

## 🎯 Overview

RewardHub is a comprehensive student reward platform that integrates with Ethereum blockchain for token-based rewards. This frontend implements all backend API endpoints and provides role-based interfaces for admins, faculty, and students.

## 📋 Features

### Authentication

- User login and registration
- JWT token-based authentication
- Role-based access control (Admin, Faculty, Student)
- Automatic token refresh and session management

### Admin Dashboard

- System statistics overview
- User management (CRUD operations)
- Achievement management with blockchain sync
- Perk management with blockchain sync
- Real-time activity monitoring

### Faculty Dashboard

- Award achievements to students
- View student list
- Track awarded achievements

### Student Dashboard

- View personal achievements
- Browse and redeem perks
- Connect MetaMask wallet
- View token balance
- Track redemption history

### Blockchain Integration

- MetaMask wallet connection
- Signature-based wallet verification
- Token balance display
- Transaction tracking
- On-chain status monitoring

## 🛠️ Tech Stack

- **Vue 3** - Progressive JavaScript framework (Composition API)
- **Vite** - Next-generation frontend build tool
- **Vue Router** - Official router for Vue.js
- **Pinia** - State management library
- **Axios** - HTTP client for API requests
- **Ethers.js** - Ethereum blockchain interaction
- **CSS** - Vanilla CSS with design system

## 📁 Project Structure

```
frontend/
├── public/
├── src/
│   ├── assets/
│   │   └── styles/
│   │       └── main.css          # Global styles and design system
│   ├── components/
│   │   └── common/               # Reusable components
│   │       ├── AppHeader.vue
│   │       ├── AppSidebar.vue
│   │       ├── BaseModal.vue
│   │       ├── LoadingSpinner.vue
│   │       └── ToastNotification.vue
│   ├── views/
│   │   ├── auth/                 # Authentication views
│   │   │   ├── LoginView.vue
│   │   │   └── RegisterView.vue
│   │   ├── admin/                # Admin views
│   │   │   ├── DashboardView.vue
│   │   │   ├── ManageUsersView.vue
│   │   │   ├── ManageAchievementsView.vue
│   │   │   └── ManagePerksView.vue
│   │   ├── faculty/              # Faculty views
│   │   │   ├── DashboardView.vue
│   │   │   └── AwardAchievementsView.vue
│   │   └── student/              # Student views
│   │       ├── DashboardView.vue
│   │       ├── MyAchievementsView.vue
│   │       ├── PerksView.vue
│   │       └── WalletView.vue
│   ├── stores/                   # Pinia stores
│   │   ├── auth.js
│   │   ├── wallet.js
│   │   ├── users.js
│   │   ├── achievements.js
│   │   └── perks.js
│   ├── services/                 # API services
│   │   ├── api.js
│   │   ├── auth.service.js
│   │   ├── wallet.service.js
│   │   ├── admin.service.js
│   │   ├── achievement.service.js
│   │   ├── perk.service.js
│   │   ├── studentAchievement.service.js
│   │   ├── redemption.service.js
│   │   └── blockchain.service.js
│   ├── router/
│   │   └── index.js              # Vue Router configuration
│   ├── utils/
│   │   ├── constants.js          # App constants
│   │   └── helpers.js            # Utility functions
│   ├── App.vue                   # Root component
│   └── main.js                   # Application entry point
├── .env.example                  # Environment variables template
├── index.html                    # HTML entry point
├── package.json                  # Dependencies
├── vite.config.js                # Vite configuration
└── README.md                     # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MetaMask browser extension
- Backend server running on `http://localhost:5000`

### Installation

1. **Clone the repository and navigate to frontend directory:**

   ```bash
   cd frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create environment file:**

   ```bash
   cp env.example .env
   ```

4. **Configure environment variables in `.env`:**

   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   VITE_BLOCKCHAIN_NETWORK=localhost
   VITE_CONTRACT_ADDRESS=your_deployed_contract_address
   ```

5. **Start development server:**

   ```bash
   npm run dev
   ```

6. **Open browser:**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 📡 API Endpoints Coverage

This frontend implements **all 37 backend API endpoints**:

### Authentication (3 endpoints)

- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/profile

### Wallet Management (4 endpoints)

- POST /api/users/wallet/nonce
- POST /api/users/wallet/verify
- POST /api/users/wallet/disconnect
- GET /api/users/wallet/status

### Admin Routes (6 endpoints)

- POST /api/admin/users
- GET /api/admin/users
- PUT /api/admin/users/:id
- DELETE /api/admin/users/:id
- GET /api/admin/dashboard-stats
- GET /api/admin/students

### Achievement Management (7 endpoints)

- POST /api/admin/achievements
- GET /api/admin/achievements
- GET /api/admin/achievements/:id
- PUT /api/admin/achievements/:id
- DELETE /api/admin/achievements/:id
- GET /api/achievements
- POST /api/achievements

### Perk Management (7 endpoints)

- POST /api/admin/perks
- GET /api/admin/perks
- GET /api/admin/perks/:id
- PUT /api/admin/perks/:id
- DELETE /api/admin/perks/:id
- GET /api/rewards
- POST /api/rewards

### Student Achievements (5 endpoints)

- POST /api/student-achievements
- GET /api/student-achievements
- GET /api/student-achievements/:id
- GET /api/student-achievements/student/:studentId
- DELETE /api/student-achievements/:id

### Redemptions (3 endpoints)

- POST /api/redemptions
- GET /api/redemptions/student/:studentId
- GET /api/redemptions

### Blockchain (2 endpoints)

- GET /api/blockchain/balance/:wallet
- POST /api/students/register

## 🔐 User Roles & Access

### Admin

- Full system access
- User management
- Achievement and perk CRUD
- System statistics
- Routes: `/admin/*`

### Faculty

- Award achievements to students
- View student list
- Routes: `/faculty/*`

### Student

- View personal achievements
- Connect wallet
- Redeem perks
- View token balance
- Routes: `/student/*`

## 🎨 Design System

The application uses a custom CSS design system with:

- CSS variables for theming
- Consistent color palette
- Reusable utility classes
- Responsive design
- Clean, professional aesthetics

## 🔧 Development

### Code Style

- Vue 3 Composition API with `<script setup>`
- Modular component architecture
- Centralized state management with Pinia
- Service layer for API calls
- Utility functions for common operations

### State Management

- **auth store**: User authentication and session
- **wallet store**: MetaMask integration and balance
- **users store**: User management (admin)
- **achievements store**: Achievement CRUD
- **perks store**: Perk CRUD

### Routing

- Role-based navigation guards
- Auto-redirect after login
- Protected routes
- 404 and unauthorized pages

## 🔌 MetaMask Integration

The wallet integration follows this flow:

1. User clicks "Connect Wallet"
2. MetaMask prompts for account access
3. Frontend requests nonce from backend
4. User signs nonce with MetaMask
5. Frontend sends signature to backend for verification
6. Backend validates and updates user record
7. Frontend displays connected wallet and balance

## 📱 Responsive Design

The application is fully responsive and works on:

- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🐛 Error Handling

- Global error interceptor for API calls
- Toast notifications for user feedback
- Form validation
- Loading states
- Empty states
- 401 auto-logout and redirect

## 🔒 Security

- JWT token stored in localStorage
- Automatic token injection via Axios interceptors
- Role-based route protection
- Signature-based wallet verification
- CORS-enabled API calls

## 📝 License

This project is part of the RewardHub system.

## 🤝 Contributing

1. Follow Vue 3 Composition API best practices
2. Use the existing design system
3. Maintain consistent code style
4. Test all API integrations
5. Ensure responsive design

## 📞 Support

For issues or questions, please contact the development team.

---

**Built with ❤️ using Vue 3 + Vite**
