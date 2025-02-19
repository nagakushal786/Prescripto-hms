import mongoose from "mongoose";

const connectDB=()=> {
    mongoose.connect(process.env.MONGODB_URL, {
        dbName: "SE-HMS"
    }).then(()=> {
        console.log("Successfully connected to database");
    }).catch((err)=> {
        console.log(`Some error occured in connecting to database: ${err}`);
    })
}

export default connectDB;