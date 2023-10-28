const mongoose = require("mongoose");
const config = require("./config");

const uri = config.DATABASE_URL;
exports.dbConnect = () =>
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("database connected");
    })
    .catch((error) => {
      console.log("some error occur", error);
      process.exit(1);
    });
