import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { db } from './src/lib/db.js'; // Assuming your DB connection is here
import productRoutes from './src/app/routes/productRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/products', productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
