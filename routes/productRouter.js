import express  from 'express'
import { addProduct, deleteProduct, getAllProduct, getProduct, updateProduct } from '../controllers/productController.js'
import upload from '../middleware/multer.js'
const router= express.Router()

router.route('/').get(getAllProduct).post(upload.single('coverImage'), addProduct)
router.route('/:id').get(getProduct).delete(deleteProduct).patch(updateProduct)

export default router