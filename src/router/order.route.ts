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
import { asyncWrapper } from '../utils/error'

const router = Router()

router.get('/', validateRequest(getAllOrderSchema), asyncWrapper(getOrders))
router.get(
    '/:id',
    validateRequest(getOneOrderSchema),
    asyncWrapper(getOneOrder)
)
router.put(
    '/:id',
    validateRequest(updateOrderSchema),
    asyncWrapper(updateOrder)
)
router.post('/', validateRequest(createOrderSchema), asyncWrapper(createOrder))
router.delete(
    '/:id',
    validateRequest(deleteOrderSchema),
    asyncWrapper(deleteOrder)
)

export default router
