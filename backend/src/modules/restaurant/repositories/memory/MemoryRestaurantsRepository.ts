import { nanoid } from "nanoid";
import { I_FetchOptions } from "../../dtos/I_FetchOptions";
import { Restaurant } from "../../infra/entities/Restaurant";
import { I_RestaurantsRepository } from "../interfaces/I_RestaurantsRepository";




class MemoryRestaurantsRepository implements I_RestaurantsRepository {
    private restaurants: Restaurant[]  = []
    async create({ uuid, name, description, image, rate, location, opened_at  }: any): Promise<Restaurant | null> {
        const data: Restaurant = { uuid: uuid || nanoid(26), name, description, image, rate, location, opened_at }
        this.restaurants.push(data)
        return data
    }

    async list(filters: I_FetchOptions): Promise<Restaurant[]> {
        return this.restaurants.filter( x => {
            if(!filters){
                return true
            }
            
            const keys = Object.keys(filters)
            if(keys.length > 0){
                return keys.every(key => filters[key as keyof I_FetchOptions]?.normalize('NFD').replace(/[\u0300-\u036f]/g, "") === x[key as keyof I_FetchOptions]?.normalize('NFD').replace(/[\u0300-\u036f]/g, ""))
            }

            return true
        }) as Restaurant[]
    }
    
    async findOne(filters: I_FetchOptions): Promise<Restaurant | null> {
        return this.restaurants.find( x => {
            if(!filters){
                return true
            }
            
            const keys = Object.keys(filters)
            if(keys.length > 0){
                return keys.every(key => filters[key as keyof I_FetchOptions]?.normalize('NFD').replace(/[\u0300-\u036f]/g, "") === x[key as keyof I_FetchOptions]?.normalize('NFD').replace(/[\u0300-\u036f]/g, ""))
            }

            return true
        }) as Restaurant
    }

    async remove(uuid: string): Promise<void | null> {
        this.restaurants = this.restaurants.filter( x => x.uuid !== uuid)
    }

}

export { MemoryRestaurantsRepository }