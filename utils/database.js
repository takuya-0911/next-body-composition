import mongoose from "mongoose";

const connectDB = async() => {
    try {
        await mongoose.connect("mongodb+srv://tksepii:ritchie1016@cluster0.mkvsxyc.mongodb.net/appDataBase?retryWrites=true&w=majority");
        console.log("Success: Connected to MongoDB");
    } catch (error) {
        console.log("Failure: Connected to MongoDB");
        throw new Error();
    }
};

export default connectDB;