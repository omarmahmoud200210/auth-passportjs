import mongoose from "mongoose";

const connectWithMongo = async (url) => await mongoose.connect(url);

export default connectWithMongo;