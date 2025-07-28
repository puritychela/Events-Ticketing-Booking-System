// import { Request, Response } from "express";
// import {
//   createReplyService,
//   getRepliesByTicketIdService,
// } from "./TicketsReply.service";

// // POST /api/replies
// export const handleCreateReply = async (req: Request, res: Response) => {
//   try {
//     const { ticketId, message } = req.body;
//     const responderId = req.user.userId; // or however you're getting logged-in user

//     const reply = await createReplyService({ ticketId, responderId, message });

//     res.status(201).json(reply);
//   } catch (error) {
//     console.error("Error creating reply:", error);
//     res.status(500).json({ error: "Failed to create reply" });
//   }
// };

// // GET /api/replies/:ticketId
// export const handleGetReplies = async (req: Request, res: Response) => {
//   try {
//     const ticketId = parseInt(req.params.ticketId);

//     const replies = await getRepliesByTicketIdService(ticketId);

//     res.status(200).json(replies);
//   } catch (error) {
//     console.error("Error fetching replies:", error);
//     res.status(500).json({ error: "Failed to fetch replies" });
//   }
// };
