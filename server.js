const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public')); // To serve static files like HTML

// Routes
app.post('/submit', (req, res) => {
    const { name, email, age, message } = req.body; // Added 'age' parameter
    const query = 'INSERT INTO data (name, email, age, message) VALUES (?, ?, ?, ?)'; // Added 'age' in the query
    
    db.query(query, [name, email, age, message], (err, result) => { // Passed 'age' in the parameter array
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/');
    });
});


app.get('/submissions', (req, res) => {
    const query = 'SELECT * FROM data';
    
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
