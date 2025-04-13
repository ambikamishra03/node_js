const express = require("express");
const app = express();
app.use(express.json()); // ✅ This parses JSON body
const db = require("./db");
const bodyParser = require("body-parser");
const personRoutes = require("./router/personRoutes");
const menuRoutes = require("./router/menuRoutes");
app.use(bodyParser.json());

// get method used to request data from server
app.get("/", (req, res) => {
  res.send("Hello user");
});

app.use("/person", personRoutes);
app.use("/menu", menuRoutes);

app.listen(3000, () => {
  console.log("server listen to port 3000");
});
