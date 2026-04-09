const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve i file statici (HTML, CSS, JS) dalla cartella corrente
app.use(express.static(__dirname));

// Rotta principale che restituisce il tuo file index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`🌍 Dashboard disponibile su http://localhost:${port}`);
});