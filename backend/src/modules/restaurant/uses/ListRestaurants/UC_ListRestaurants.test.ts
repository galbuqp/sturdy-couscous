import 'reflect-metadata' 
import { test, expect } from 'vitest'
import { memoryStorage } from '../CreateRestaurant/UC_CreateRestaurant.test'
import { ListRestaurantsUseCase } from '../ListRestaurants/UC_ListRestaurants'



test("Listagem de restaurantes", async () => {
    const listRestaurantsUC = new ListRestaurantsUseCase(memoryStorage)
    const result = await listRestaurantsUC.execute({})
    expect(result).toBeInstanceOf(Array)
})