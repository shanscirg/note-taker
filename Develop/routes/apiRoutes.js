const router = require("express").Router();
const store = require("../db/store.js")

router.get("/notes", (req, res) => {
  store
    .getNotes()
    .then((notes, err) => {
      if (err) throw err;
      res.json(notes);
    })
})

router.post("/notes", (req, res) => {
  store
    .addNote(req.body)
    .then((note, err) => {
      if (err) throw err;
      res.json(note);
    })
})

router.delete("/notes/:id", function(req, res) {
  store
    .removeNote(req.params.id)
    .then((err) => {
      if (err) throw err;
      res.json("Note has been deleted!");
    })
});

module.exports = router;