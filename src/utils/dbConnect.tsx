import mongoose from "mongoose"

interface dbConnection{
    isConnected: number
}

const connection: dbConnection = {isConnected:0};

async function dbConnect() {
    if (connection.isConnected == 1){
        return;
    }

    const db = await mongoose.connect(process.env.MONGODB_URI as string);

    connection.isConnected = db.connections[0].readyState;
    console.log("Connection Readystate " + connection.isConnected);
    return;
}

export default dbConnect;
