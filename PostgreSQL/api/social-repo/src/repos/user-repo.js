const pool = require("../pool");

class UserRepo {
  async find() {
    const { rows } = await pool.query("SELECT * FROM users;");
    console.log("user-repo, rows: ", rows);
    return rows;
  }

  async findById() {}

  async insert() {}

  async update() {}

  async delete() {}
}

const userRepo = new UserRepo();
module.exports = userRepo;
