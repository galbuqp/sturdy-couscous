import { I_FetchOptions } from "../../dtos/I_FetchOptions";
import { Restaurant } from "../../infra/entities/Restaurant";







interface I_RestaurantsRepository {
    create({ uuid, name, description, image, rate, location, opened_at  }: any): Promise<Restaurant | null>
    list(filters: I_FetchOptions): Promise<Restaurant[]>
    findOne(filters: I_FetchOptions): Promise<Restaurant | null>
    remove(uuid: string): Promise<void | null>
}

export { I_RestaurantsRepository }