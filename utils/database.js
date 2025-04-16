// utils/database.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

function connectDB() {
  return new Promise((resolve, reject) => {
    // Store the SQLite file in the project root
    const dbPath = path.join(process.cwd(), 'database.sqlite');
    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
      if (err) {
        return reject(err);
      }
      // Create the tokens table if it doesn't already exist
      db.run(
        `CREATE TABLE IF NOT EXISTS tokens (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT NOT NULL,
          accessToken TEXT NOT NULL,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )`,
        (err) => {
          if (err) return reject(err);
          resolve(db);
        }
      );
    });
  });
}

module.exports = { connectDB };
