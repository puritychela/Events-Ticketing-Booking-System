"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const venues_controller_1 = require("./venues.controller");
const venueRouter = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Venues
 *   description: Venue management operations
 */
/**
 * @swagger
 * /venues:
 *   get:
 *     summary: Get all venues
 *     tags: [Venues]
 *     responses:
 *       200:
 *         description: List of venues
 */
venueRouter.get("/", venues_controller_1.getAllVenues);
/**
 * @swagger
 * /venues/{id}:
 *   get:
 *     summary: Get a venue by ID
 *     tags: [Venues]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Venue ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Venue found
 *       404:
 *         description: Venue not found
 */
venueRouter.get("/:id", venues_controller_1.getVenueById);
/**
 * @swagger
 * /venues:
 *   post:
 *     summary: Create a new venue
 *     tags: [Venues]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - location
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *               capacity:
 *                 type: integer
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Venue created successfully
 */
venueRouter.post("/", venues_controller_1.createVenue);
/**
 * @swagger
 * /venues/{id}:
 *   put:
 *     summary: Update a venue
 *     tags: [Venues]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Venue ID
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *               capacity:
 *                 type: integer
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Venue updated
 *       404:
 *         description: Venue not found
 */
venueRouter.put("/:id", venues_controller_1.updateVenue);
/**
 * @swagger
 * /venues/{id}:
 *   delete:
 *     summary: Delete a venue
 *     tags: [Venues]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Venue ID
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Venue deleted
 *       404:
 *         description: Venue not found
 */
venueRouter.delete("/:id", venues_controller_1.deleteVenue);
exports.default = venueRouter;
