const path = require('path');

module.exports = function (app) {
  // Serve the "notes.html" page when the user accesses the '/notes' path.
  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views/notes.html'));
  });

  // Serve the "index.html" page for any other route or the root path ('/').
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views/index.html'));
  });
};



