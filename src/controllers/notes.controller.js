const db = require("../db/database");
const { exec } = require("child_process");

// ==========================
// Get All Notes
// ==========================
exports.getNotes = (req, res) => {
  db.all("SELECT * FROM notes", [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }

    res.json({
      success: true,
      data: rows,
    });
  });
};

// ==========================
// Add Note
// ==========================
exports.addNote = (req, res) => {
  const { title, content } = req.body;

  db.run(
    "INSERT INTO notes(title,content) VALUES(?,?)",
    [title, content],
    function (err) {
      if (err) {
        return res.status(500).json({
          error: err.message,
        });
      }

      res.json({
        success: true,
        id: this.lastID,
      });
    }
  );
};

// ===================================================
// ❌ SQL Injection Demo (لـ OWASP ZAP)
// ===================================================
exports.search = (req, res) => {
  const title = req.query.title;

  const sql =
    "SELECT * FROM notes WHERE title = '" +
    title +
    "'";

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }

    res.json(rows);
  });
};

// ===================================================
// ❌ Reflected XSS Demo (لـ ZAP)
// ===================================================
exports.echo = (req, res) => {
  res.send(req.query.message);
};

// ===================================================
// ❌ Dangerous eval() (لـ Semgrep)
// ===================================================
exports.calculate = (req, res) => {
  const expression = req.query.expression;

  const result = eval(expression);

  res.json({
    result,
  });
};

// ===================================================
// ❌ Command Injection Demo (لـ Semgrep)
// ===================================================
exports.runCommand = (req, res) => {
  const cmd = req.query.cmd;

  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      return res.status(500).send(stderr);
    }

    res.send(stdout);
  });
};