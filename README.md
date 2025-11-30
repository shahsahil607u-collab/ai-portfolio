# AI Personal Portfolio in a 3D World

An MVP web application where visitors explore Sahil's portfolio through an interactive 3D room. Click on 3D objects to open panels showcasing projects, skills, education, achievements, and more. Ask the AI assistant questions about Sahil's experience and work.

---

## Features

- **3D Portfolio Room**: Built with React Three Fiber. Click interactive objects (laptop, bookshelf, trophy shelf, wall frame) to open detail panels.
- **Dynamic Content Panels**: Projects, skills, education timeline, achievements, and about section displayed in slide-in 2D panels.
- **AI Portfolio Assistant**: Chat interface that answers questions about Sahil's portfolio using data from the database and an LLM API.
- **Admin CRUD**: Secure admin endpoints to create, update, and delete portfolio content.
- **Responsive Design**: Works on desktop and mobile (simplified 3D on smaller screens).

---

## Tech Stack

- **Frontend**: Next.js, React, React Three Fiber, drei, Tailwind CSS
- **Backend**: Next.js API routes
- **Database**: MongoDB (with Mongoose ODM)
- **Auth**: JWT-based authentication for admin routes
- **AI**: Placeholder for LLM integration (OpenAI or similar)

---

## Project Structure

```
ai-portfolio-3d/
├── components/
│   ├── 3d/
│   │   ├── Laptop.js
│   │   ├── Bookshelf.js
│   │   ├── TrophyShelf.js
│   │   └── WallFrame.js
│   ├── panels/
│   │   ├── ProjectsPanel.js
│   │   ├── SkillsPanel.js
│   │   ├── TimelinePanel.js
│   │   ├── AchievementsPanel.js
│   │   └── AboutPanel.js
│   ├── ThreeScene.js
│   └── ChatAssistant.js
├── lib/
│   ├── db.js
│   └── ai.js
├── models/
│   ├── Project.js
│   ├── Skill.js
│   ├── TimelineItem.js
│   ├── Achievement.js
│   └── User.js
├── pages/
│   ├── api/
│   │   ├── projects/index.js
│   │   ├── skills/index.js
│   │   ├── timeline/index.js
│   │   ├── achievements/index.js
│   │   ├── admin/
│   │   │   ├── login.js
│   │   │   ├── projects.js
│   │   │   └── projects/[id].js
│   │   └── ai-assistant.js
│   ├── _app.js
│   ├── index.js (landing page)
│   └── portfolio.js (3D portfolio page)
├── styles/
│   └── globals.css
├── .gitignore
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

---

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
cd "ai portfolio"
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority
JWT_SECRET=your_random_secret_key_here
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx
```

- **MONGODB_URI**: Your MongoDB Atlas connection string (or local MongoDB URI).
- **JWT_SECRET**: A secure random string for signing JWTs.
- **OPENAI_API_KEY** (optional): Your OpenAI API key if you want real AI responses. Otherwise, the assistant will use fallback logic.

### 3. Seed the Database (Optional)

You can manually add a user and content via MongoDB shell or create a seed script. Example user creation:

```javascript
// In MongoDB shell or Compass
use yourDatabaseName;
db.users.insertOne({
  email: "admin@sahil.com",
  passwordHash: "$2a$10$...", // Use bcrypt to hash a password
  role: "admin"
});
```

Or create a simple seed script in `scripts/seed.js` and run it.

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
npm run build
npm start
```

---

## API Endpoints

### Public Endpoints

- `GET /api/projects` - Fetch all projects
- `GET /api/skills` - Fetch all skills
- `GET /api/timeline` - Fetch education & experience timeline
- `GET /api/achievements` - Fetch achievements
- `POST /api/ai-assistant` - Ask AI assistant a question (body: `{ question: string }`)

### Admin Endpoints (Require JWT Authentication)

- `POST /api/admin/login` - Login with email/password, returns JWT token
- `POST /api/admin/projects` - Create a new project
- `PUT /api/admin/projects/:id` - Update a project
- `DELETE /api/admin/projects/:id` - Delete a project

(Similar CRUD endpoints can be added for skills, timeline, and achievements following the same pattern.)

---

## 3D UX Polish Recommendations

1. **Camera Animations**: Use `@react-three/drei`'s `CameraControls` or custom animations to smoothly transition the camera when a user clicks an object.
2. **Hover Highlights**: Already implemented with color changes. Consider adding emissive glow or scale animations.
3. **Object Labels**: Display text labels when hovering over objects using HTML overlays or `<Text>` from drei.
4. **Smooth Transitions**: Use CSS transitions for panels (already set up in `globals.css`). Add fade-in animations for 3D objects on load.
5. **Loading States**: Show a loading spinner while 3D assets load using `<Suspense>` from React.
6. **GLTF Models**: Replace placeholder boxes with real 3D models (`.glb` files) using `useGLTF` from drei for a professional look.
7. **Lightmaps & Shadows**: Enable `castShadow` and `receiveShadow` on meshes and lights for realistic lighting.
8. **Mobile Optimization**: Use `isMobile` detection to simplify the 3D scene or fall back to a 2D layout on small screens.

---

## Next Steps for Extension

- **Admin Dashboard UI**: Build a React admin panel at `/admin` for easier content management.
- **Real AI Integration**: Replace the placeholder in `lib/ai.js` with actual OpenAI API calls (GPT-4, etc.).
- **3D Model Assets**: Add custom GLTF models for laptop, bookshelf, trophies, etc.
- **Authentication UI**: Add login/logout UI for admin users.
- **Analytics**: Integrate Google Analytics or Plausible to track visitor interactions.
- **SEO & Metadata**: Add Next.js `<Head>` tags for SEO optimization.

---

## Troubleshooting

- **3D scene not loading**: Ensure React Three Fiber is dynamically imported with `{ ssr: false }` in `pages/portfolio.js`.
- **Database connection fails**: Check your `MONGODB_URI` in `.env.local` and ensure your IP is whitelisted in MongoDB Atlas.
- **AI assistant returns generic answers**: Add more portfolio data to the database or plug in a real LLM API key.

---

## License

MIT License — feel free to use and modify for your own portfolio!

---

**Built by Sahil with ❤️ and AI**
