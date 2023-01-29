import { nanoid } from 'nanoid'
import 'reflect-metadata' 
import { test, expect } from 'vitest'
import { AppError } from '../../../../shared/infra/errors/AppError.js'
import { Restaurant } from '../../infra/entities/Restaurant'
import { MemoryRestaurantsRepository } from '../../repositories/memory/MemoryRestaurantsRepository'
import { CreateRestaurantUseCase } from './UC_CreateRestaurant'

export const memoryStorage = new MemoryRestaurantsRepository()

const hash = nanoid(5);
test('Criação de restaurante', async () => {
    const service = new CreateRestaurantUseCase(memoryStorage)

    const data = { 
        name: `Restaurante do Seu Zé ${ hash }`, 
        description: "Este é o restaurante do Seu Zé", 
        image: "https://image.com/image.png", 
        rate: "1",
        location: "Brasília",
        opened_at: ["12:00", "20:30"]
    }

    const result = await service.execute(data)
    expect(result.name).toEqual(data.name)
    expect(result.uuid).toBeDefined()
})

test('Não criar restaurantes com o mesmo nome', async () => {
    const service = new CreateRestaurantUseCase(memoryStorage)

    const data = { 
        name: `Restaurante do Seu Zé ${ hash }`, 
        description: "Este é o restaurante do Seu Zé", 
        image: "https://image.com/image.png", 
        rate: "1",
        location: "Brasília",
        opened_at: ["12:00", "20:30"]
    }

    const result = service.execute(data)
    await expect(() => result).rejects.toThrowError('Este restaurante já foi cadastrado')
})


test('Não criar restaurantes sem nomes', async () => {
    const service = new CreateRestaurantUseCase(memoryStorage)

    const data: any = { 
        description: "Este é o restaurante do Seu Zé", 
        image: "https://image.com/image.png", 
        rate: "1",
        location: "Brasília",
        opened_at: ["12:00", "20:30"]
    }

    const result = service.execute(data)
    await expect(() => result).rejects.toThrowError('Você precisa inserir o nome do restaurante')
})


test('Não criar restaurantes sem um local', async () => {
    const service = new CreateRestaurantUseCase(memoryStorage)

    const data: any = {
        name: "Restaurante do Seu Zé",  
        description: "Este é o restaurante do Seu Zé", 
        image: "https://image.com/image.png", 
        rate: "1",
        opened_at: ["12:00", "20:30"]
    }

    const result = service.execute(data)
    await expect(() => result).rejects.toThrowError("Você precisa inserir um local para o restaurante")
})


test('Não criar restaurantes sem uma descrição', async () => {
    const service = new CreateRestaurantUseCase(memoryStorage)

    const data: any = {
        name: "Restaurante do Seu Zé",  
        image: "https://image.com/image.png", 
        rate: "1",
        location: "Brasília",
        opened_at: ["12:00", "20:30"]
    }

    const result = service.execute(data)
    await expect(() => result).rejects.toThrowError("Você precisa inserir uma descrição para o restaurante")
})


test('Não criar restaurantes sem uma imagem', async () => {
    const service = new CreateRestaurantUseCase(memoryStorage)

    const data: any = {
        name: "Restaurante do Seu Zé",  
        rate: "1",
        description: "Este é o restaurante do Seu Zé", 
        location: "Brasília",
        opened_at: ["12:00", "20:30"]
    }

    const result = service.execute(data)
    await expect(() => result).rejects.toThrowError("Você precisa inserir uma imagem para o restaurante")
})

