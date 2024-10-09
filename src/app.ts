import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import routes from './routes';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use('/api', routes);
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
