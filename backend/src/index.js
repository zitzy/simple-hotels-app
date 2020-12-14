const express = require('express');
const app = express();
const morgan = require('morgan');
const hotelList = require('./models/hotels');
const { port } = require('./config');

// add simple logs
app.use(morgan('combined'));

const router = express.Router();

router.get('/hotels', (req, res) => {
  // generate random (20% chance) error
  if (Math.random() < 0.2) {
    res.status(500);
    throw new Error('Could not connect to the database');
  }
  res.json(hotelList);
});

app.use('/', router);

app.listen(port);

console.log(`Hotel backend is running at ${port}`);
