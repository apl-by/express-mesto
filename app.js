const express = require('express');
const router = require('./routes');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.static('public'));
app.use('/', router);

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});
