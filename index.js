/** @format */

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

// routes
const authroutes = require('./routes/auth');

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.use('/auth', authroutes);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
