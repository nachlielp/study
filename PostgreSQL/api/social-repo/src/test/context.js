const { randomBytes } = require("crypto");
const { default: migrate } = require("node-pg-migrate");
const format = require("pg-format");
const pool = require("../pool");

const DEFAULT_OPTIONS = {
  host: "localhost",
  post: 5432,
  database: "socialnetwork_test",
  user: "nach",
  password: "",
};

class Context {
  static async build() {
    const roleName = "a" + randomBytes(4).toString("hex"); //a to make sure starts with a letter not a number
    // connetc
    await pool.connect(DEFAULT_OPTIONS);

    await pool.query(
      format(`CREATE ROLE %I WITH LOGIN PASSWORD %L;`, roleName, roleName)
    ); // %I - Identifier, %L literal value

    await pool.query(
      format(`CREATE SCHEMA %I AUTHORIZATION %I;`, roleName, roleName)
    );

    await pool.close();

    await migrate({
      schema: roleName,
      direction: "up",
      log: () => {},
      noLock: true,
      dir: "migrations",
      databaseUrl: {
        host: "localhost",
        post: 5432,
        database: "socialnetwork_test",
        user: roleName,
      },
    });

    await pool.connect({
      host: "localhost",
      post: 5432,
      database: "socialnetwork_test",
      user: roleName,
      password: roleName,
    });

    return new Context(roleName);
  }

  constructor(roleName) {
    this.roleName = roleName;
  }

  async reset() {
    return pool.query(`
        DELETE FROM users;
        `);
  }

  async close() {
    await pool.close();

    await pool.connect(DEFAULT_OPTIONS);

    await pool.query(format(" DROP SCHEMA %I CASCADE;", this.roleName));

    await pool.query(format(" DROP ROLE %I;", this.roleName));

    return await pool.close();
  }
}

module.exports = Context;
