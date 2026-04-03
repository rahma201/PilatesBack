const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const usersRouter = require("./routes/users");
const ProductRouter = require("./routes/productsrouter");
const cartRouter = require("./routes/cartroutes");
const uploadRouter = require("./routes/upload");

const app = express();
const PORT = process.env.PORT || 5000;

require("./models/db");

app.use(cors());
app.use(express.json());

app.use("/users", usersRouter);
app.use("/products", ProductRouter);
app.use("/cart", cartRouter);
app.use("/upload", uploadRouter);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});