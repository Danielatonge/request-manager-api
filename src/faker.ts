import { faker } from '@faker-js/faker'
import db from './db'

type CreateOrder = {
    area: string
    deliverDate: Date
    unitPrice: number
    quantity: number
    status: 'URGENT' | 'ATTENTION' | 'FINE'
    userId: string
}

type CreateProduct = {
    name: string
    belongsToId: string
}

export function createRandomOrder(): CreateOrder {
    return {
        area: faker.address.city(),
        deliverDate: faker.date.soon(),
        unitPrice: faker.datatype.number({ min: 1, max: 200, precision: 0.1 }),
        quantity: faker.datatype.number({ min: 20 }),
        status: faker.helpers.arrayElement(['URGENT', 'ATTENTION', 'FINE']),
        userId: '8d5cc894-0556-491c-8766-c3770dcdd4d0',
    }
}

export function createRandomProduct(): CreateProduct {
    return {
        name: faker.commerce.productName(),
        belongsToId: '76ec6fdb-e323-4e7f-9566-ae104e95e7fd',
    }
}

const populateOrderTable = async () => {
    const { area, deliverDate, unitPrice, quantity, status, userId } =
        createRandomOrder()
    return await db.order.create({
        data: { area, deliverDate, unitPrice, quantity, status, userId },
    })
}

const populateProductTable = async () => {
    const { name, belongsToId } = createRandomProduct()
    return await db.product.create({
        data: { name, belongsToId },
    })
}

export const runFaker = async () => {
    const orderPromises = Array.from({ length: 10 }).map((i) =>
        populateOrderTable()
    )
    await Promise.all(orderPromises)

    const productPromises = Array.from({ length: 10 }).map((i) =>
        populateProductTable()
    )
    await Promise.all(productPromises)
}

runFaker()
