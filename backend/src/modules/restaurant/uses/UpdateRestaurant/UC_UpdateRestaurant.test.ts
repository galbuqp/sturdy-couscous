import 'reflect-metadata' 
import { memoryStorage } from '../CreateRestaurant/UC_CreateRestaurant.test'
import { describe, it, expect } from 'vitest'
import { UpdateRestaurantUseCase } from './UC_UpdateRestaurant.js'
import { CreateRestaurantUseCase } from '../CreateRestaurant/UC_CreateRestaurant.js'
import { nanoid } from 'nanoid'


describe("Atualização de informações de um restaurante", () => {
    const updateRestaurantUC = new UpdateRestaurantUseCase(memoryStorage)
    it("Sucesso na atualização", async () => {
        const createRestaurantUC = new CreateRestaurantUseCase(memoryStorage)

        const data = { 
            name: "Restaurante de Testes [ATUALIZAÇÃO]", 
            description: "Este é o restaurante do Seu Zé", 
            image: "https://image.com/image.png", 
            rate: "1",
            location: "Brasília",
            opened_at: ["12:00", "20:30"]
        }

        const restaurant = await createRestaurantUC.execute(data)
        

        const newData = { 
            name: "Restaurante de Testes [ATUALIZAÇÃO/2]", 
            description: "Este é o restaurante do Seu Jão", 
            image: "https://image.com/image2.png", 
            rate: "3",
            location: "São Paulo",
            opened_at: ["12:00", "20:00"]
        }


        const result = updateRestaurantUC.execute({ uuid: restaurant.uuid, ...newData })
        expect(result).resolves
    })


    it("Restaurante não existente", async () => {
        const newData = { 
            name: "Restaurante de Testes [ATUALIZAÇÃO/2]", 
            description: "Este é o restaurante do Seu Jão", 
            image: "https://image.com/image2.png", 
            rate: "3",
            location: "São Paulo",
            opened_at: ["12:00", "20:00"]
        }


        const result = updateRestaurantUC.execute({ uuid: nanoid(28), ...newData })
        await expect(result).rejects.toThrowError("Este restaurante não existe!")
    })
})