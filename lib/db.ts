import mongoose from "mongoose";

const mongo_uri = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?retryWrites=true&w=majority&connectTimeoutMS=60000&socketTimeoutMS=60000`;

const connect = async () => {
    const connectionState = mongoose.connection.readyState;
    if (connectionState === 1) {
        console.log("MongoDB is already connected.");
        return;
    }

    if(connectionState === 2) {
        console.log("MongoDB is connecting.");
        return;
    }

    try{
        mongoose.connect(mongo_uri, {
            dbName: process.env.DB_NAME,
            bufferCommands:  true
    });
    console.log("Connected to MongoDB");
    } catch (error: any) {
        console.error("Error connecting to MongoDB:", error);
        throw new Error("MongoDB connection error");
    }
}

export default connect;