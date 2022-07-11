import mongoose from "mongoose";

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGOOSE_URL);
        console.log("Success: Connected to MongoDB");
    } catch (error) {
        console.log("Failure: Connected to MongoDB");
        throw new Error();
    }
};

export default connectDB;