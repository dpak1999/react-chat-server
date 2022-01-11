/** @format */

import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
dotenv.config();

// routes
import authroutes from './routes/auth.js';

const PORT = process.env.PORT;
const app = express();
app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded());

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.use('/auth', authroutes);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
