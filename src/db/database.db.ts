import mongoose from "mongoose";
import { DbUrl } from "../config";

class DataBase {
  constructor() {
    this.connect();
  }

  private connect(): void {
    mongoose.set("strictQuery", true);
    mongoose
      .connect(DbUrl)
      .then(() => {
        console.log("Database Connected");
      })
      .catch((error) => {
        console.log("Database connection error: ", error);
        process.exit(1);
      });
  }
}

export default DataBase;
