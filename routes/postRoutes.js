const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdminMiddleware = require('../middlewares/isAdminMiddleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - author
 *       properties:
 *         id:
 *           type: string
 *           description: The unique ID of the post
 *         title:
 *           type: string
 *           description: The title of the post
 *         content:
 *           type: string
 *           description: The content of the post
 *         author:
 *           type: array
 *           items:
 *             type: string
 *           description: List of authors' IDs
 *         category:
 *           type: array
 *           items:
 *             type: string
 *           description: List of category IDs
 *         brand:
 *           type: array
 *           items:
 *             type: string
 *           description: List of brand IDs
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: List of tag IDs
 *         comments:
 *           type: array
 *           items:
 *             type: string
 *           description: List of comment IDs
 *         publishedAt:
 *           type: string
 *           format: string
 *           description: The date and time the post was published
 *         scheduledAt:
 *           type: string
 *           format: string
 *           description: The date and time the post is scheduled for
 *         status:
 *           type: string
 *           enum: [draft, published, scheduled]
 *           description: The status of the post
 *         isActive:
 *           type: boolean
 *           description: Status indicating if the post is active
 *       example:
 *         id: "64a6c8b9d9f1e723f17c2c3b"
 *         title: "My First Post"
 *         content: "This is the content of the post."
 *         author: ["64a6c8b9d9f1e723f17c2c3c"]
 *         category: ["64a6c8b9d9f1e723f17c2c3d"]
 *         brand: ["64a6c8b9d9f1e723f17c2c3e"]
 *         tags: ["64a6c8b9d9f1e723f17c2c3f"]
 *         comments: ["64a6c8b9d9f1e723f17c2c3g"]
 *         publishedAt: "2024-08-16T00:00:00Z"
 *         scheduledAt: "2024-08-17T00:00:00Z"
 *         status: "draft"
 *         isActive: true
 * 
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       201:
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Invalid input, object invalid
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/', authMiddleware, isAdminMiddleware, postController.createPost);

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all posts with optional filters
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: Filter by active status
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *         description: Filter by author IDs, comma-separated
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category IDs, comma-separated
 *       - in: query
 *         name: tag
 *         schema:
 *           type: string
 *         description: Filter by tag IDs, comma-separated
 *       - in: query
 *         name: brand
 *         schema:
 *           type: string
 *         description: Filter by brand IDs, comma-separated
 *       - in: query
 *         name: publishedStartTime
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Filter by start date of publication
 *       - in: query
 *         name: publishedEndTime
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Filter by end date of publication
 *       - in: query
 *         name: scheduledStartTime
 *         schema:
 *           type: string
 *           format: string
 *         description: Filter by start date of scheduling
 *       - in: query
 *         name: scheduledEndTime
 *         schema:
 *           type: string
 *           format: string
 *         description: Filter by end date of scheduling
 *     responses:
 *       200:
 *         description: A list of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       500:
 *         description: Server error
 */
router.get('/', postController.getAllPosts);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Get a single post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the post to retrieve
 *     responses:
 *       200:
 *         description: Post details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */
router.get('/:id', postController.getPostById);

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Update a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the post to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: Post updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Invalid input, object invalid
 *       404:
 *         description: Post not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.put('/:id', authMiddleware, isAdminMiddleware, postController.updatePost);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Delete a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the post to delete
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       404:
 *         description: Post not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.delete('/:id', authMiddleware, isAdminMiddleware, postController.deletePost);

module.exports = router;
