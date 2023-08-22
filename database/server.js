let express = require("express");
let cors = require("cors");

let app = express();
let port = 3001;

app.use(
  cors({
    accessControlAllowOrigin: "*",
  })
);

let {
  haeKaikki,
  haeKaikkiArtistit,
  haeArtistilla,
  haeNimellä,
} = require("./index");
console.log(haeKaikki);
app.get("/festivals", async (req, res) => {
  let sort = req.query.sort;
  let result = await haeKaikki(sort);
  res.send(result);
});

app.get("/bands", async (req, res) => {
  let result = await haeKaikkiArtistit();
  res.send(result);
});

app.get("/festivals/:name", async (req, res) => {
  let name = req.params.name;
  let result = await haeNimellä(name);

  res.send(result);
});

app.get("/bands/:name", async (req, res) => {
  let name = req.params.name;
  let result = await haeArtistilla(name);

  res.send(result);
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
