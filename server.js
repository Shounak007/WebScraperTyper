const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');  // Enable CORS
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

// Serve static files (your HTML, CSS, and JavaScript) if needed
app.use(express.static('public'));

// Load the initial content
let content = '';
const contentFile = 'content.json';

// Load the content from the JSON file
if (fs.existsSync(contentFile)) {
    const data = fs.readFileSync(contentFile);
    content = JSON.parse(data).content;
} else {
    content = 'This is some editable content. Click "Edit" to make changes.';
}

// Endpoint to get the content
app.get('/content', (req, res) => {
    res.json({ content });
});

// Endpoint to save the content
app.post('/save', (req, res) => {
    const newContent = req.body.content;
    content = newContent;

    // Save content to the JSON file
    fs.writeFileSync(contentFile, JSON.stringify({ content }));
    res.json({ success: true });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
