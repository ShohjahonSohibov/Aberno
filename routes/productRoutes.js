const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdminMiddleware = require('../middlewares/isAdminMiddleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         titleUz:
 *           type: string
 *         titleRu:
 *           type: string
 *         titleEn:
 *           type: string
 *         short_descriptionUz:
 *           type: string
 *         short_descriptionRu:
 *           type: string
 *         short_descriptionEn:
 *           type: string
 *         descriptionUz:
 *           type: string
 *         descriptionRu:
 *           type: string
 *         descriptionEn:
 *           type: string
 *         image:
 *           type: string
 *         category:
 *           type: string
 *           format: ObjectId
 *         isActive:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         _id: "607c191e810c19729de860ea"
 *         titleUz: "Yangi Mahsulot"
 *         titleRu: "Новый продукт"
 *         titleEn: "New Product"
 *         short_descriptionUz: "Mahsulotning qisqacha tavsifi."
 *         short_descriptionRu: "Краткое описание продукта."
 *         short_descriptionEn: "A short description of the product."
 *         descriptionUz: "Mahsulotning batafsil tavsifi."
 *         descriptionRu: "Подробное описание продукта."
 *         descriptionEn: "A detailed description of the product."
 *         image: "https://example.com/main-image.jpg"
 *         category: "607c191e810c19729de860ea"
 *         isActive: true
 *         createdAt: "2023-08-20T14:38:00.000Z"
 *         updatedAt: "2023-08-20T14:38:00.000Z"
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API for managing products
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Error creating product
 */
router.post('/', authMiddleware, isAdminMiddleware, productController.createProduct);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     parameters:
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
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Error fetching products
 */
router.get('/', productController.getProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a single product by ID
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Error fetching product
 */
router.get('/:id', productController.getProductById);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Error updating product
 */
router.put('/:id', authMiddleware, isAdminMiddleware, productController.updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product deleted successfully"
 *       404:
 *         description: Product not found
 *       500:
 *         description: Error deleting product
 */
router.delete('/:id', authMiddleware, isAdminMiddleware, productController.deleteProduct);

module.exports = router;
