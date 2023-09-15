const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
  <div><form method="POST">
  <input name="email" placeholder="email" />
  <input name="password" placeholder="password" />
  <button>Sign In</button>
  </form></div>`);
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("Account created!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
