const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 9090;
const app = express();


app.use(express.static('dist'));

app.use(express.static(path.resolve('dist/index.html')));
app.use('/*', express.static(path.resolve('dist/index.html')));

app.listen(PORT, (err) => {
  if (err) throw (err);
  console.info(`==> Server started on ${PORT}`);
});
