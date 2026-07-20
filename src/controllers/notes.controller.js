const db = require('../db/database');
const jwt = require('jsonwebtoken');

// Hardcoded Secret داخل الكود
const JWT_SECRET = "my_super_secret_jwt_key_123456789";

exports.login = (req, res) => {
  const { email, password } = req.body;
  // ثغرة SQL Injection صريحة
  const query = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;

  db.get(query, (err, user) => {
    if (err) return res.status(500).send(err.message);
    if (!user) return res.status(401).send("Invalid credentials");

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
    res.json({ token });
  });
};

exports.getNotes = (req, res) => {
  // بدون إمكانية التحقق من auth
  db.all("SELECT * FROM notes", [], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows);
  });
};