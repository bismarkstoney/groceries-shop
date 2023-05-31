import express  from 'express'
import { addProduct, deleteProduct, getAllProduct, getProduct, updateProduct } from '../controllers/productController.js'
const router= express.Router()

router.route('/').get(getAllProduct).post(addProduct)
router.route('/:id').get(getProduct).delete(deleteProduct).patch(updateProduct)

export default router