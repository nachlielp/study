const pg = require("pg");

class Pool {
  _pool = null;

  async connect(options) {
    if (this._pool) {
      await this.close();
    }
    this._pool = new pg.Pool(options);
    return this._pool.query("SELECT 1 + 1;");
  }

  async close() {
    if (this._pool) {
      await this._pool.end();
      this._pool = null;
    }
  }

  query(sql, params) {
    if (!this._pool) {
      throw new Error("Pool not initialized. Call connect() first.");
    }
    return this._pool.query(sql, params);
  }
}

module.exports = new Pool();
