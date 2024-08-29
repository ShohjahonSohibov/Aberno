const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdminMiddleware = require('../middlewares/isAdminMiddleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     Client:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier of the client
 *         nameUz:
 *           type: string
 *           description: The name of the client in Uzbek
 *         nameRu:
 *           type: string
 *           description: The name of the client in Russian
 *         nameEn:
 *           type: string
 *           description: The name of the client in English
 *         image:
 *           type: string
 *           description: URL to the client's image
 *         isActive:
 *           type: boolean
 *           description: Indicates if the client is active
 *       example:
 *         id: "64a6c8b9d9f1e723f17c2c3b"
 *         nameUz: "Mijoz Nomi"
 *         nameRu: "Имя Клиента"
 *         nameEn: "Client Name"
 *         image: "https://example.com/image.png"
 *         isActive: true
 * 
 *     ClientResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates if the operation was successful
 *         data:
 *           $ref: '#/components/schemas/Client'
 *       example:
 *         success: true
 *         data:
 *           id: "64a6c8b9d9f1e723f17c2c3b"
 *           nameUz: "Mijoz Nomi"
 *           nameRu: "Имя Клиента"
 *           nameEn: "Client Name"
 *           image: "https://example.com/image.png"
 *           isActive: true
 * 
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /clients/:
 *   post:
 *     summary: Create a new client
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Client'
 *     responses:
 *       201:
 *         description: Client created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClientResponse'
 *       400:
 *         description: Invalid input, object invalid
 *       500:
 *         description: Server error
 */
router.post('/', authMiddleware, isAdminMiddleware, clientController.createClient);

/**
 * @swagger
 * /clients/:
 *   get:
 *     summary: Get all clients
 *     tags: [Clients]
 *     security: []
 *     parameters:
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: Filter clients by active status
 *     responses:
 *       200:
 *         description: A list of clients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ClientResponse'
 *       500:
 *         description: Server error
 */
router.get('/', clientController.getClients);

/**
 * @swagger
 * /clients/{id}:
 *   get:
 *     summary: Get a single client by ID
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the client to retrieve
 *     responses:
 *       200:
 *         description: Client details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClientResponse'
 *       404:
 *         description: Client not found
 *       500:
 *         description: Server error
 */
router.get('/:id', authMiddleware, isAdminMiddleware, clientController.getSingleClient);

/**
 * @swagger
 * /clients/{id}:
 *   put:
 *     summary: Update a client by ID
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the client to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Client'
 *     responses:
 *       200:
 *         description: Client updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClientResponse'
 *       400:
 *         description: Invalid input, object invalid
 *       404:
 *         description: Client not found
 *       500:
 *         description: Server error
 */
router.put('/:id', authMiddleware, isAdminMiddleware, clientController.updateClient);

/**
 * @swagger
 * /clients/{id}:
 *   delete:
 *     summary: Delete a client by ID
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the client to delete
 *     responses:
 *       200:
 *         description: Client deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClientResponse'
 *       404:
 *         description: Client not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', authMiddleware, isAdminMiddleware, clientController.deleteClient);

module.exports = router;
