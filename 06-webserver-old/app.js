const express = require('express');

const app = express();
const port = 8080;

// Serve static content
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Home page');
});

app.get('/products', (req, res) => {
    res.send('Products page');
});

app.get('*', (req, res) => {
    res.send('404 | Page not found');
});

app.listen(port, () => {
    console.log(`Application listening at: http://localhost:${port}`);
});