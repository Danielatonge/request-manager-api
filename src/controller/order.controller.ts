import db from '../db'

export const getOneOrder = async (req, res) => {
    const order = await db.order.findUnique({
        where: {
            id: req.params.id,
        },
    })
    res.json({ data: order })
}

export const getOrders = async (req, res) => {
    const orders = await db.order.findMany()

    res.json({ data: orders })
}

export const createOrder = async (req, res) => {
    const { area, deliverDate, unitPrice, quantity, status, userId } = req.body
    const order = await db.order.create({
        data: {
            area,
            deliverDate,
            unitPrice,
            quantity,
            status,
            userId,
        },
    })

    res.json({ data: order })
}

export const updateOrder = async (req, res) => {
    const { area, deliverDate, unitPrice, quantity, status } = req.body
    const updatedOrder = await db.order.update({
        where: {
            id: req.params.id,
        },
        data: {
            area,
            deliverDate,
            unitPrice,
            quantity,
            status,
        },
    })

    res.json({ data: updatedOrder })
}

export const deleteOrder = async (req, res) => {
    const orderDeleted = await db.order.delete({
        where: {
            id: req.params.id,
        },
    })

    res.json({ data: orderDeleted })
}
