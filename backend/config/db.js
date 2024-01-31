const mongoose = require("mongoose");

// For MongoDB Compass

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect("mongodb://0.0.0.0:27017/talkrapp");  
//     console.log("Database Connected Successfully");
//   } catch (error) {
//     console.log("Database Error");
//     process.exit();
//   }
// };

// For MongoDB Atlas
const connectDB = async(DATABASE_URL) => {
  try {
      const DB_OPTIONS = {
          dbName:"userAuth",
          useNewUrlParser: true,
          useUnifiedTopology: true,
      }
      await mongoose.connect(DATABASE_URL, DB_OPTIONS)
      console.log("Connected Sucessfully......")

  } catch (error) {
      console.log(error)
  }
}



module.exports = connectDB;



