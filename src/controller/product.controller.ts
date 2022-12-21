import db from "../db";

export const getProducts = async (req, res) => {
    const user = await db.user.findUnique({
        where: { id: req.user.id},
        include: {products: true}
    })

    res.json({data: user.products})
}

export const getOneProduct = async (req, res) => {
    const id = req.params.id;

    const product = await db.product.findFirst({
        where: { 
            id, 
            belongsToId: req.user.id
        },
    })

    res.json({data: product})

}

export const createProduct = async (req, res, next) => {
    try {
        const product = await db.product.create({
            data: { 
                name: req.body.name,
                belongsToId: req.user.id
            }
        })
    
        res.json({data: product})
    }catch (err) {
        console.log(err)
        next(err)
    }
}

export const updateProduct = async (req, res) => {
    const product = await db.product.update({
        where: { 
            id_belongsToId: {
                id: req.params.id,
                belongsToId: req.user.id
            }
        },
        data: {
            name: req.body.name
        }
    })
    res.json({data: product})
}

export const deleteProduct = async (req, res) => {
    const product = await db.product.delete({
         where: { 
            id_belongsToId: {
                id: req.params.id,
                belongsToId: req.user.id
            }
        },
    })

    res.json({data: product})
}