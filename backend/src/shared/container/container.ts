import { container } from "tsyringe"
import { I_RestaurantsRepository } from "../../modules/restaurant/repositories/interfaces/I_RestaurantsRepository"
import { RestaurantsRepository } from "../../modules/restaurant/repositories/RestaurantsRepository"

container.registerSingleton<I_RestaurantsRepository>("RestaurantsRepository", RestaurantsRepository)