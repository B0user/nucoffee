import express from 'express';
import mongoose from 'mongoose';
import chalk from 'chalk';
import dotenv from 'dotenv';
import multer from 'multer';
import cors from 'cors';
import { createServer } from 'http';

// Route files
import userRoutes from './routes/users.js';
import orderRoutes from './routes/orders.js';
// import itemRoutes from './routes/items.js';




dotenv.config();

const errorMsg = chalk.bgWhite.redBright;
const successMsg = chalk.bgGreen.white;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log(successMsg("DB ok")))
  .catch((err) => console.log(errorMsg("DB error:", err)));

const app = express();
const server = createServer(app);

app.use(cors({ origin: '*', methods: ['GET', 'PATCH', 'POST', 'PUT', 'DELETE'], credentials: true }));
app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Register routes with prefixes
app.use('/users', userRoutes);
app.use('/orders', orderRoutes);
// app.use('/items', itemRoutes);

const port = process.env.PORT || 3001;
server.listen(port, () => console.log(successMsg(`Listening on port: ${port}`)));