import { Request, Response } from "express";
import TicketModel from "../models/tambula.model";
import UserModel from "../models/user.model";
import { generateTambulaTickets } from "../helper/tambula.helper";

class TambulaController {
  // create Ticket
  async createTicket(req: Request, res: Response): Promise<void> {
    try {
      const { numberOfTicketSet, userId } = req.body;
      // console.log(numberOfTicketSet);
      if (numberOfTicketSet <= 0) {
        res
          .status(400)
          .json({ error: "Number of tickets must be greater than 0" });
        return;
      }

      const user = await UserModel.findById(userId);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      for (let i = 0; i < numberOfTicketSet; i++) {
        const tickets = generateTambulaTickets();
        console.log(tickets);
        for (let [ticketId, data] of Object.entries(tickets)) {
          const ticketList = new TicketModel({
            ticketData: data,
            user: user._id,
          });
          await ticketList.save();
        }
      }
      res.status(201).json({ message: "Ticket created successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to create ticket" });
    }
  }

  // fetching the ticket

  async fetchTickets(req: Request, res: Response): Promise<void> {
    const userId = req.params.userId;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 6;

    try {
      // Get total count of tickets
      const totalCount = await TicketModel.countDocuments({ user: userId });

      // Calculate pagination values
      const totalPages = Math.ceil(totalCount / limit);
      const skip = (page - 1) * limit;

      // Fetch ticket lists
      const tickets = await TicketModel.find({ user: userId })
        .skip(skip)
        .limit(limit);
      res.json({
        totalCount,
        totalPages,
        currentPage: page,
        tickets,
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default TambulaController;
