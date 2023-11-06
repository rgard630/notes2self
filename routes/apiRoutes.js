const fs = require('fs');
const path = require('path');

module.exports = function (app) {
  // Read notes from db.json
  app.get('/api/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json')));
    res.json(notes);
  });

  // Create a new note
  app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    const notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json')));

    // Assign a unique ID to the new note (you can use a UUID library for this)
    // For simplicity, generating a unique ID using the current timestamp
    newNote.id = Date.now().toString();

    // Push the new note to the notes array
    notes.push(newNote);

    // Write the updated notes array back to db.json
    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(notes, null, 2));

    res.json(newNote);
  });

  // Delete a note by ID
  app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    const notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json')));

    // Filter out the note with the specified ID
    const updatedNotes = notes.filter((note) => note.id !== noteId);

    // Write the updated notes array back to db.json
    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(updatedNotes, null, 2));

    res.json({ success: true });
  });
};


