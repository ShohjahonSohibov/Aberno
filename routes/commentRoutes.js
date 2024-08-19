const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - content
 *         - author
 *         - post
 *       properties:
 *         id:
 *           type: string
 *           description: The unique ID of the comment
 *         content:
 *           type: string
 *           description: The content of the comment
 *         rate:
 *           type: number
 *           description: Rating given in the comment
 *         isActive:
 *           type: boolean
 *           description: Status indicating if the comment is active
 *         author:
 *           type: string
 *           description: The ID of the user who authored the comment
 *         post:
 *           type: string
 *           description: The ID of the post the comment is associated with
 *         product:
 *           type: string
 *           description: The ID of the product the comment is associated with
 *       example:
 *         id: "64a6c8b9d9f1e723f17c2c3b"
 *         content: "Great post!"
 *         rate: 5
 *         isActive: true
 *         author: "64a6c8b9d9f1e723f17c2c3c"
 *         post: "64a6c8b9d9f1e723f17c2c3d"
 *         product: "64a6c8b9d9f1e723f17c2c3d"
 * 
 *     CommentResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates if the operation was successful
 *         data:
 *           $ref: '#/components/schemas/Comment'
 *       example:
 *         success: true
 *         data:
 *           id: "64a6c8b9d9f1e723f17c2c3b"
 *           content: "Great post!"
 *           rate: 5
 *           isActive: true
 *           author: "64a6c8b9d9f1e723f17c2c3c"
 *           post: "64a6c8b9d9f1e723f17c2c3d"
 *           product: "64a6c8b9d9f1e723f17c2c3d"
 * 
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /comments/:
 *   post:
 *     summary: Add a comment to a post
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       201:
 *         description: Comment added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommentResponse'
 *       400:
 *         description: Invalid input, object invalid
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/', authMiddleware, commentController.addComment);

/**
 * @swagger
 * /comments/:
 *   get:
 *     summary: Get comments for a post
 *     tags: [Comments]
 *     security: []
 *     parameters:
 *       - in: query
 *         name: postId
 *         schema:
 *           type: string
 *         description: The ID of the post to add the comment to
 *       - in: query
 *         name: productId
 *         schema:
 *           type: string
 *         description: The ID of the post to add the comment to
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: The status of the comment
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
 *     responses:
 *       200:
 *         description: A list of comments for the post
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */
router.get('/', commentController.getComments);

/**
 * @swagger
 * /comments/{id}:
 *   get:
 *     summary: Get a single comment
 *     tags: [Comments]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the comment to retrieve
 *     responses:
 *       200:
 *         description: Comment details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommentResponse'
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Server error
 */
router.get('/:id', commentController.getSingleComment);

/**
 * @swagger
 * /comments/{id}:
 *   put:
 *     summary: Update a comment
 *     tags: [Comments]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the comment to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommentResponse'
 *       400:
 *         description: Invalid input, object invalid
 *       404:
 *         description: Comment not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.put('/:id', authMiddleware, commentController.updateComment);

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the comment to delete
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommentResponse'
 *       404:
 *         description: Comment not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.delete('/:id', authMiddleware, commentController.deleteComment);

module.exports = router;
