import {
    getProducts,
    getOneProduct,
    deleteProduct,
    createProduct,
    updateProduct,
} from '../controller/product.controller'
import { Router } from 'express'
import { body } from 'express-validator'
import { handleInputErrors } from '../middleware/validators'

const router = Router()

router.get('/', getProducts)
router.get('/:id', getOneProduct)
router.put(
    '/:id',
    body('name', 'Must be a valid string property').isString(),
    handleInputErrors,
    updateProduct
)
router.delete('/:id', deleteProduct)
router.post(
    '/',
    body('name', 'Must be a valid string property').isString(),
    handleInputErrors,
    createProduct
)

export default router
