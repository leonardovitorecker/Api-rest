import { Model, DataTypes } from "sequelize"
import db from "../config/database.config"

interface ProductAttributes {
    id: string,
    EAN: string,
    name: string,
    description?: string,
    price: number,
    discountPrice?: number,
    quantity: number
    laboratory?: string
}


export class ProductInstance extends Model<ProductAttributes> {}


ProductInstance.init(
    {
        id: {
            type: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        EAN: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        price: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        discountPrice: {
            type: DataTypes.NUMBER,
            allowNull: true,
        },
        quantity: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        laboratory: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize: db,
        tableName: 'product'
    }
)
