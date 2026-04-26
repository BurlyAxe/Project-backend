import dotenv from 'dotenv';
import express from 'express';
import connectDB from './src/config/db.js';
import routes from './src/routes/index.js';
import logger from './src/middlewares/logger.js';
import errorHandler from './src/middlewares/errorHandler.js';

dotenv.config();


const app = express();
const PORT = 3000;

app.use(express.json());
app.use(logger);
app.use(errorHandler);

connectDB();

app.get('/', (req, res) => {
    res.send("ecommerce de venta gamer");
});

app.use("/api", routes);

app.use((req, res) => {
    res.status(404).json({
        error: "Ruta no encontrada",
        method: req.method,
        url: req.originalUrl,
    })
})

app.listen(PORT, () => {
    console.log(`El servidor esta corriendo en http://localhost:${PORT}`);
});