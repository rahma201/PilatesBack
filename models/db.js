const mongoose = require("mongoose");

console.log(process.env.URL);

mongoose.connect(process.env.URL)
  .then(() => {
    console.log("Ready To Use your DB");
  })
  .catch((err) => {
    console.log("DB connection error:", err.message);
  });