# Move-In

## Structure
- apps/web → React (Create React App)
- apps/api → Node + Express

## How to Run (Local Development)

### Prerequisites
- Node.js 18+ (Node 20 recommended)
- npm

### 1. Clone the repo
```bash
git clone <repo-url>
cd Move-In
```

### 2. Install dependencies
```bash
npm run install:all
npm run start:api
```

### 3. Start backend (API)
```bash
npm run start:api
```
- API runs on: [http://localhost:5000](http://localhost:5000)
- Health check: [http://localhost:5000](http://localhost:5000/health)

### 4. Start frontend (Web)
- Open a second terminal:
```bash
npm run start:web
```
- Web runs on: [http://localhost:3000](http://localhost:3000)
