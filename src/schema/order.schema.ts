import { object, number, string, TypeOf, date, nativeEnum, coerce } from 'zod'

enum ORDER_STATUS {
    URGENT = 'URGENT',
    ATTENTION = 'ATTENTION',
    FINE = 'FINE',
}

enum SORT_DIRECTION {
    ASC = 'asc',
    DESC = 'desc',
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

const query = object({
    search: string(),
    startAt: coerce.number(),
    limit: coerce.number(),

    id: nativeEnum(SORT_DIRECTION, {
        invalid_type_error: 'property must take either [ASC , DESC]',
    }),
    area: nativeEnum(SORT_DIRECTION, {
        invalid_type_error: 'property must take either [ASC , DESC]',
    }),
    deliverDate: nativeEnum(SORT_DIRECTION, {
        invalid_type_error: 'property must take either [ASC , DESC]',
    }),
    unitPrice: nativeEnum(SORT_DIRECTION, {
        invalid_type_error: 'property must take either [ASC , DESC]',
    }),
    quantity: nativeEnum(SORT_DIRECTION, {
        invalid_type_error: 'property must take either [ASC , DESC]',
    }),
    status: nativeEnum(SORT_DIRECTION, {
        invalid_type_error: 'property must take either [ASC , DESC]',
    }),
}).deepPartial()

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

export const getAllOrderSchema = object({
    query,
})

export type CreateOrderSchema = TypeOf<typeof createOrderSchema>
export type UpdateOrderSchema = TypeOf<typeof updateOrderSchema>
export type DeleteOrderSchema = TypeOf<typeof deleteOrderSchema>
export type GetOneOrderSchema = TypeOf<typeof getOneOrderSchema>
export type GetAllOrderSchemas = TypeOf<typeof getAllOrderSchema>
