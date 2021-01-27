const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const router = require('./routes');

const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(express.static('public'));
app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '60102e2906fb552750a63cfb',
  };

  next();
});
app.use(helmet());
app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} port`);
});
