import express  from 'express'
import { addCategory, deleteCategory, getAllCategroies, getCategory, updateCategory } from '../controllers/categoryController.js'

const router= express.Router()

router.route('/').get(getAllCategroies).post(addCategory)
router.route('/:id').get(getCategory).delete(deleteCategory).patch(updateCategory)

export default router