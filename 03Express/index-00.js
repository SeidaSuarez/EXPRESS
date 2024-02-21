const express = require("express");
const app = express();
const port = 3000;

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.send("Hello World using Express.JS!");
});

app.get("/contact", (req, res) => {
  res.send("<h1>Contacto</h1>");
});

app.get("/static", (req, res) => {
  res.sendFile(`${__dirname}/public/assets/index.html`);
});

app.use((req, res) => {
  res.sendFile(`${__dirname}/public/assets/404.html`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
