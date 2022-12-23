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
    const orderCount = await db.order.aggregate({
        _count: {
            id: true,
        },
    })
    const actualOrderCount = orderCount._count.id

    const { startAt, limit, search } = req.query
    const query: any = {}
    if (startAt) query.skip = Number(startAt)
    if (limit) query.take = Number(limit)
    if (search) {
        query.where = { area: { contains: search } }
    }
    const { id, area, deliverDate, unitPrice, quantity, status } = req.query
    if (id || area || deliverDate || unitPrice || quantity || status) {
        query.orderBy = []
        if (id) query.orderBy.push({ id })
        if (area) query.orderBy.push({ area })
        if (deliverDate) query.orderBy.push({ deliverDate })
        if (unitPrice) query.orderBy.push({ unitPrice })
        if (quantity) query.orderBy.push({ quantity })
        if (status) query.orderBy.push({ status })
    }

    console.log(query)
    const orders = await db.order.findMany(query)

    res.json({
        count: actualOrderCount,
        startAt: Number(startAt),
        limit: Number(limit),
        data: orders,
    })
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

    res.json({ success: true, data: updatedOrder })
}

export const deleteOrder = async (req, res) => {
    const orderDeleted = await db.order.delete({
        where: {
            id: req.params.id,
        },
    })

    res.json({ success: true, data: orderDeleted })
}
