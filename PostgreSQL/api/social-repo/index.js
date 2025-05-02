const app = require("./src/app.js");
const pool = require("./src/pool.js");
const PORT = 3005;

pool
  .connect({
    host: "localhost",
    post: 5432,
    database: "socialnetwork_v2",
    user: "nach",
    password: "",
  })
  .then(() => {
    app().listen(PORT, () => {
      console.log("Listening on port: ", PORT);
    });
  })
  .catch((err) => console.error(err));
