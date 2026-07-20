const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// إنشاء قاعدة البيانات داخل مجلد data
const dbPath = path.join(__dirname, "../data/notes.db");

// الاتصال بقاعدة البيانات
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
  } else {
    console.log("✅ Connected to SQLite database.");

    // إنشاء جدول الملاحظات إذا لم يكن موجودًا
    db.run(`
      CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }
});

module.exports = db;