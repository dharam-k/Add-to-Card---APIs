import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import DBConnect from './config/db';
import usersRoute from './routes/users.route';
import productRoute from './routes/products.route';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const MONGODB_URI  = process.env.MONGO_URL as string; 

DBConnect(MONGODB_URI);

app.use("/user", usersRoute);
app.use("/product", productRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
