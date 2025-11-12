# Netflix Login Page

A React-based Netflix login page with Express backend authentication.

## Project Structure

```
Netflix-login-page/
├── Frontend/
│   └── frontend/        # React + Vite frontend
├── Backend/             # Express.js backend
├── vercel.json          # Vercel deployment config
└── package.json         # Root package.json
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Frontend Setup
```bash
cd Frontend/frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd Backend
npm install
npm run dev
```

The backend will run on `http://localhost:5000`

## Environment Variables

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:5000
```

### Backend (.env)
```
PORT=5000
NODE_ENV=development
```

## Default Credentials
- **Email:** raseethali46@gmail.com
- **Password:** 123456

## Deployment on Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "New Project" and import your GitHub repository
4. Vercel will automatically detect the configuration
5. Set your environment variables in Vercel dashboard
6. Click "Deploy"

## Features
- React 19 with Vite
- Tailwind CSS for styling
- Express backend with CORS
- React Router for navigation
- Axios for API calls

## License
ISC
