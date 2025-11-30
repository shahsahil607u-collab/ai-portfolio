# MVP Specification: AI Personal Portfolio in a 3D World

**Project Name**: AI Personal Portfolio in a 3D World  
**Developer**: Sahil  
**Status**: MVP Starter (Ready for Development)  
**Last Updated**: November 30, 2025

---

## Executive Summary

An interactive web application that presents a student developer's portfolio through a 3D room interface. Visitors explore clickable 3D objects that represent different sections of the portfolio (projects, skills, education, achievements). An AI assistant powered by LLM technology answers natural language questions about the developer's experience and work.

---

## Core Features (MVP)

### 1. Public Landing Page
- Clean hero section with project introduction
- "Enter 3D Portfolio" CTA button
- Responsive design

### 2. 3D Portfolio Room
- **Built with**: React Three Fiber + drei
- **Interactive Objects**:
  - 🖥️ **Laptop** → Opens Projects panel
  - 📚 **Bookshelf** → Opens Education & Timeline panel
  - 🏆 **Trophy Shelf** → Opens Achievements panel
  - 🖼️ **Wall Frame** → Opens About section
- **Camera Controls**: Orbit controls with zoom
- **Visual Feedback**: Hover highlights, clickable indicators

### 3. Content Panels (2D UI)
Slide-in panels with smooth transitions displaying:
- **Projects**: Title, description, tech stack, GitHub/live links
- **Skills**: Grouped by category (Frontend, Backend, DevOps, AI/ML, 3D/WebGL)
- **Education & Timeline**: Chronological education, work, certifications
- **Achievements**: Awards, certifications, recognitions
- **About**: Personal bio and contact information

### 4. AI Portfolio Assistant
- **Chatbox UI**: Minimizable chat interface
- **Question Answering**: Uses portfolio data + LLM to answer visitor questions
- **Example Queries**:
  - "What are Sahil's strongest skills?"
  - "Tell me about his best projects"
  - "Does he have experience with Three.js?"
- **Backend**: Context builder + LLM API integration (OpenAI compatible)

### 5. Admin Panel (Secured)
- **Authentication**: JWT-based email/password login
- **CRUD Operations**:
  - Create/Edit/Delete Projects
  - Manage Skills, Timeline items, Achievements
  - (Extensible to other entities)

### 6. Responsive Design
- **Desktop**: Full 3D experience with orbit controls
- **Mobile**: Simplified 3D or fallback to 2D grid interface
- **Tablet**: Optimized touch controls

---

## Technical Architecture

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend Framework | Next.js 13+ (React 18) |
| 3D Engine | React Three Fiber + drei |
| Styling | Tailwind CSS |
| Backend | Next.js API Routes |
| Database | MongoDB (Mongoose ODM) |
| Authentication | JWT (jsonwebtoken) |
| AI/LLM | OpenAI API (or compatible) |
| Deployment | Vercel (recommended) |

### Project Structure

```
ai-portfolio-3d/
├── components/
│   ├── 3d/                      # 3D object components
│   │   ├── Laptop.js
│   │   ├── Bookshelf.js
│   │   ├── TrophyShelf.js
│   │   └── WallFrame.js
│   ├── panels/                  # 2D UI panels
│   │   ├── ProjectsPanel.js
│   │   ├── SkillsPanel.js
│   │   ├── TimelinePanel.js
│   │   ├── AchievementsPanel.js
│   │   └── AboutPanel.js
│   ├── ThreeScene.js           # Main 3D scene orchestrator
│   └── ChatAssistant.js        # AI chatbox component
├── lib/
│   ├── db.js                   # MongoDB connection helper
│   └── ai.js                   # LLM integration logic
├── models/                     # Mongoose schemas
│   ├── Project.js
│   ├── Skill.js
│   ├── TimelineItem.js
│   ├── Achievement.js
│   └── User.js
├── pages/
│   ├── api/                    # API routes
│   │   ├── projects/index.js
│   │   ├── skills/index.js
│   │   ├── timeline/index.js
│   │   ├── achievements/index.js
│   │   ├── admin/
│   │   │   ├── login.js
│   │   │   ├── projects.js
│   │   │   └── projects/[id].js
│   │   └── ai-assistant.js
│   ├── _app.js                 # Next.js app wrapper
│   ├── index.js               # Landing page
│   └── portfolio.js           # Main 3D portfolio page
├── scripts/
│   └── seed.js                # Database seeding script
├── styles/
│   └── globals.css            # Global styles + Tailwind
├── .env.local.example         # Environment template
├── .gitignore
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── README.md
└── DESIGN_GUIDELINES.md
```

---

## Data Models

### Project
```javascript
{
  title: String (required),
  description: String,
  tech: [String],
  github: String,
  live: String,
  featured: Boolean,
  createdAt: Date
}
```

### Skill
```javascript
{
  name: String (required),
  category: String,
  level: String
}
```

### TimelineItem
```javascript
{
  title: String (required),
  institution: String,
  startDate: Date,
  endDate: Date,
  description: String,
  type: String // education | work | certification
}
```

### Achievement
```javascript
{
  title: String (required),
  date: Date,
  issuer: String,
  description: String
}
```

### User (Admin)
```javascript
{
  email: String (required, unique),
  passwordHash: String (required),
  role: String
}
```

---

## API Endpoints

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | Fetch all projects |
| GET | `/api/skills` | Fetch all skills |
| GET | `/api/timeline` | Fetch education & experience |
| GET | `/api/achievements` | Fetch achievements |
| POST | `/api/ai-assistant` | Ask AI assistant a question |

### Admin Endpoints (JWT Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/login` | Login (returns JWT token) |
| POST | `/api/admin/projects` | Create a new project |
| PUT | `/api/admin/projects/:id` | Update a project |
| DELETE | `/api/admin/projects/:id` | Delete a project |

*(Similar CRUD patterns can be added for skills, timeline, achievements)*

---

## Setup Instructions

### Prerequisites
- Node.js 16+ and npm
- MongoDB Atlas account (or local MongoDB)
- (Optional) OpenAI API key

### Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment**:
   Copy `.env.local.example` to `.env.local` and fill in:
   ```
   MONGODB_URI=mongodb+srv://...
   JWT_SECRET=your_secret_key
   OPENAI_API_KEY=sk-... (optional)
   ```

3. **Seed database** (optional):
   ```bash
   npm run seed
   ```
   Creates sample data + admin user: `admin@sahil.com / admin123`

4. **Run development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

5. **Build for production**:
   ```bash
   npm run build
   npm start
   ```

---

## UX & Design Principles

### Visual Hierarchy
1. 3D scene is the primary focus
2. Panels provide detailed information
3. AI assistant is accessible but not intrusive

### Interaction Flow
1. Visitor lands on hero page
2. Clicks "Enter 3D Portfolio"
3. Explores 3D room with mouse/touch
4. Clicks objects → panels slide in
5. Uses AI assistant for questions
6. Closes panels to continue exploring

### Accessibility
- Keyboard navigation support
- ARIA labels on interactive elements
- Screen reader compatible
- Responsive touch controls

---

## Future Enhancements (Post-MVP)

### Phase 2
- [ ] Admin dashboard UI (React admin panel)
- [ ] Real-time analytics (visitor tracking)
- [ ] Project filtering and search
- [ ] Dark/light theme toggle
- [ ] Advanced 3D models (GLTF assets)

### Phase 3
- [ ] Multi-room portfolio (navigate between spaces)
- [ ] Interactive code demos (embedded sandboxes)
- [ ] Blog integration
- [ ] Contact form with email notifications

### Phase 4 (Advanced)
- [ ] VR mode (WebXR)
- [ ] Real-time collaboration (virtual sticky notes)
- [ ] Particle effects and advanced shaders
- [ ] Voice input for AI assistant
- [ ] Gamification (hidden achievements)

---

## Success Metrics

### MVP Success Criteria
- ✅ 3D scene loads in < 3 seconds on desktop
- ✅ All CRUD operations functional
- ✅ AI assistant responds within 5 seconds
- ✅ Mobile responsive (works on iPhone/Android)
- ✅ No blocking bugs or crashes

### Post-Launch KPIs
- Time spent on 3D portfolio page
- Number of objects clicked per session
- AI assistant usage rate
- Mobile vs. desktop traffic split
- Visitor engagement (bounce rate < 40%)

---

## Risk Mitigation

| Risk | Mitigation |
|------|-----------|
| 3D performance on low-end devices | Fallback to 2D, progressive enhancement |
| LLM API costs | Rate limiting, caching, fallback logic |
| Complex 3D asset loading | Lazy loading, compression (Draco) |
| Browser compatibility | Use drei abstractions, test on Chrome/Safari/Firefox |

---

## Deployment Recommendations

### Vercel (Recommended)
1. Connect GitHub repo to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy: `git push` triggers auto-deploy

### Alternative: DigitalOcean/AWS
- Use Docker container with Next.js
- Serve via Nginx reverse proxy
- MongoDB Atlas for database

---

## Conclusion

This MVP provides a solid foundation for an innovative 3D portfolio experience. The modular architecture allows for easy extension with additional features, while the current implementation delivers core value: an engaging, interactive way to showcase Sahil's work and skills.

**Next Steps**:
1. Run `npm install` and `npm run seed`
2. Customize content in the database
3. Replace placeholder 3D objects with real GLTF models
4. Deploy to Vercel
5. Share with the world! 🚀

---

**Questions or issues?** Refer to `README.md` and `DESIGN_GUIDELINES.md` for detailed documentation.
