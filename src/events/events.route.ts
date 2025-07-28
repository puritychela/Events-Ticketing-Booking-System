import { Router } from "express";
import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from "./events.controller";

const eventRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Event management endpoints
 */

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Get all events with optional filters
 *     tags: [Events]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for title
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by event category
 *       - in: query
 *         name: venueId
 *         schema:
 *           type: integer
 *         description: Filter by venue ID
 *       - in: query
 *         name: eventType
 *         schema:
 *           type: string
 *           enum: [Online, In-person]
 *         description: Filter by event type
 *       - in: query
 *         name: accessLevel
 *         schema:
 *           type: string
 *           enum: [Free, VIP]
 *         description: Filter by access level
 *     responses:
 *       200:
 *         description: List of events
 */
eventRouter.get("/", getEvents);

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Get event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Event details
 *       404:
 *         description: Event not found
 */
eventRouter.get("/:id", getEventById);

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - date
 *               - time
 *               - venueId
 *               - ticketPrice
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               venueId:
 *                 type: integer
 *               date:
 *                 type: string
 *                 format: date
 *               time:
 *                 type: string
 *                 format: time
 *               ticketPrice:
 *                 type: number
 *                 format: float
 *               ticketsTotal:
 *                 type: integer
 *               imageUrl:
 *                 type: string
 *               eventType:
 *                 type: string
 *                 enum: [Online, In-person]
 *               accessLevel:
 *                 type: string
 *                 enum: [Free, VIP]
 *     responses:
 *       201:
 *         description: Event created successfully
 */
eventRouter.post("/", createEvent);

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     summary: Update an event
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Event ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               venueId:
 *                 type: integer
 *               date:
 *                 type: string
 *                 format: date
 *               time:
 *                 type: string
 *                 format: time
 *               ticketPrice:
 *                 type: number
 *               ticketsTotal:
 *                 type: integer
 *               imageUrl:
 *                 type: string
 *               eventType:
 *                 type: string
 *                 enum: [Online, In-person]
 *               accessLevel:
 *                 type: string
 *                 enum: [Free, VIP]
 *     responses:
 *       200:
 *         description: Event updated successfully
 */
eventRouter.put("/:id", updateEvent);

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Delete an event
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Event deleted
 */
eventRouter.delete("/:id", deleteEvent);

export default eventRouter;
