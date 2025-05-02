const pool = require("../pool");
const toCamelCase = require("./utils/to-camel-case");

class UserRepo {
  async find() {
    const { rows } = await pool.query("SELECT * FROM users;");

    return toCamelCase(rows);
  }

  async findById(id) {
    const { rows } = await pool.query(`
        SELECT * FROM users WHERE id = ${id}
        `);

    return toCamelCase(rows)[0];
  }

  async insert() {}

  async update() {}

  async delete() {}
}

const userRepo = new UserRepo();
module.exports = userRepo;
