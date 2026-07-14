# Anderson Enterprises Website

A modern, responsive website for Anderson Enterprises featuring industrial automation, neural interface systems, and investor relations. Built with vanilla HTML, CSS, JavaScript, and a Node.js/Express backend with SQLite database.

## 🚀 Features

### Frontend
- **Responsive Design**: Mobile-first approach with hamburger menu navigation
- **Modern UI/UX**: Gradient backgrounds, smooth animations, glass-morphism effects
- **Particle Animation**: Optimized canvas-based particle system for visual appeal
- **Multiple Pages**: Home, Labs, Forge, Aerospace, About, Blog, Funding, Contact, and more
- **Live Dashboard**: Real-time infrastructure metrics display
- **Investor Relations**: Comprehensive investor dashboard with financial metrics

### Backend
- **RESTful API**: Express.js server with CORS support
- **SQLite Database**: Lightweight database for blog posts, projects, and lab experiments
- **Dynamic Content**: API endpoints for managing content dynamically
- **Sample Data**: Automatic population with initial content
- **Graceful Shutdown**: Proper database connection handling

## 📋 Pages Overview

### Main Pages
- **Home**: Hero section, system status, featured projects
- **Labs**: Development log with experiments, code snippets, and learning resources
- **Forge**: Industrial automation and manufacturing division
- **Aerospace**: Aerospace systems and technology
- **About**: Company mission, values, and learning journey
- **Blog**: Learning journal with technical articles
- **Funding**: Investor relations with dashboard, financial reports, governance
- **Contact**: Contact form and company information

### Special Pages
- **Dashboard**: Live industrial monitoring dashboard
- **Project NEURAL-7**: Neural interface project details
- **Capability Statement**: Company capabilities overview
- **Merch**: Company merchandise store

## 🛠️ Tech Stack

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Custom CSS with CSS variables, gradients, animations
- **JavaScript (Vanilla)**: Particle animation, mobile menu, dynamic interactions
- **Canvas API**: Particle animation system

### Backend
- **Node.js**: JavaScript runtime环境
- **Express.js**: Web framework
- **SQLite3**: Embedded database
- **CORS**: Cross-origin resource sharing

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd anderson-enterprises
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

The server will start on port 3000 (or the port specified in the PORT environment variable).

4. **Access the website**
Open your browser and navigate to `http://localhost:3000`

## 🎨 Customization

### Colors
Edit the CSS variables in `styles.css` to customize the color scheme:

```css
:root {
    --primary: #ff6600;
    --primary-dark: #cc5200;
    --primary-light: #ff8533;
    --secondary: #0f172a;
    /* ... more variables */
}
```

### Particle Animation
Adjust particle settings in `script.js`:

```javascript
const particleCount = 60;
const connectionDistance = 100;
const mouseDistance = 150;
```

### Content
- **Static Content**: Edit HTML files directly
- **Dynamic Content**: Use API endpoints or edit database directly
- **Images**: Replace Unsplash URLs with your own images

## 📡 API Endpoints

### Blog Posts
- `GET /api/blog` - Get all blog posts
- `GET /api/blog/:id` - Get single blog post
- `POST /api/blog` - Create new blog post

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create new project

### Lab Experiments
- `GET /api/experiments` - Get all experiments
- `GET /api/experiments/:id` - Get single experiment
- `POST /api/experiments` - Create new experiment

## 🗄️ Database Schema

### blog_posts
```sql
CREATE TABLE blog_posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

### projects
```sql
CREATE TABLE projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    status TEXT NOT NULL,
    description TEXT NOT NULL,
    technology TEXT,
    milestone TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

### lab_experiments
```sql
CREATE TABLE lab_experiments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    status TEXT NOT NULL,
    challenge TEXT,
    solution TEXT,
    code_snippet TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

## 🌐 Deployment

### Static Deployment (Frontend Only)
1. Build the static files (no build step required)
2. Deploy to any static hosting service:
   - Netlify
   - Vercel
   - GitHub Pages
   - AWS S3

### Full Deployment (Frontend + Backend)
1. Deploy to a Node.js hosting service:
   - Heroku
   - Railway
   - Render
   - AWS Elastic Beanstalk

2. Set environment variables:
   - `PORT`: Server port (default: 3000)

### Production Considerations
- Enable HTTPS
- Set up proper CORS policies
- Implement rate limiting
- Add authentication for admin endpoints
- Use environment variables for sensitive data
- Set up database backups

## 🔒 Security

- **CORS**: Configured for development, adjust for production
- **Input Validation**: Add validation for API endpoints
- **SQL Injection**: Using parameterized queries
- **XSS**: Sanitize user input in production
- **HTTPS**: Required for production deployment

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: 480px - 767px
- **Small Mobile**: Below 480px

## 🎯 Performance Optimization

### Particle Animation
- Reduced particle count from 120 to 60
- Decreased connection distance from 120px to 100px
- Disabled on mobile devices for performance
- Optimized shadow blur usage

### CSS
- Used CSS variables for consistent theming
- Implemented hardware-accelerated transforms
- Optimized animations with cubic-bezier timing
- Lazy loading for images (add as needed)

### Backend
- SQLite for lightweight database operations
- Efficient SQL queries with proper indexing
- Connection pooling (add as needed for production)

## 🧪 Development

### Adding New Pages
1. Create new HTML file in the project root
2. Copy header/footer structure from existing pages
3. Add navigation link to all pages
4. Update mobile menu if needed

### Adding API Endpoints
1. Add route in `server.js`
2. Implement database operations
3. Add error handling
4. Test with curl or Postman

### Modifying Styles
- Edit `styles.css` for global styles
- Use inline styles for page-specific hero backgrounds
- Maintain consistency with existing design system

## 📝 Content Management

### Static Content
Edit HTML files directly for static content that doesn't change frequently.

### Dynamic Content
Use the API endpoints to manage content programmatically:

```bash
# Create new blog post
curl -X POST http://localhost:3000/api/blog \
  -H "Content-Type: application/json" \
  -d '{"title":"New Post","date":"2026-07-13","summary":"Summary","content":"Content"}'
```

### Database Management
- Database file: `anderson_enterprises.db`
- Use SQLite browser tools for direct database access
- Backup database regularly in production

## 📧 Email Setup Requirements

The following email addresses are referenced throughout the website and need to be configured:

### General Contact
- **contact@andersonenterprises.com** - Main contact email (Contact page)
- **careers@andersonenterprises.com** - Career inquiries (Contact page)

### Division-Specific
- **labs@andersonenterprises.com** - Anderson Labs inquiries (Contact page)
- **forge@andersonenterprises.com** - Anderson Forge manufacturing (Contact page)
- **aerospace@andersonenterprises.com** - Aerospace collaboration (Contact page)
- **foundation@andersonenterprises.com** - Foundation initiatives (Contact page)

### Investor Relations
- **investors@andersonenterprises.com** - Shareholder inquiries (Funding page)
- **advisors@andersonenterprises.com** - Advisory board recruitment (Funding page)

### Implementation Notes
- Set up email forwarding or mailboxes for all addresses
- Configure auto-responders for development phase status
- Set up email templates for investor inquiries
- Consider email service providers: Google Workspace, Microsoft 365, or custom mail server
- Update SPF, DKIM, and DMARC records for email deliverability
- Total: **8 email addresses** to configure

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

Copyright © 2026 Anderson Enterprises. All rights reserved.

## 📞 Support

For questions or support:
- Email: contact@andersonenterprises.com
- Website: https://andersonenterprises.com

## 🗺️ Roadmap

### Phase 1: Foundation (Current)
- ✅ Core website infrastructure
- ✅ Responsive design
- ✅ Backend API
- ✅ Investor relations page
- ✅ Development log

### Phase 2: Enhancement (Planned)
- [ ] User authentication
- [ ] Admin dashboard
- [ ] Advanced analytics
- [ ] Email notifications
- [ ] Search functionality

### Phase 3: Integration (Future)
- [ ] Third-party integrations
- [ ] Payment processing
- [ ] Document management
- [ ] Advanced investor tools

## 🙏 Acknowledgments

- Design inspiration from modern tech company websites
- Particle animation based on canvas API best practices
- Icons and images from Unsplash
- Built with vanilla web technologies for maximum performance

---

**Anderson Enterprises** - Building the Future of Industrial Automation
