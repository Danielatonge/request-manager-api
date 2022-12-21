import {Router} from 'express';
import {body, validationResult} from 'express-validator'
import { handleInputErrors } from '../middleware/validators';
import { getOrders, getOneOrder, orderOrder, createOrder, deleteOrder } from '../controller/order.controller';

const router = Router()

router.get('/order', getOrders)
router.get('/order/:id', getOneOrder)
router.put('/order/:id',
    body('title').optional(),
    body('body').optional(),
    body('status').isIn(['IN_PROGRESS', 'SHIPPED', "DEPRECATED"]).optional(),
    body('version').optional(),
    orderOrder)
router.post('/order', 
    body('title').exists().isString(),
    body('body').exists().isString(),
    body('productId').exists().isString(),
    createOrder)
router.delete('/order/:id', deleteOrder)


export default router