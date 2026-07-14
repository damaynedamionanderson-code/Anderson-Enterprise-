const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: '*', // keep permissive for local/site usage; tighten later for production
    methods: ['GET', 'POST', 'OPTIONS'],
}));
app.disable('x-powered-by');
app.use((req, res, next) => {
    // Basic security headers for static site
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
});
app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname)));


// Database setup
const db = new sqlite3.Database('./anderson_enterprises.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database');
        initializeDatabase();
    }
});

// Initialize database tables
function initializeDatabase() {
    db.serialize(() => {
        // Blog posts table
        db.run(`CREATE TABLE IF NOT EXISTS blog_posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            date TEXT NOT NULL,
            summary TEXT NOT NULL,
            content TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);

        // Projects table
        db.run(`CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            status TEXT NOT NULL,
            description TEXT NOT NULL,
            technology TEXT,
            milestone TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);

        // Lab experiments table
        db.run(`CREATE TABLE IF NOT EXISTS lab_experiments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            status TEXT NOT NULL,
            challenge TEXT,
            solution TEXT,
            code_snippet TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);

    });
}

// API Routes

// Get all blog posts
app.get('/api/blog', (req, res) => {
    db.all("SELECT * FROM blog_posts ORDER BY date DESC", (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Get single blog post
app.get('/api/blog/:id', (req, res) => {
    db.get("SELECT * FROM blog_posts WHERE id = ?", [req.params.id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ error: 'Blog post not found' });
            return;
        }
        res.json(row);
    });
});

// Get all projects
app.get('/api/projects', (req, res) => {
    db.all("SELECT * FROM projects ORDER BY created_at DESC", (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Get single project
app.get('/api/projects/:id', (req, res) => {
    db.get("SELECT * FROM projects WHERE id = ?", [req.params.id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ error: 'Project not found' });
            return;
        }
        res.json(row);
    });
});

// Get all lab experiments
app.get('/api/experiments', (req, res) => {
    db.all("SELECT * FROM lab_experiments ORDER BY created_at DESC", (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Get single experiment
app.get('/api/experiments/:id', (req, res) => {
    db.get("SELECT * FROM lab_experiments WHERE id = ?", [req.params.id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ error: 'Experiment not found' });
            return;
        }
        res.json(row);
    });
});

// Create new blog post
app.post('/api/blog', (req, res) => {
    const { title, date, summary, content } = req.body;
    db.run(`INSERT INTO blog_posts (title, date, summary, content) VALUES (?, ?, ?, ?)`,
        [title, date, summary, content],
        function(err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ id: this.lastID, title, date, summary, content });
        }
    );
});

// Create new project
app.post('/api/projects', (req, res) => {
    const { name, status, description, technology, milestone } = req.body;
    db.run(`INSERT INTO projects (name, status, description, technology, milestone) VALUES (?, ?, ?, ?, ?)`,
        [name, status, description, technology, milestone],
        function(err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ id: this.lastID, name, status, description, technology, milestone });
        }
    );
});

// Create new lab experiment
app.post('/api/experiments', (req, res) => {
    const { title, status, challenge, solution, code_snippet } = req.body;
    db.run(`INSERT INTO lab_experiments (title, status, challenge, solution, code_snippet) VALUES (?, ?, ?, ?, ?)`,
        [title, status, challenge, solution, code_snippet],
        function(err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ id: this.lastID, title, status, challenge, solution, code_snippet });
        }
    );
});

// SPA fallback only (avoid hijacking real static files)
app.get('*', (req, res, next) => {
    if (path.extname(req.path)) return next(); // let express serve /something.css /labs.html etc.
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err.message);
        }
        console.log('Database connection closed');
        process.exit(0);
    });
});
