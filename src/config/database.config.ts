import { Sequelize } from 'sequelize'
const { DATABASE } = process.env
const db = new Sequelize('app', '', '', {
    dialect: "sqlite",
    storage: DATABASE,
    logging: false,
})

export default db;