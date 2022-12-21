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

const router = Router()

router.get('/', getOrders)
router.get('/:id', getOneOrder)
router.put(
    '/:id',
    body('area').exists().isString(),
    body('deliverDate').exists().isDate(),
    body('unitPrice').exists().isFloat(),
    body('quantity').exists().isNumeric(),
    body('status').isIn(['URGENT', 'ATTENTION', 'FINE']),
    handleInputErrors,
    updateOrder
)
router.post(
    '/',
    body('area', 'Must be a valid string property').exists().isString(),
    body('deliverDate', 'Must be a valid date property').exists().isDate(),
    body('unitPrice', 'Must be a valid float property').exists().isFloat(),
    body('quantity', 'Must be a valid number property').exists().isNumeric(),
    body('status', 'Should be one of ["URGENT", "ATTENTION", "FINE"]')
        .isIn(['URGENT', 'ATTENTION', 'FINE'])
        .optional(),
    body('userId', 'Should be a valid string property').optional().isString(),
    handleInputErrors,
    createOrder
)
router.delete('/:id', deleteOrder)

export default router
