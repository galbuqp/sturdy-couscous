import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/infra/errors/AppError";
import { I_CreateOptions } from "../../dtos/I_CreateOptions";
import { Restaurant } from "../../infra/entities/Restaurant";
import { I_RestaurantsRepository } from "../../repositories/interfaces/I_RestaurantsRepository";

@injectable()
class CreateRestaurantUseCase {
    constructor(@inject("RestaurantsRepository") private restaurants: I_RestaurantsRepository){

    }
    execute = async ({ name, description, image, rate, location, opened_at }: I_CreateOptions): Promise<Restaurant> => {
        if(!!!name){
            throw new AppError("Você precisa inserir o nome do restaurante")
        }

        if(!!!description){
            throw new AppError("Você precisa inserir uma descrição para o restaurante")
        }

        if(!!!image){
            throw new AppError("Você precisa inserir uma imagem para o restaurante")
        }

        if(!!!location){
            throw new AppError("Você precisa inserir um local para o restaurante")
        }


        const exists = await this.restaurants.findOne({ name: name.trim() })
        if(exists){
            throw new AppError("Este restaurante já foi cadastrado!", 409)
        }


        const restaurant = await this.restaurants.create({ name: name.trim(), description, image, location, rate, opened_at })

        if(!restaurant){
            throw new AppError("Oops! Houve um erro ao adicionar este restaurante", 500)
        }
        return restaurant
    }
}

export { CreateRestaurantUseCase }