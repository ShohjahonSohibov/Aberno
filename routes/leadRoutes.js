const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdminMiddleware = require('../middlewares/isAdminMiddleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     Lead:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier of the lead
 *         name:
 *           type: string
 *           description: The name of the lead
 *         text:
 *           type: string
 *           description: The text or message from the lead
 *         phone:
 *           type: string
 *           description: The phone number of the lead
 *         email:
 *           type: string
 *           description: The email of the lead
 *         status:
 *           type: string
 *           enum: ['new', 'called', 'rejected', 'interested']
 *           description: The status of the lead
 *         isActive:
 *           type: boolean
 *           description: Indicates if the lead is active
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation date of the lead
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The last update date of the lead
 *       example:
 *         id: "64a6c8b9d9f1e723f17c2c3b"
 *         name: "John Doe"
 *         text: "Interested in your services"
 *         phone: "+123456789"
 *         email: "johndoe@example.com"
 *         status: "new"
 *         isActive: true
 *         createdAt: "2023-08-28T14:48:00.000Z"
 *         updatedAt: "2023-08-28T14:48:00.000Z"
 *
 *     LeadResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates if the operation was successful
 *         data:
 *           $ref: '#/components/schemas/Lead'
 *       example:
 *         success: true
 *         data:
 *           id: "64a6c8b9d9f1e723f17c2c3b"
 *           name: "John Doe"
 *           text: "Interested in your services"
 *           phone: "+123456789"
 *           email: "johndoe@example.com"
 *           status: "new"
 *           isActive: true
 *           createdAt: "2023-08-28T14:48:00.000Z"
 *           updatedAt: "2023-08-28T14:48:00.000Z"
 * 
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /leads/:
 *   post:
 *     summary: Create a new lead
 *     tags: [Leads]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Lead'
 *     responses:
 *       201:
 *         description: Lead created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LeadResponse'
 *       400:
 *         description: Invalid input, object invalid
 *       500:
 *         description: Server error
 */
router.post('/', leadController.createLead);

/**
 * @swagger
 * /leads/:
 *   get:
 *     summary: Get all leads
 *     tags: [Leads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: ['new', 'called', 'rejected', 'interested']
 *         description: Filter leads by status
 *       - name: isActive
 *         in: query
 *         schema:
 *           type: boolean
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *           default: 10
 *       - name: search
 *         in: query
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of leads
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LeadResponse'
 *       500:
 *         description: Server error
 */
router.get('/', authMiddleware, isAdminMiddleware, leadController.getLeads);

/**
 * @swagger
 * /leads/{id}:
 *   get:
 *    summary: Get a single lead by ID
 *    tags: [Leads]
 *    security:
 *       - bearerAuth: []
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the lead to retrieve
 *    responses:
 *       200:
 *         description: Lead details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LeadResponse'
 *       404:
 *         description: Lead not found
 *       500:
 *         description: Server error
 */
router.get('/:id', authMiddleware, isAdminMiddleware, leadController.getSingleLead);

/**
 * @swagger
 * /leads/{id}:
 *   put:
 *     summary: Update a lead by ID
 *     tags: [Leads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the lead to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Lead'
 *     responses:
 *       200:
 *         description: Lead updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LeadResponse'
 *       400:
 *         description: Invalid input, object invalid
 *       404:
 *         description: Lead not found
 *       500:
 *         description: Server error
 */
router.put('/:id', authMiddleware, isAdminMiddleware, leadController.updateLead);

/**
 * @swagger
 * /leads/status/{id}:
 *   put:
 *     summary: Update status lead
 *     tags: [Leads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the lead to update
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: ['new', 'called', 'rejected', 'interested']
 *         description: Filter leads by status
 *     responses:
 *       200:
 *         description: A list of leads
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LeadResponse'
 *       500:
 *         description: Server error
 */
router.put('/status/:id', authMiddleware, isAdminMiddleware, leadController.updateStatusLead);

/**
 * @swagger
 * /leads/{id}:
 *   delete:
 *     summary: Delete a lead by ID
 *     tags: [Leads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the lead to delete
 *     responses:
 *       200:
 *         description: Lead deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LeadResponse'
 *       404:
 *         description: Lead not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', authMiddleware, isAdminMiddleware, leadController.deleteLead);

module.exports = router;
