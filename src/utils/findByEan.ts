import { ProductInstance } from "../models/product.model"

export async function findByEanExists(EAN: string) {

    const result = await ProductInstance.findOne({
        where: {
            'EAN': EAN
        }
    })
    return result

}

