import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/infra/errors/AppError";
import { I_RestaurantsRepository } from "../../repositories/interfaces/I_RestaurantsRepository";

@injectable()
class DeleteRestaurantUseCase {
    constructor(@inject("RestaurantsRepository") private restaurants: I_RestaurantsRepository){

    }
    execute = async (uuid: string) => {
        if(!!!uuid){
            throw new AppError("Você precisa definir um restaurante")
        }
        const exists = await this.restaurants.findOne({ uuid })
        if(!exists){
            throw new AppError("Oops! Parece que este restaurante não existe", 404)
        }
        await this.restaurants.remove(uuid)
    }
}

export { DeleteRestaurantUseCase }