import 'reflect-metadata'
import 'express-async-errors'
import "../../container/container"
import express from 'express'
import { RestaurantsRepository } from '../../../modules/restaurant/repositories/RestaurantsRepository'
import { RestaurantRoutes } from '../../../modules/restaurant/routes/Restaurant.routes'
import { ErrorHandler } from '../errors/ErrorHandler'
import cors from 'cors'


const app = express()
app.use(cors())

app.use(express.json())
app.use("/restaurants", RestaurantRoutes)
app.use(ErrorHandler)


export { app }