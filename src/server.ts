require('dotenv').config()
import app from "./app"

import db from "./config/database.config"
const { HTTP_SERVER_PORT } = process.env

db.sync()
    .then(() => {
        console.log('connect to db')
    })


app.listen(HTTP_SERVER_PORT, () => {
    console.log(`server running in ${HTTP_SERVER_PORT}`)
})