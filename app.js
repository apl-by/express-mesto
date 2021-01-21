const express = require('express');
const helmet = require('helmet');
const router = require('./routes');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.static('public'));
app.use(helmet());
app.use('/', router);

app.listen(PORT);
