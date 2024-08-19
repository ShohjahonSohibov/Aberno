const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdminMiddleware = require('../middlewares/isAdminMiddleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier of the category
 *         name:
 *           type: string
 *           description: The name of the category
 *       example:
 *         id: "64a6c8b9d9f1e723f17c2c3c"
 *         name: "Electronics"
 *
 *     Brand:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier of the brand
 *         name:
 *           type: string
 *           description: The name of the brand
 *         category:
 *           $ref: '#/components/schemas/Category'
 *         isActive:
 *           type: boolean
 *           description: Indicates if the brand is active
 *       example:
 *         id: "64a6c8b9d9f1e723f17c2c3b"
 *         name: "Brand Name"
 *         category:
 *           id: "64a6c8b9d9f1e723f17c2c3c"
 *           name: "Electronics"
 *         isActive: true
 * 
 *     BrandResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates if the operation was successful
 *         data:
 *           $ref: '#/components/schemas/Brand'
 *       example:
 *         success: true
 *         data:
 *           id: "64a6c8b9d9f1e723f17c2c3b"
 *           name: "Brand Name"
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
 * /brands/:
 *   post:
 *     summary: Create a new brand
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Brand'
 *     responses:
 *       201:
 *         description: Brand created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BrandResponse'
 *       400:
 *         description: Invalid input, object invalid
 *       500:
 *         description: Server error
 */
router.post('/', authMiddleware, isAdminMiddleware, brandController.createBrand);

/**
 * @swagger
 * /brands/:
 *   get:
 *     summary: Get all brands
 *     tags: [Brands]
 *     security: []
 *     parameters:
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: Filter brands by active status
 *     responses:
 *       200:
 *         description: A list of brands
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BrandResponse'
 *       500:
 *         description: Server error
 */
router.get('/', brandController.getBrands);

/**
 * @swagger
 * /brands/filter:
 *   get:
 *     summary: Get all brands
 *     tags: [Brands]
 *     security: []
 *     responses:
 *       200:
 *         description: A list of brands
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BrandResponse'
 *       500:
 *         description: Server error
 */
router.get('/filter', brandController.getFilterBrands);


/**
 * @swagger
 * /brands/{id}:
 *   get:
 *     summary: Get a single brand by ID
 *     tags: [Brands]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the brand to retrieve
 *     responses:
 *       200:
 *         description: Brand details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BrandResponse'
 *       404:
 *         description: Brand not found
 *       500:
 *         description: Server error
 */
router.get('/:id', brandController.getSingleBrand);

/**
 * @swagger
 * /brands/{id}:
 *   put:
 *     summary: Update a brand by ID
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the brand to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Brand'
 *     responses:
 *       200:
 *         description: Brand updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BrandResponse'
 *       400:
 *         description: Invalid input, object invalid
 *       404:
 *         description: Brand not found
 *       500:
 *         description: Server error
 */
router.put('/:id', authMiddleware, isAdminMiddleware, brandController.updateBrand);

/**
 * @swagger
 * /brands/{id}:
 *   delete:
 *     summary: Delete a brand by ID
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the brand to delete
 *     responses:
 *       200:
 *         description: Brand deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BrandResponse'
 *       404:
 *         description: Brand not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', authMiddleware, isAdminMiddleware, brandController.deleteBrand);

module.exports = router;
