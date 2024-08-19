const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdminMiddleware = require('../middlewares/isAdminMiddleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     Testimonial:
 *       type: object
 *       required:
 *         - fullname
 *         - title
 *         - content
 *         - isActive
 *       properties:
 *         id:
 *           type: string
 *           description: The unique ID of the testimonial
 *         fullname:
 *           type: string
 *           description: The name of the person giving the testimonial
 *         title:
 *           type: string
 *           description: The title of the testimonial
 *         content:
 *           type: string
 *           description: The content of the testimonial
 *         image:
 *           type: string
 *           description: URL of the testimonial image
 *         isActive:
 *           type: boolean
 *           description: Status indicating if the testimonial is active
 *       example:
 *         id: "64a6c8b9d9f1e723f17c2c3b"
 *         fullname: "John Doe"
 *         title: "Excellent Service"
 *         content: "The service was outstanding and exceeded my expectations."
 *         image: "http://example.com/image.jpg"
 *         isActive: true
 * 
 *     TestimonialResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates if the operation was successful
 *         data:
 *           $ref: '#/components/schemas/Testimonial'
 *       example:
 *         success: true
 *         data:
 *           id: "64a6c8b9d9f1e723f17c2c3b"
 *           fullname: "John Doe"
 *           title: "Excellent Service"
 *           content: "The service was outstanding and exceeded my expectations."
 *           image: "http://example.com/image.jpg"
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
 * /testimonials:
 *   post:
 *     summary: Create a new testimonial
 *     tags: [Testimonials]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Testimonial'
 *     responses:
 *       201:
 *         description: Testimonial created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TestimonialResponse'
 *       400:
 *         description: Invalid input, object invalid
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/', authMiddleware, isAdminMiddleware, testimonialController.createTestimonial);

/**
 * @swagger
 * /testimonials:
 *   get:
 *     summary: Get all testimonials
 *     tags: [Testimonials]
 *     parameters:
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: Filter testimonials by active status
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of testimonials per page
 *       - in: query
 *         name: sortRate
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: asc
 *         description: Sort testimonials by rate
 *       - in: query
 *         name: sortByCreatedAt
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Sort testimonials by creation date
 *     responses:
 *       200:
 *         description: A list of testimonials
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Testimonial'
 *       500:
 *         description: Server error
 */
router.get('/', testimonialController.getTestimonials);

/**
 * @swagger
 * /testimonials/{id}:
 *   get:
 *     summary: Get a single testimonial
 *     tags: [Testimonials]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the testimonial to retrieve
 *     responses:
 *       200:
 *         description: Testimonial details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TestimonialResponse'
 *       404:
 *         description: Testimonial not found
 *       500:
 *         description: Server error
 */
router.get('/:id', testimonialController.getSingleTestimonial);

/**
 * @swagger
 * /testimonials/{id}:
 *   put:
 *     summary: Update a testimonial
 *     tags: [Testimonials]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the testimonial to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Testimonial'
 *     responses:
 *       200:
 *         description: Testimonial updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TestimonialResponse'
 *       400:
 *         description: Invalid input, object invalid
 *       404:
 *         description: Testimonial not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.put('/:id', authMiddleware, isAdminMiddleware, testimonialController.updateTestimonial);

/**
 * @swagger
 * /testimonials/{id}:
 *   delete:
 *     summary: Delete a testimonial
 *     tags: [Testimonials]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the testimonial to delete
 *     responses:
 *       200:
 *         description: Testimonial deleted successfully
 *       404:
 *         description: Testimonial not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.delete('/:id', authMiddleware, isAdminMiddleware, testimonialController.deleteTestimonial);

module.exports = router;
