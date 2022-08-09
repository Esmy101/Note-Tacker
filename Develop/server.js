import express from 'express'
import { nanoid } from 'nanoid'
import * as fs from 'fs';
import * as path from 'path'
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.static('public')); //looking at public folder
app.use(express.json())

app.get('/notes', (req, res) => //return note.html
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);


app.get('/api/notes', (req, res) => //return index.html
    res.sendFile(path.join(__dirname, 'db/db.json'))
);

// POST request
app.post('/api/notes', (req, res) => {
    // Let the client know that their POST request was received
    res.json(`${req.method} request received`);
  
});
app.get('*', (req, res) => //return index.html
    res.sendFile(path.join(__dirname, 'public/index.html'))
);


app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
