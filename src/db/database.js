const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./src/db/notes.db');

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, email TEXT, password TEXT)");
  db.run("CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY, userId INTEGER, content TEXT)");
  // حفظ Passwords بدون Hashing
  db.run("INSERT OR IGNORE INTO users (email, password) VALUES ('admin@example.com', 'SuperSecretPassword123')");
});

module.exports = db;