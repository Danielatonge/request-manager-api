import db from "../db";

export const getOneOrder = async (req, res) => {
    const order = await db.order.findUnique({
        where : {
            id: req.params.id
        }
    })
    res.json({date: order})
}
export const getOrders = async (req, res) => {
    const products = await db.product.findMany({
        where : {
            belongsToId: req.user.id
        },
        include : {
            orders: true
        }
    })

    const orders = products.reduce((acc, {orders}) => {
        return [...acc,...orders]
    }, []);

    res.json({data: orders})
}
export const createOrder = async (req, res) => {

    const product = await db.product.findUnique({
        where:{
            id_belongsToId : {
                id: req.body.productId,
                belongsToId: req.user.id,
            } 
        }
    })

    if(!product) {
        //Product does not belong to user
        return res.json({message: 'nope'})
    }

    const {title, body, productId} = req.body;

    const order = await db.order.create({
        data: {
            title, body, 
            product : {
                connect: {
                    id: product.id
                }
            }
        }
    })

    res.json({data: order})
}
export const orderOrder = async (req, res) => {
    const products = await db.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            orders: true
        }
    })

    const orders = products.reduce((acc, cur) => [...acc, ...cur.orders], [])
    const match = orders.find(order => order.id === req.params.id)

    if(!match) {
        return res.json({message: 'nope'})
    }

    const orderd = await db.product.order({
        where: {
            id: req.params.id
        },
        data: req.body
    })
    res.json({data: orderd})
}   
export const deleteOrder = async (req, res) => {
    const products = await db.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            orders: true
        }
    })

    const orders = products.reduce((acc, cur) => [...acc, ...cur.orders], [])
    const match = orders.find(order => order.id === req.params.id)

    if(!match) {
        return res.json({message: 'nope'})
    }

    const deleted = await db.product.delete({
        where: {
            id: req.params.id
        }
    })

    res.json({data: deleted})
}