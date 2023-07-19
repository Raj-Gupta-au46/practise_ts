import { Document } from "mongoose";
import User from "./user";

export default interface TAMBOLA_TYPE extends Document {
  user: User["_id"] | User;
  ticketData: any[];
}
