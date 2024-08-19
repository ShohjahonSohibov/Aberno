const express = require('express');
const router = express.Router();
const postCategoryController = require('../controllers/postCategoryController');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdminMiddleware = require('../middlewares/isAdminMiddleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     PostCategory:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: The unique ID of the post category
 *         nameUz:
 *           type: string
 *           description: The name of the brand in Uzbek
 *         nameRu:
 *           type: string
 *           description: The name of the brand in Russian
 *         nameEn:
 *           type: string
 *           description: The name of the brand in English
 *         isActive:
 *           type: boolean
 *           description: Status indicating if the post category is active
 *       example:
 *         id: "64a6c8b9d9f1e723f17c2c3b"
 *         name: "Category Name"
 *         isActive: true
 * 
 *     PostCategoryResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates if the operation was successful
 *         data:
 *           $ref: '#/components/schemas/PostCategory'
 *       example:
 *         success: true
 *         data:
 *           id: "64a6c8b9d9f1e723f17c2c3b"
 *           name: "Category Name"
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
 * /post-categories/:
 *   post:
 *     summary: Create a new post category
 *     tags: [PostCategories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostCategory'
 *     responses:
 *       201:
 *         description: Post category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostCategoryResponse'
 *       400:
 *         description: Invalid input, object invalid
 *       500:
 *         description: Server error
 */
router.post('/', authMiddleware, isAdminMiddleware, postCategoryController.createPostCategory);

/**
 * @swagger
 * /post-categories/:
 *   get:
 *     summary: Get all post categories
 *     tags: [PostCategories]
 *     security: []
 *     parameters:
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: Filter brands by active status
 *     responses:
 *       200:
 *         description: A list of post categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PostCategoryResponse'
 *       500:
 *         description: Server error
 */
router.get('/', postCategoryController.getPostCategories);

/**
 * @swagger
 * /post-categories/{id}:
 *   get:
 *     summary: Get a single post category by ID
 *     tags: [PostCategories]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the post category to retrieve
 *     responses:
 *       200:
 *         description: Post category details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostCategoryResponse'
 *       404:
 *         description: Post category not found
 *       500:
 *         description: Server error
 */
router.get('/:id', postCategoryController.getSinglePostCategory);

/**
 * @swagger
 * /post-categories/{id}:
 *   put:
 *     summary: Update a post category by ID
 *     tags: [PostCategories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the post category to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostCategory'
 *     responses:
 *       200:
 *         description: Post category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostCategoryResponse'
 *       400:
 *         description: Invalid input, object invalid
 *       404:
 *         description: Post category not found
 *       500:
 *         description: Server error
 */
router.put('/:id', authMiddleware, isAdminMiddleware, postCategoryController.updatePostCategory);

/**
 * @swagger
 * /post-categories/{id}:
 *   delete:
 *     summary: Delete a post category by ID
 *     tags: [PostCategories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the post category to delete
 *     responses:
 *       200:
 *         description: Post category deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostCategoryResponse'
 *       404:
 *         description: Post category not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', authMiddleware, isAdminMiddleware, postCategoryController.deletePostCategory);

module.exports = router;
