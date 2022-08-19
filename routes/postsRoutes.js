import express from 'express'
const router = express.Router()
import {getAllPosts, createPost, updatePost, deletePost, getPostsByUser} from '../controllers/postController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').get(getAllPosts).post(protect, createPost)
router.route('/:id').delete(protect, deletePost).put(protect, updatePost)
router.get("/user-posts/:nickname", getPostsByUser);

export default router






