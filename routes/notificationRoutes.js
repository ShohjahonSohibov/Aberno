const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdminMiddleware = require('../middlewares/isAdminMiddleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       required:
 *         - message
 *         - sender
 *       properties:
 *         id:
 *           type: string
 *           description: The unique ID of the notification
 *         message:
 *           type: string
 *           description: The content of the notification
 *         sender:
 *           type: string
 *           description: The ID of the sender (Admin) of the notification
 *       example:
 *         id: "64a6c8b9d9f1e723f17c2c3b"
 *         message: "Notification message"
 *         sender: "64a6c8b9d9f1e723f17c2c3b"
 * 
 *     NotificationResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates if the operation was successful
 *         data:
 *           $ref: '#/components/schemas/Notification'
 *       example:
 *         success: true
 *         data:
 *           id: "64a6c8b9d9f1e723f17c2c3b"
 *           message: "Notification message"
 *           sender: "64a6c8b9d9f1e723f17c2c3b"
 * 
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /notifications:
 *   post:
 *     summary: Create a new notification
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Notification'
 *     responses:
 *       201:
 *         description: Notification created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotificationResponse'
 *       400:
 *         description: Invalid input, object invalid
 *       500:
 *         description: Server error
 */
router.post('/notifications', authMiddleware, isAdminMiddleware, notificationController.createNotification);

/**
 * @swagger
 * /notifications:
 *   get:
 *     summary: Get all notifications
 *     tags: [Notifications]
 *     responses:
 *       200:
 *         description: A list of notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/NotificationResponse'
 *       500:
 *         description: Server error
 */
router.get('/notifications', authMiddleware, isAdminMiddleware, notificationController.getNotifications);

/**
 * @swagger
 * /notifications/{id}:
 *   get:
 *     summary: Get a single notification by ID
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the notification to retrieve
 *     responses:
 *       200:
 *         description: Notification details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotificationResponse'
 *       404:
 *         description: Notification not found
 *       500:
 *         description: Server error
 */
router.get('/notifications/:id', authMiddleware, isAdminMiddleware, notificationController.getSingleNotification);

/**
 * @swagger
 * /notifications/{id}:
 *   put:
 *     summary: Update a notification by ID
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the notification to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Notification'
 *     responses:
 *       200:
 *         description: Notification updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotificationResponse'
 *       400:
 *         description: Invalid input, object invalid
 *       404:
 *         description: Notification not found
 *       500:
 *         description: Server error
 */
router.put('/notifications/:id', authMiddleware, isAdminMiddleware, notificationController.updateNotification);

/**
 * @swagger
 * /notifications/{id}:
 *   delete:
 *     summary: Delete a notification by ID
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the notification to delete
 *     responses:
 *       200:
 *         description: Notification deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotificationResponse'
 *       404:
 *         description: Notification not found
 *       500:
 *         description: Server error
 */
router.delete('/notifications/:id', authMiddleware, isAdminMiddleware, notificationController.deleteNotification);

module.exports = router;
