// models/Token.js
class TokenModel {
  constructor(db) {
    this.db = db;
  }
  
  storeToken(email, accessToken) {
    return new Promise((resolve, reject) => {
      const stmt = this.db.prepare("INSERT INTO tokens (email, accessToken) VALUES (?, ?)");
      stmt.run(email, accessToken, function(err) {
        if (err) return reject(err);
        resolve({ id: this.lastID });
      });
    });
  }
  
  getLatestToken() {
    return new Promise((resolve, reject) => {
      this.db.get("SELECT accessToken FROM tokens ORDER BY createdAt DESC LIMIT 1", [], (err, row) => {
        if (err) return reject(err);
        resolve(row ? row.accessToken : null);
      });
    });
  }
}

module.exports = TokenModel;
