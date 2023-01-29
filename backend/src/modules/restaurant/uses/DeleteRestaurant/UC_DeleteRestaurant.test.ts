import 'reflect-metadata' 
import { memoryStorage } from '../CreateRestaurant/UC_CreateRestaurant.test'
import { describe, it, expect } from 'vitest'
import { CreateRestaurantUseCase } from '../CreateRestaurant/UC_CreateRestaurant.js'
import { nanoid } from 'nanoid'
import { DeleteRestaurantUseCase } from './UC_DeleteRestaurant.js'


describe("Remoção de um restaurante", () => {
    const deleteRestaurantUC = new DeleteRestaurantUseCase(memoryStorage)
    it("Sucesso na remoção", async () => {
        const createRestaurantUC = new CreateRestaurantUseCase(memoryStorage)

        const data = { 
            name: "Restaurante de Testes [REMOÇÃO]", 
            description: "Este é o restaurante do Seu Zé", 
            image: "https://image.com/image.png", 
            rate: "1",
            location: "Brasília",
            opened_at: ["12:00", "20:30"]
        }

        const restaurant = await createRestaurantUC.execute(data)


        const result = deleteRestaurantUC.execute(restaurant.uuid)
        expect(result).resolves
    })


    it("Restaurante não existente", async () => {



        const result = deleteRestaurantUC.execute(nanoid(28))
        await expect(result).rejects.toThrowError("Oops! Parece que este restaurante não existe")
    })
})