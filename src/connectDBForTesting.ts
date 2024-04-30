import mongoose from "mongoose";
require("dotenv").config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB);

  } catch (error) {
    console.log("DB connect error");
  }
}

const clearDatabase = async () => {
  const { drivers } = mongoose.connection.collections;

    await drivers.deleteMany({});
}

export const disconnectDB = async () => {
  try {
    await clearDatabase();
    mongoose.connection.close();
  } catch (error) {
    console.log("DB disconnect error");
  }
}
