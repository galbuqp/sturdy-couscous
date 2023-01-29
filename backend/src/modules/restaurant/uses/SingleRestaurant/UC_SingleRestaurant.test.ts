import 'reflect-metadata' 
import { memoryStorage } from '../CreateRestaurant/UC_CreateRestaurant.test'
import { describe, it, expect } from 'vitest'
import { SingleRestaurantUseCase } from './UC_SingleRestaurant'
import { ListRestaurantsUseCase } from '../ListRestaurants/UC_ListRestaurants'
import { CreateRestaurantUseCase } from '../CreateRestaurant/UC_CreateRestaurant'
import { nanoid } from 'nanoid'


describe("Obter informações sobre um restaurante", () => {
    const singleRestaurantUC = new SingleRestaurantUseCase(memoryStorage)
    it("Informação obtida com sucesso", async () => {
        let uuid = ''
        const listRestaurantsUC = new ListRestaurantsUseCase(memoryStorage)
        const listRestaurants = await listRestaurantsUC.execute({})
        if(listRestaurants.length > 0){
            uuid = listRestaurants[0].uuid
        } else {
            const createRestaurantUC = new CreateRestaurantUseCase(memoryStorage)
            const data = { 
                name: "Restaurante de Testes [LISTAGEM]", 
                description: "Este é o restaurante do Seu Zé", 
                image: "https://image.com/image.png", 
                rate: "1",
                location: "Brasília",
                opened_at: ["12:00", "20:30"]
            }

            const { uuid: id } = await createRestaurantUC.execute(data)
            uuid = id
        }
        
        const singleRestaurant = await singleRestaurantUC.execute(uuid)
        expect(singleRestaurant.uuid).toBeDefined()
    })


    it("Restaurante não existente", async () => {
        const result = singleRestaurantUC.execute(nanoid(26))
        expect(result).rejects.toThrowError("Este restaurante não existe!")
    })
})