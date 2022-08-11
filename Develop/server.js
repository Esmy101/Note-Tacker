import express from "express";
import { nanoid } from "nanoid";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static("public")); //looking at public folder
app.use(express.json());

app.get(
  "/notes",
  (
    req,
    res //return note.html
  ) => res.sendFile(path.join(__dirname, "public/notes.html"))
);

app.get(
  "/api/notes",
  (
    req,
    res //return index.html
  ) => res.sendFile(path.join(__dirname, "db/db.json"))
);

// POST request
app.post("/api/notes", (req, res) => {
  // Let the client know that their POST request was received
  //res.json({ requestBody: req.body });

  let Note = req.body;
  Note.id = nanoid()
  let notes = [];
  fs.readFile("db/db.json", "utf8", (err, data) => {
    if (err) {
      console.log(`Error reading file from disk: ${err}`);
    } else {
      // parse JSON string to JSON object
      notes = JSON.parse(data);
      console.log(notes);
      notes.push(Note);

      fs.writeFile("db/db.json", JSON.stringify(notes), (err) => {
        if (err) {
          console.error(err);
        }
        // file written successfully
      });

      //return notes
    }
  });
  res.json(`${req.method} request received`);
});

app.delete("/api/notes/:id", (req,res) => {
    fs.readFile("db/db.json", "utf8", (err, data) => { //get info from db
        if (err) {
          console.log(`Error reading file from disk: ${err}`);
        } else {
          // parse JSON string to JSON object
          let notes =[]
          notes = JSON.parse(data);
          let deleteItem = -1
          for(let i = 0 ; i < notes.length; i++){ //going through the list
            if (notes [i].id === req.params.id){
                deleteItem = i;
            }
          }
          if (deleteItem != -1){
            notes.splice(deleteItem, 1)
          }
          
          fs.writeFile("db/db.json", JSON.stringify(notes), (err) => {
            if (err) {
              console.error(err);
            }
            res.sendFile(path.join(__dirname, "db/db.json"))
          });
        }});
        
});


app.get(
  "*",
  (
    req,
    res //return index.html
  ) => res.sendFile(path.join(__dirname, "public/index.html"))
);

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
