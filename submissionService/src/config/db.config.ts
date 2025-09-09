import mongoose from "mongoose";

import serverConfig from "./server.config";

export const connectDB = async () => {
  try {
    const dbUrl = serverConfig.DB_URL!;

    await mongoose.connect(dbUrl);

    console.log("Connected to mongodb successfully");

    mongoose.connection.on("error", (error) => {
      console.log("MongoDB connection error", error);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected");
    });

    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("MongoDB connection closed");
      process.exit(0);
    });
  } catch (error) {
    console.log("Failed to connect to mongodb", error);
    process.exit(1);
  }
};
