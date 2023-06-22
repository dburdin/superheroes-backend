const mongoose = require("mongoose");

const app = require("./db/app");

const { DB_HOST } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(8000, () => {
      console.log("Server running. Use our API on port: 8000");
    });
  })
  .catch((error) => {
    console.log("error.message", error.message);

    process.exit(1);
  });
