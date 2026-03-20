import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conection = await mongoose.connect (
            "mongodb://localhost:27017/Proyecto",
        );
            console.log(`MongoDB conectado: ${conection.connection.host}`);
    } catch (error) {
        console.error("Error con la conexión a MongoDB:");
        process.exit(1);
    }
}

export default connectDB;