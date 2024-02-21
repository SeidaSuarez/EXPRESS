const express = require("express");
const app = express();
const port = 3000;
app.use(express.static(__dirname + '/public'));

app.set("view engine", "ejs");
app.set("views", "./views/");

app.get("/", (req, res) => {
  res.render("index", {titulo: "mi título dinámico"});
});

app.get("/contacto", (req, res) => {
  res.render("index", {titulo: "Estamos en contacto de manera dinámica"});
});

app.use((req, res) => {
  res.status(404).render('404', {
    titulo: "Error 404",
    description: "Page Not Found"
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
