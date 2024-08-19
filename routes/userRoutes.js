const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdminMiddleware = require('../middlewares/isAdminMiddleware');

//  User
router.get('/:id', authMiddleware, userController.getUserProfile);
router.put('/:id', authMiddleware, userController.updateUserProfile);
router.delete('/:id', authMiddleware, userController.deleteUser);

// Admin
router.post('/admin', userController.createAdmin);
router.get('/admin/:id', authMiddleware, isAdminMiddleware, userController.getAdminProfile);
router.put('/admin/:id', authMiddleware, isAdminMiddleware, userController.updateAdminProfile);
router.delete('/admin/:id', authMiddleware, isAdminMiddleware, userController.deleteAdmin);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The unique ID of the user
 *         username:
 *           type: string
 *           description: The username of the user
 *         fullname:
 *           type: string
 *           description: The full name of the user
 *         phone:
 *           type: string
 *           description: The phone number of the user
 *         email:
 *           type: string
 *           description: The email address of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         profilePicture:
 *           type: string
 *           description: URL of the user's profile picture
 *         refreshToken:
 *           type: string
 *           description: The refresh token for the user
 *         lastVisit:
 *           type: string
 *           description: The last visit date of the user
 *       example:
 *         id: "64a6c8b9d9f1e723f17c2c3b"
 *         username: "johndoe"
 *         fullname: "John Doe"
 *         phone: "+1234567890"
 *         email: "john.doe@example.com"
 *         password: "password123"
 *         profilePicture: "http://example.com/profile.jpg"
 *         refreshToken: "some-refresh-token"
 *         lastVisit: "2024-08-19T13:00:00Z"
 * 
 * paths:
 *   /users/{id}:
 *     get:
 *       summary: Get user profile
 *       tags:
 *         - User
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Successful response
 *         '401':
 *           description: Unauthorized
 *         '404':
 *           description: User not found
 *     put:
 *       summary: Update user profile
 *       tags:
 *         - User
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 fullname:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *       responses:
 *         '200':
 *           description: Profile updated successfully
 *         '401':
 *           description: Unauthorized
 *         '404':
 *           description: User not found
 *     delete:
 *       summary: Delete user
 *       tags:
 *         - User
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: User deleted successfully
 *         '401':
 *           description: Unauthorized
 *         '404':
 *           description: User not found
 *   /users/admin/{id}:
 *     get:
 *       summary: Get admin profile
 *       tags:
 *         - Admin
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Successful response
 *         '401':
 *           description: Unauthorized
 *         '403':
 *           description: Forbidden
 *         '404':
 *           description: Admin not found
 *     put:
 *       summary: Update admin profile
 *       tags:
 *         - Admin
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 fullname:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *       responses:
 *         '200':
 *           description: Profile updated successfully
 *         '401':
 *           description: Unauthorized
 *         '403':
 *           description: Forbidden
 *         '404':
 *           description: Admin not found
 *     delete:
 *       summary: Delete admin
 *       tags:
 *         - Admin
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Admin deleted successfully
 *         '401':
 *           description: Unauthorized
 *         '403':
 *           description: Forbidden
 *         '404':
 *           description: Admin not found
 *   /users/admin:
 *     post:
 *       summary: Create admin
 *       security: []
 *       tags:
 *         - Admin
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 fullname:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *                 type:
 *                   type: string
 *       responses:
 *         '201':
 *           description: Admin created successfully
 *         '401':
 *           description: Unauthorized
 *         '403':
 *           description: Forbidden
 */