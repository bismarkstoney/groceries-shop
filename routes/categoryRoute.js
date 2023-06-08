import express  from 'express'
import { addCategory, deleteCategory, getAllCategroies, getCategory, updateCategory } from '../controllers/categoryController.js'
import upload from '../middleware/multer.js'

const router= express.Router()


router.route('/').get(getAllCategroies).post(upload.single('image'), addCategory)
router.route('/:id').get(getCategory).delete(deleteCategory).patch(updateCategory)

export default router