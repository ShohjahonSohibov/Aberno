const express = require("express");
const authRoutes = require("./authRoutes");
const filterRoutes = require("./filterRoutes");
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

// const { uploadvideo } = require("../controllers/video.controller");
// const upload = require("../middlewares/uploadVideoConfig");
// const { authenticateToken } = require("../middlewares/auth.middleware");

const router = express.Router();

router.use('/auth', authRoutes);
// router.use('/filters', filterRoutes);
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

// router.use(
//   "/videos",
//   authenticateToken,
//   checkRole(["admin", "mentor", "teacher"]),
//   upload.single("video"),
//   uploadvideo
// );

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Videos
 *   description: API for uploading videos
 */

/**
 * @swagger
 * /videos:
 *   post:
 *     summary: Upload a video
 *     tags: [Videos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               video:
 *                 type: string
 *                 format: binary
 *                 description: The video file to upload
 *     responses:
 *       200:
 *         description: Video uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the video was uploaded successfully
 *                 message:
 *                   type: string
 *                   description: A message confirming the upload
 *                 videoUrl:
 *                   type: string
 *                   description: The URL of the uploaded video
 *       400:
 *         description: Bad request. Invalid input.
 *       401:
 *         description: Unauthorized. Token is missing or invalid.
 *       403:
 *         description: Forbidden. You do not have permission to upload videos.
 *       500:
 *         description: Internal server error.
 */
