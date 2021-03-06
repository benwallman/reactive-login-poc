const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 9090;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/login', (req, res) => {
  console.log("here");
  console.log(req.body);
  setTimeout(() => {
    if (!req.body || !req.body.username || !req.body.password) res.sendStatus(400);
    else if (req.body.username !== "ben") res.sendStatus(404);
    else if (req.body.password !== "password") res.sendStatus(401);
    else res.sendStatus(200);
  }, 300);
});

app.use(express.static('dist'));

app.use('/*', express.static(path.resolve('dist/index.html')));

app.listen(PORT, (err) => {
  if (err) throw (err);
  console.info(`==> Server started on ${PORT}`);
});