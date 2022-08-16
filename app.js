const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan('combined'));
app.use(cors());

const routes = require('./routes');
app.use(routes);

const port = process.env.PORT;

app.get('/ping', function (req, res, next) {
  res.json({message: 'pong'});
});

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Running on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

start();