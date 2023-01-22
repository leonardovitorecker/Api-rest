import express from 'express'
import ProductValidator from './validator'
import  Middleware  from '../../middleware'
import ProductController from './controller'

const routerProduct = express.Router()

routerProduct.post(
    '/create',
    ProductValidator.checkCreateProduct(),
    Middleware.handleValidationError,
    ProductController.create
)

routerProduct.get(
    '/read/:id?',
    ProductValidator.checkReadProduct(),
    Middleware.handleValidationError,
    ProductController.readPagination
)

routerProduct.put(
    '/update/:id',
    ProductValidator.checkIdParam(),
    Middleware.handleValidationError,
    ProductController.updateProduct
)

routerProduct.delete(
    '/delete/:id',
    ProductValidator.checkIdParam(),
    Middleware.handleValidationError,
    ProductController.delete
)

export default routerProduct