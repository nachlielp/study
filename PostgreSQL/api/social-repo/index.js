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
    //The pool files a select 1+1 to make sure that it is connected, returning a promise, only if fulfilled we move on to start the ap
    app().listen(PORT, () => {
      console.log("Listening on port: ", PORT);
    });
  })
  .catch((err) => console.error(err));
