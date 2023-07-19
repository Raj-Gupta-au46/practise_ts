import { model, Model, Schema } from "mongoose";
import TAMBOLA_TYPE from "../types/tambula";

const TicketSchema = new Schema<TAMBOLA_TYPE, Model<TAMBOLA_TYPE>>({
  ticketData: {
    type: [
      {
        type: Schema.Types.Mixed,
        required: true,
      },
    ],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
const Ticket = model<TAMBOLA_TYPE>("Ticket", TicketSchema);

export default Ticket;
