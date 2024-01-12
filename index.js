const express = require("express");
const { readFile, writeJsonFile } = require("./filesystemUnits");
const app = express();

app.use((req, _, next) => {
  console.log("new request:", req.url, req.method);
  next();
});

app.use(express.static("public"));

app.get("/", (_, res) => res.sendFile(__dirname + "/public/pages/index.html"));

app.get("/api/works", (_, res) => {
  res.sendFile(__dirname + "/works.json");
});
app.post("/app/works", express.json(), (req, res) => {
  console.log(req.body);
  const newWork = req.body;
  readFile("./works.json")
    .then((works) => [...JSON.parse(works.toString()), newWork])
    .then((newWorkArr) => writeJsonFile("./works.json", newWorkArr))
    .then((newWorkArr) => res.json(newWorkArr));
});

app.use((_, res) => res.sendFile(__dirname + "/public/pages/error.html"));

app.listen(1000, () => console.log("auf Port : 1000"));
