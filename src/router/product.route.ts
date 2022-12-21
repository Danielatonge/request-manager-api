import { getProducts, getOneProduct, deleteProduct, createProduct, updateProduct } from '../controller/product.controller';
import {Router} from 'express';
import {body, validationResult} from 'express-validator'
import { handleInputErrors } from '../middleware/validators';

const router = Router()

router.get('/product', getProducts)
router.get('/product/:id', getOneProduct)
router.put('/product/:id', body("name").isString(), handleInputErrors, updateProduct)
router.delete('/product/:id', deleteProduct)
router.post('/product', body("name").isString(), handleInputErrors, createProduct)

export default router