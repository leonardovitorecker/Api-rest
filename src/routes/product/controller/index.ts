import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { ProductInstance } from '../../../models/product.model'

class ProductController {
    async create(req: Request, res: Response) {
        const id = uuidv4()
        try {         

            if (Number(req.body.discountPrice) >= Number(req.body.price)) {
                return res.json({
                    msg:"Preço de desconto deve ser menor que o preço de venda"})
            }

            const product = await  ProductInstance.create({ ...req.body, id })
            return res.status(201).json({
                product: product,
                msg: "Produto criado com sucesso",
            })
        } catch (error) {
            return res.status(500).json({
                msg: "Falha ao criar o produto",
            })
        }
    }

    async readPagination(req: Request, res: Response) {

        const limit = ((req.query.limit as unknown) as number | undefined)
        const offset = ((req.query.offset as unknown) as number | undefined)
        const { id } = req.params

        try {

            if (id) {
                const product = await ProductInstance.findOne({ where: { id } })

                if (!product) {
                    return res.status(404).json({
                        msg: 'produto não encontrado'
                    })
                }

                return res.json({
                    product: product,
                })
            }

            const products = await ProductInstance.findAll({
                where: {},
                limit,
                offset
            })

            return res.json(products)
    
        } catch (error) {
            return res.status(500).json({
                msg: 'Erro, falha ao retornar os produtos',
            })
        }
    }

    async updateProduct(req: Request, res: Response) {
        try {
            const { id } = req.params

            const product = await ProductInstance.findOne({ where: { id } })
            if (!product) {
                return res.status(404).json({
                    msg: 'Erro, este produto não existe'
                })
            }

            if (Number(req.body.discountPrice) >= Number(req.body.price)) {
                return res.json({
                    msg:"Preço de desconto deve ser menor que o preço de venda"})
            }

            const updateRecord = await product.update({
                EAN: req.body.EAN,
                name: req.body.name,
                description: req.body.description,
                price: Number(req.body.price),
                discountPrice: Number(req.body.discountPrice),
                quantity: Number(req.body.quantity)
             },
             { 
                where: 
                {
                    id: 1
                }
            })

            return res.status(201).json(
                {msg: 'Produto alterado com sucesso',
                product:updateRecord })
        } catch (error) {
            return res.status(500).json({
                msg: "Falha ao alterar o produto",
            })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params
            const product = await ProductInstance.findOne({ where: { id } })

            if (!product) {
               return res.status(500).json('Este produto não existe')
            }

            const deletedRecord = await product.destroy()
            return res.status(201).json({
                msg: 'Produto deletado com sucesso',
                product:deletedRecord
            })
        } catch (error) {
            return res.status(500).json({
                msg: "Falha para excluir o produto"
            })
        }
    }
}
export default new ProductController()
