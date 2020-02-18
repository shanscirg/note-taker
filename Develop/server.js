var http = require("http");
const express = require("express");
const path = require("path");

var PORT = process.env.PORT || 8080;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let notes = [
    {
        noteTest: "testing da notes 1",
        noteTest2: "testingtesting 1"
    },
    {
        noteTest: "testinnng 2",
        noteTest2: "testestest 2"
    }
]

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Displays all notes
app.get("/api/notes", function(req, res) {
    return res.json(notes);
  });
  
  // Displays a single character, or returns false
  app.get("/api/notes/:note", function(req, res) {
    const chosen = req.params.note;
  
    console.log(chosen);
  
    for (let i = 0; i < notes.length; i++) {
      if (chosen === notes[i].routeName) {
        return res.json(notes[i]);
      }
    }
  
    return res.json(false);
  });

app.post("/api/notes", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    const newNote = req.body;
  
    // Using a RegEx Pattern to remove spaces from newNote
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newNote.noteTest = newNote.name.replace(/\s+/g, "").toLowerCase();
  
    console.log(newNote);
    
    notes.push(newNote);
    
    res.json(newNote);
  });
  


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });