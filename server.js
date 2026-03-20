import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/db';


const app = express();
const PORT = 3000;

connectDB();

app.get('/', (req, res) => {
    res.send("ecommerce de venta gamer");
});

app.listen(PORT, () => {
    console.log(`El servidor esta corriendo en http://localhost:${PORT}`);
});