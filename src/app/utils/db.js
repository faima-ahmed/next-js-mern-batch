import mongoose from "mongoose";

const connectDb = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log("I am ready");

    return;
  }
  await mongoose.connect(`mongodb+srv://faimaahmeddiya:faimamongo2002db@cluster0.k2g5wii.mongodb.net/next-js-api`);
  // mongoose.set("debug", true);
};

export default connectDb;
