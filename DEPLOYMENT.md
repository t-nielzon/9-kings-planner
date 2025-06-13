# 9 Kings Planner - Deployment Guide

## 🚀 Quick Deploy to Netlify

### Method 1: GitHub + Netlify (Recommended)

1. **Push to GitHub:**

```bash
git init
git add .
git commit -m "Initial commit - 9 Kings Planner"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/9-kings-planner.git
git push -u origin main
```

2. **Connect to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Choose GitHub and select your repository
   - Netlify will auto-detect the settings from `netlify.toml`
   - Click "Deploy site"

✅ **That's it!** Your site will be live with auto-deployments on every push.

### Method 2: Drag & Drop Deploy

1. **Build the project:**

```bash
npm run build
```

2. **Deploy:**
   - Go to [netlify.com/drop](https://netlify.com/drop)
   - Drag the `dist` folder to the deploy area
   - Get instant live URL

### Method 3: Netlify CLI

1. **Install Netlify CLI:**

```bash
npm install -g netlify-cli
# or if you prefer local install, it's already in package.json
```

2. **Login and deploy:**

```bash
netlify login
npm run deploy:preview  # For preview deploy
npm run deploy:netlify  # For production deploy
```

## 🌐 Alternative Deployment Options

Since this is a static site, you can deploy anywhere:

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel --prod`

### GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json: `"deploy": "gh-pages -d dist"`
3. Run: `npm run build && npm run deploy`

### Firebase Hosting

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Run: `firebase init hosting`
3. Set public directory to `dist`
4. Run: `npm run build && firebase deploy`

## 📁 Build Output

The production build creates a `dist` folder with:

- Optimized JavaScript bundles
- Minified CSS
- Compressed images
- Static HTML files

## 🔧 Configuration Files

- **`netlify.toml`** - Netlify-specific configuration
- **`vite.config.ts`** - Build configuration
- **`package.json`** - Deployment scripts

## 🚀 Performance Features

- **Automatic caching** for assets (1 year cache)
- **Gzip compression** enabled
- **Image optimization** through Netlify
- **Bundle optimization** via Vite
- **CSS/JS minification** enabled

## 🔄 Continuous Deployment

With GitHub + Netlify:

- Automatic builds on every push to main
- Deploy previews for pull requests
- Branch deploys for feature branches

## 📊 Post-Deployment

After deployment, your 9 Kings Planner will have:

- ✅ Fast loading (~1-2s initial load)
- ✅ Offline functionality (cached assets)
- ✅ Mobile responsive design
- ✅ SEO-friendly URLs
- ✅ Asset optimization

## 🐛 Troubleshooting

**Build fails?**

- Check Node.js version (needs 18+)
- Run `npm install` to update dependencies
- Ensure all TypeScript errors are resolved

**Assets not loading?**

- Verify asset paths start with `/assets/`
- Check that image files are in `public/assets/`
- Ensure build process includes asset copying

**Routing issues?**

- The `netlify.toml` includes SPA redirects
- All routes will serve `index.html` for client-side routing
