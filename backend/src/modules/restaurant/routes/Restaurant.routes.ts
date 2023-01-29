import { Router } from "express";
import { CreateRestaurantController } from "../uses/CreateRestaurant/CreateRestaurant";
import { DeleteRestaurantController } from "../uses/DeleteRestaurant/DeleteRestaurant";
import { ListRestaurantsController } from "../uses/ListRestaurants/ListRestaurants";
import { SingleRestaurantController } from "../uses/SingleRestaurant/SingleRestaurant";
import { UpdateRestaurantController } from "../uses/UpdateRestaurant/UpdateRestaurant";



const RestaurantRoutes = Router()

const RestaurantList = new ListRestaurantsController()
RestaurantRoutes.get(`/`, RestaurantList.handle)

const SingleRestaurant = new SingleRestaurantController()
RestaurantRoutes.get(`/:id`, SingleRestaurant.handle)

const CreateRestaurant = new CreateRestaurantController()
RestaurantRoutes.post(`/`, CreateRestaurant.handle)

const UpdateRestaurant = new UpdateRestaurantController()
RestaurantRoutes.patch(`/:id`, UpdateRestaurant.handle)

const DeleteRestaurant = new DeleteRestaurantController()
RestaurantRoutes.delete(`/:id`, DeleteRestaurant.handle)

export { RestaurantRoutes }