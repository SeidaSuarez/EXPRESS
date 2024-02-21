const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
app.use(express.static(__dirname + "/public/"));

app.set("view engine", "ejs");
app.set("views", "./views/");

app.use("/", require("./router/rutas"));

app.use("/pokemon", require("./router/pokemon.js"));

require('dotenv').config();
let port = process.env.PORT || 3000;
// const user = process.env.USERNAME;
// const password = process.env.PASSWORD;
// const dbname = process.env.DBNAME;

const uri = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.8brh2ql.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
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
