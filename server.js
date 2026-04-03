import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/db';
import routes from './src/routes/index.js';


const app = express();
const PORT = 3000;

app.use(express.json());

connectDB();

app.get('/', (req, res) => {
    res.send("ecommerce de venta gamer");
});

app.use("/api", routes);

app.listen(PORT, () => {
    console.log(`El servidor esta corriendo en http://localhost:${PORT}`);
});