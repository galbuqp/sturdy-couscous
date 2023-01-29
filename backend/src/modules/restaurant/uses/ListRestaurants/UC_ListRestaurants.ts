import { I_FetchOptions } from "../../dtos/I_FetchOptions"
import { injectable, inject } from 'tsyringe'
import { I_RestaurantsRepository } from "../../repositories/interfaces/I_RestaurantsRepository"



@injectable()
class ListRestaurantsUseCase {
    constructor(@inject("RestaurantsRepository") private restaurants: I_RestaurantsRepository){

    }

    execute = async (filter: I_FetchOptions) => {
        const results = this.restaurants.list(filter)
        return results
    }
}

export { ListRestaurantsUseCase }