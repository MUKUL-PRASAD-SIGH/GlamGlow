
# GlamBot Installation Guide

## Prerequisites

Before installing GlamBot, ensure you have the following installed on your system:

- **Node.js** (version 18.0.0 or higher)
- **npm** (version 8.0.0 or higher) or **yarn** (version 1.22.0 or higher)
- **Git**

### Check your versions:
```bash
node --version
npm --version
git --version
```

## Installation Steps

### 1. Clone the Repository
```bash
git clone <YOUR_GIT_URL>
cd glambot
```

### 2. Install Dependencies
Using npm:
```bash
npm install
```

Or using yarn:
```bash
yarn install
```

### 3. Environment Setup (Optional)
If you plan to use external APIs or Supabase, create a `.env.local` file:
```bash
cp .env.example .env.local
```

Then edit `.env.local` with your API keys:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_OPENAI_API_KEY=your_openai_api_key
```

### 4. Start Development Server
```bash
npm run dev
```

Or with yarn:
```bash
yarn dev
```

The application will be available at `http://localhost:8080`

## Build for Production

To create a production build:
```bash
npm run build
```

Or with yarn:
```bash
yarn build
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Troubleshooting

### Common Issues:

1. **Port already in use**: The app runs on port 8080 by default. If it's busy, the dev server will automatically find another port.

2. **Node version issues**: Make sure you're using Node.js 18 or higher.

3. **Package installation errors**: 
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Build errors**: Check the console for specific error messages and ensure all dependencies are properly installed.

## Next Steps

1. **Connect to Supabase**: Click the green Supabase button in the Lovable interface to add backend functionality
2. **Customize**: Modify the UI, add new features, or integrate with makeup APIs
3. **Deploy**: Use the Publish button in Lovable or deploy to your preferred hosting service

## Support

- [Lovable Documentation](https://docs.lovable.dev/)
- [Lovable Discord Community](https://discord.com/channels/1119885301872070706/1280461670979993613)
- [GitHub Issues](your-repo-url/issues)
