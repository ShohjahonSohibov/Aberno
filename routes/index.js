const express = require("express");

const authMiddleware = require('../middlewares/authMiddleware');
const isAdminMiddleware = require('../middlewares/isAdminMiddleware');
const upload = require('../middlewares/uploadImageConfig');

const authRoutes = require("./authRoutes");
const brandRoutes = require("./brandRoutes");
const categoryRoutes = require("./categoryRoutes");
const productRoutes = require("./productRoutes");
const tagRoutes = require("./tagRoutes");
const userRoutes = require("./userRoutes");
const commentRoutes = require("./commentRoutes");
const notificationRoutes = require("./notificationRoutes");
const postRoutes = require("./postRoutes");
const postCategoryRoutes = require("./postCategoryRoutes");
const testimonialRoutes = require("./testimonialRoutes");

const uploadController= require("../controllers/uploadController");

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/brands', brandRoutes);
router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/tags', tagRoutes);
router.use('/users', userRoutes);
router.use('/comments', commentRoutes);
router.use('/notifications', notificationRoutes);
router.use('/posts', postRoutes);
router.use('/post-categories', postCategoryRoutes);
router.use('/testimonials', testimonialRoutes);

router.post("/image", authMiddleware, isAdminMiddleware, upload.single("image"), uploadController.uploadImage);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Image
 *   description: API for uploading images
 */

/**
 * @swagger
 * /image:
 *   post:
 *     summary: Upload a image
 *     tags: [Image]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image file to upload
 *     responses:
 *       200:
 *         description: image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the image was uploaded successfully
 *                 message:
 *                   type: string
 *                   description: A message confirming the upload
 *                 imageUrl:
 *                   type: string
 *                   description: The URL of the uploaded image
 *       400:
 *         description: Bad request. Invalid input.
 *       401:
 *         description: Unauthorized. Token is missing or invalid.
 *       403:
 *         description: Forbidden. You do not have permission to upload images.
 *       500:
 *         description: Internal server error.
 */
