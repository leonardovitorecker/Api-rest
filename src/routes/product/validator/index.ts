
import { body, param, query } from 'express-validator'
import { findByEanExists } from '../../../utils/findByEan'

export class ProductValidator {
    checkCreateProduct() {
        return [
            body('id')
                .optional()
                .isUUID(4)
                .withMessage('Id deve ser no formato uuid v4'),
            body('EAN')
                .isString()
                .notEmpty() 
                .withMessage("EAN é obrigatorio")
                .custom((EAN: string) => {
                    return new Promise(async (resolve, reject) => {
                        const result = await findByEanExists(EAN)
                        if (result) {
                            reject(new Error('EAN ja existe'))
                        } else {
                            resolve("EAN não existe")
                        }
                    })
                }),                 
            body('name')
                .isString()
                .notEmpty()
                .withMessage('name é obrigatorio'),
            body('description')
                .isString()
                .optional(),
            body('price')
                .isNumeric()
                .notEmpty()
                .withMessage('Preço é obrigatorio'),
            body('discountPrice')
                .optional()
                .isDecimal(),
            body('quantity')
                .isNumeric()
                .notEmpty()
                .withMessage('Quantidade é obrigatorio'),
                body('laboratory')
                .isString()
                .optional()
        ]
    }

    checkReadProduct() {
        return [
            query('limit')
                .optional()
                .isInt({ min: 1, max: 10 })
                .withMessage('O limite deve ser  entre 1 e 10'),
            query('offset')
                .optional()
                .isNumeric()
                .withMessage('O valor deve ser um número')
        ]
    }

    checkIdParam() {
        return [
            param('id')
                .notEmpty()
                .withMessage('Id é obrigatório')
                .isUUID(4)
                .withMessage('Id deve ser no formato uuid v4')
        ]
    }
}

export default new ProductValidator()