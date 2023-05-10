const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.json());

// routes
app.use('/', require('./routes/routes'));

app.listen(port, () => {
  console.log(`server running at localhost:${port}`);
});