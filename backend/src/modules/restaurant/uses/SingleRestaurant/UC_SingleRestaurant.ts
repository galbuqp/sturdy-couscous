import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/infra/errors/AppError";
import { I_RestaurantsRepository } from "../../repositories/interfaces/I_RestaurantsRepository";

@injectable()
class SingleRestaurantUseCase {
    constructor(@inject("RestaurantsRepository") private restaurants: I_RestaurantsRepository){

    }

    execute = async (uuid: string) => {
        const exists = await this.restaurants.findOne({ uuid })
        if(!exists){
            throw new AppError("Este restaurante não existe!", 404)
        }

        return exists
    }
}

export { SingleRestaurantUseCase }