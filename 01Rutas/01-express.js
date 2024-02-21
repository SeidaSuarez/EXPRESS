const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.static(__dirname + "/public/"));

let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", "./views/");

app.use("/", require("./router/rutas"));

app.use("/Pokemon", require("./router/Pokemon.js"));

require('dotenv').config();
let port = process.env.PORT || 3000;
const user = process.env.USER;
const password = process.env.PASSWORD;
const dbname = process.env.DBNAME;

const uri = `mongodb+srv://${user}:${password}@cluster0.8brh2ql.mongodb.net/${dbname}?retryWrites=true&w=majority`;
mongoose
  .connect(uri)
  .then(() => console.log("Base de datos conectada"))
  .catch((e) => console.log(e));

app.use((req, res) => {
  res.status(404).render("404", {
    titulo: "Error 404",
    description: "Page Not Found",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
