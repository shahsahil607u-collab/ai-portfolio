# Quick Start Checklist

Follow these steps to get your 3D portfolio up and running in minutes!

## ☑️ Pre-Flight Checklist

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Copy the example file and fill in your values:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your actual credentials:
- **MONGODB_URI**: Get from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **JWT_SECRET**: Generate with `openssl rand -base64 32`
- **OPENAI_API_KEY**: (Optional) Get from [OpenAI Platform](https://platform.openai.com)

### 3. Seed the Database (Optional)
Populate with sample data:
```bash
npm run seed
```

This creates:
- Sample projects, skills, timeline entries, and achievements
- Admin user: `admin@sahil.com` / `admin123`

### 4. Start Development Server
```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🎨 Customization Steps

### Update About Section
Edit `components/panels/AboutPanel.js`:
- Replace placeholder text with your bio
- Update contact links (email, GitHub, LinkedIn)

### Add Real Content
Two options:

**Option A: Use Admin API**
1. Login via POST to `/api/admin/login`
2. Use the JWT token to POST/PUT/DELETE content

**Option B: Direct Database**
Use MongoDB Compass or shell to add documents to collections:
- `projects`
- `skills`
- `timelineitems`
- `achievements`

### Enhance 3D Objects
Replace placeholder boxes with real 3D models:

1. Download free GLTF models from [Sketchfab](https://sketchfab.com) or [Poly Pizza](https://poly.pizza)
2. Place `.glb` files in `public/models/`
3. Update `components/3d/Laptop.js` (example):

```javascript
import { useGLTF } from '@react-three/drei'

export default function Laptop({ position, onClick, onPointerOver, onPointerOut, hovered }) {
  const { scene } = useGLTF('/models/laptop.glb')
  
  return (
    <primitive 
      object={scene.clone()} 
      position={position} 
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      scale={hovered ? 0.55 : 0.5}
    />
  )
}

useGLTF.preload('/models/laptop.glb')
```

### Customize Colors
Edit `tailwind.config.js` to add your brand colors:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#yourColor',
          secondary: '#yourColor',
        }
      }
    }
  }
}
```

---

## 🚀 Deployment Checklist

### Vercel Deployment (Recommended)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/ai-portfolio-3d.git
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repo
   - Add environment variables in Vercel dashboard
   - Deploy!

3. **Set Environment Variables** in Vercel:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `OPENAI_API_KEY` (optional)

4. **Verify Deployment**:
   - Visit your deployed URL
   - Test 3D scene loads
   - Test API endpoints
   - Test AI assistant

---

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"
- ✅ Check `MONGODB_URI` in `.env.local`
- ✅ Whitelist your IP in MongoDB Atlas Network Access
- ✅ Ensure database user has read/write permissions

### "3D scene is blank"
- ✅ Check browser console for errors
- ✅ Ensure `ThreeScene` is dynamically imported with `{ ssr: false }`
- ✅ Verify React Three Fiber and drei are installed

### "AI assistant not responding"
- ✅ Check `OPENAI_API_KEY` is set (or fallback logic is working)
- ✅ Verify database has content (projects, skills, etc.)
- ✅ Check `/api/ai-assistant` endpoint in browser Network tab

### "Panels not opening"
- ✅ Check browser console for JavaScript errors
- ✅ Verify click handlers are attached in `ThreeScene.js`
- ✅ Test with placeholder objects first

---

## 📊 Testing Your Portfolio

### Manual Test Checklist

- [ ] Landing page loads and button works
- [ ] 3D scene renders with all 4 objects
- [ ] Hover effects work (color change)
- [ ] Click laptop → Projects panel opens
- [ ] Click bookshelf → Timeline panel opens
- [ ] Click trophy → Achievements panel opens
- [ ] Click wall frame → About panel opens
- [ ] Close button works on panels
- [ ] AI assistant opens and accepts input
- [ ] AI assistant returns an answer
- [ ] Mobile view is responsive

### Performance Test

Open Chrome DevTools → Lighthouse and check:
- Performance: > 80
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 85

---

## 📚 Next Steps

1. **Add More Projects**: Populate your database with real projects
2. **Improve 3D Assets**: Replace boxes with detailed GLTF models
3. **Enhance AI**: Fine-tune the AI prompts or add more context
4. **Build Admin UI**: Create a dashboard for easier content management
5. **Analytics**: Add Google Analytics or Plausible
6. **SEO**: Add meta tags and Open Graph images

---

## 🆘 Need Help?

- **Documentation**: See `README.md`, `MVP_SPECIFICATION.md`, `DESIGN_GUIDELINES.md`
- **React Three Fiber**: [docs.pmnd.rs/react-three-fiber](https://docs.pmnd.rs/react-three-fiber)
- **Next.js**: [nextjs.org/docs](https://nextjs.org/docs)
- **MongoDB**: [docs.mongodb.com](https://docs.mongodb.com)

---

**Good luck building your amazing 3D portfolio, Sahil! 🎉**
