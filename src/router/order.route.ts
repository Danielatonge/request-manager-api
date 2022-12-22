import { Router } from 'express'
import { body, validationResult } from 'express-validator'
import { handleInputErrors } from '../middleware/validators'
import {
    getOrders,
    getOneOrder,
    updateOrder,
    createOrder,
    deleteOrder,
} from '../controller/order.controller'

import {
    createOrderSchema,
    updateOrderSchema,
    deleteOrderSchema,
    getOneOrderSchema,
    getAllOrderSchema,
} from '../schema/order.schema'

import { validateRequest } from '../middleware/validators'

const router = Router()

router.get('/', validateRequest(getAllOrderSchema), getOrders)
router.get('/:id', validateRequest(getOneOrderSchema), getOneOrder)
router.put('/:id', validateRequest(updateOrderSchema), updateOrder)
router.post('/', validateRequest(createOrderSchema), createOrder)
router.delete('/:id', validateRequest(deleteOrderSchema), deleteOrder)

export default router
