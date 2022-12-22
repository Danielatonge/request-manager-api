import { object, number, string, TypeOf, date, nativeEnum } from 'zod'

enum ORDER_STATUS {
    URGENT = 'URGENT',
    ATTENTION = 'ATTENTION',
    FINE = 'FINE',
}
const createInvalidTypeError = (prop: string, type: string) =>
    `${prop} must be a ${type}`
const createRequiredError = (prop: string) => `${prop} is required`

const params = object({
    id: string({
        required_error: 'id is required',
        invalid_type_error: 'id must be a string',
    }),
})

const query = object({})

const body = object({
    area: string({
        required_error: createRequiredError('area'),
        invalid_type_error: createInvalidTypeError('Area', 'string'),
    }),
    deliverDate: string({
        required_error: createRequiredError('DeliverDate'),
        invalid_type_error: createInvalidTypeError('DeliverDate', 'string'),
    }).datetime({ message: 'Invalid datetime string! Must be UTC.' }),

    unitPrice: number({
        required_error: createRequiredError('UnitPrice'),
        invalid_type_error: createInvalidTypeError('UnitPrice', 'number'),
    }),
    quantity: number({
        required_error: createRequiredError('Quantity'),
        invalid_type_error: createInvalidTypeError('Quantity', 'number'),
    }).int(),
    status: nativeEnum(ORDER_STATUS, {
        required_error: createRequiredError('Status'),
        invalid_type_error: 'Status must be one of [URGENT , ATTENTION, FINE]',
    }).optional(),
    userId: string().optional(),
})

export const createOrderSchema = object({
    body,
})

export const updateOrderSchema = object({
    params,
    body: body.omit({ userId: true }).extend({
        status: nativeEnum(ORDER_STATUS, {
            required_error: createRequiredError('Status'),
            invalid_type_error:
                'Status must be one of [URGENT , ATTENTION, FINE]',
        }),
    }),
})

export const deleteOrderSchema = object({
    params,
})

export const getOneOrderSchema = object({
    params,
})

export const getAllOrderSchema = object({})

export type CreateOrderSchema = TypeOf<typeof createOrderSchema>
export type UpdateOrderSchema = TypeOf<typeof updateOrderSchema>
export type DeleteOrderSchema = TypeOf<typeof deleteOrderSchema>
export type GetOneOrderSchema = TypeOf<typeof getOneOrderSchema>
export type GetAllOrderSchemas = TypeOf<typeof getAllOrderSchema>
