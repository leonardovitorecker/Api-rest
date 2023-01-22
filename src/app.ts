
import express from "express"
import routerProduct from "./routes/product"
const app = express()

app.use(express.json())

app.use("/v1/product", routerProduct)

export default app