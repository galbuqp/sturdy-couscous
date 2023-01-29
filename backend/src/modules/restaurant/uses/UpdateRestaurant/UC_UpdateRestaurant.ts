import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/infra/errors/AppError";
import { I_CreateOptions } from "../../dtos/I_CreateOptions";
import { I_RestaurantsRepository } from "../../repositories/interfaces/I_RestaurantsRepository";

@injectable()
class UpdateRestaurantUseCase {
    constructor(@inject("RestaurantsRepository") private restaurants: I_RestaurantsRepository){

    }

    execute = async ({ uuid, name, description, image, location, rate, opened_at }: I_CreateOptions): Promise<void> => {
        if(!!!uuid){
            throw new AppError("Oops! Você precisa definir o restaurante")
        }

        const exists = await this.restaurants.findOne({ uuid })
        if(!exists){
            throw new AppError("Este restaurante não existe!", 404)
        }

        await this.restaurants.create({ uuid, name, description, image, location, rate, opened_at })
    }
}

export { UpdateRestaurantUseCase }