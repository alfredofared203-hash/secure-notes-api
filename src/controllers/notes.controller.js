const db = require("../db/database");
const { exec } = require("child_process");

// ==========================
// GET /notes
// ==========================
exports.getAllNotes = (req, res) => {

  // ❌ SQL Injection (مقصود للتجربة)
  const search = req.query.search || "";

  const sql =
    "SELECT * FROM notes WHERE title LIKE '%" +
    search +
    "%'";

  db.all(sql, [], (err, rows) => {

    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }

    res.json(rows);

  });

};

// ==========================
// GET /notes/:id
// ==========================
exports.getNoteById = (req, res) => {

  // ❌ SQL Injection
  const sql =
    "SELECT * FROM notes WHERE id=" +
    req.params.id;

  db.get(sql, [], (err, row) => {

    if (err) {

      return res.status(500).json({
        error: err.message,
      });

    }

    res.json(row);

  });

};

// ==========================
// POST /notes
// ==========================
exports.createNote = (req, res) => {

  const { title, content } = req.body;

  const sql =
    `INSERT INTO notes(title,content)
     VALUES('${title}','${content}')`;

  db.run(sql, function (err) {

    if (err) {

      return res.status(500).json({
        error: err.message,
      });

    }

    res.json({

      message: "Note Created",

      id: this.lastID,

    });

  });

};

// ==========================
// PUT /notes/:id
// ==========================
exports.updateNote = (req, res) => {

  const { title, content } = req.body;

  const sql =
    `UPDATE notes
     SET title='${title}',
         content='${content}'
     WHERE id=${req.params.id}`;

  db.run(sql, function (err) {

    if (err) {

      return res.status(500).json({
        error: err.message,
      });

    }

    res.json({

      message: "Updated",

    });

  });

};

// ==========================
// DELETE /notes/:id
// ==========================
exports.deleteNote = (req, res) => {

  const sql =
    "DELETE FROM notes WHERE id=" +
    req.params.id;

  db.run(sql, function (err) {

    if (err) {

      return res.status(500).json({
        error: err.message,
      });

    }

    res.json({

      message: "Deleted",

    });

  });

};

// ==========================
// GET /notes/run?cmd=dir
// ==========================
// ❌ Command Injection (مقصود)
exports.runCommand = (req, res) => {

  exec(req.query.cmd, (err, stdout) => {

    if (err) {

      return res.status(500).send(err.message);

    }

    res.send(stdout);

  });

};

// ==========================
// GET /notes/calc?exp=2+2
// ==========================
// ❌ Dangerous eval (مقصود)
exports.calculate = (req, res) => {

  const result = eval(req.query.exp);

  res.send(result.toString());

};