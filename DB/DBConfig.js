import mongoose from "mongoose";

const dbConnection = () => {
  const dbURL = process.env.MONGO_URL;
  mongoose
    .connect(dbURL)
    .then(() => console.log("MONGODB CONNECTED SUCCESSFULLY"))
    .catch((err) => console.log(err));
};

export default dbConnection;
