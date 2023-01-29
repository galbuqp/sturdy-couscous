import 'reflect-metadata' 
import { describe, it, expect } from 'vitest'
import request from 'supertest'
import { app } from '../../../../shared/infra/http/app'
import { nanoid } from 'nanoid'

describe('[REST] Criação de restaurante', () => {
    it("[REST] Criação de restaurante", async () => {
        const data = { 
            name: `Restaurante do Seu Zé ${ nanoid(5) }`, 
            description: "Este é o restaurante do Seu Zé", 
            image: "https://image.com/image.png", 
            rate: "1",
            location: "Brasília",
            opened_at: ["12:00", "20:30"]
        }
    
        const response = await request(app).post(`/restaurants`).send(data)
    
        expect(response.status).toEqual(201)
        expect(response.body.uuid).toBeDefined()
        expect(response.body.name).toEqual(data.name)
    
    })
    
    it.concurrent("[REST] Não criar restaurantes sem um nome definido", async () => {
        const data = { 
            description: "Este é o restaurante do Seu Zé", 
            image: "https://image.com/image.png", 
            rate: "1",
            location: "Brasília",
            opened_at: ["12:00", "20:30"]
        }
        const response = await request(app).post(`/restaurants`).send(data)
    
        expect(response.status).toEqual(400)
        expect(response.body.error).toEqual(true)
        expect(response.body.message).toEqual("Você precisa inserir o nome do restaurante")
    })
    
    
    it.concurrent("[REST] Não criar restaurantes sem um local definido", async () => {
        const data = { 
            name: "Restaurante do Seu Zé", 
            description: "Este é o restaurante do Seu Zé", 
            image: "https://image.com/image.png", 
            rate: "1",
            opened_at: ["12:00", "20:30"]
        }
        const response = await request(app).post(`/restaurants`).send(data)
    
        expect(response.status).toEqual(400)
        expect(response.body.error).toEqual(true)
        expect(response.body.message).toEqual("Você precisa inserir um local para o restaurante")
    })
    
    it.concurrent("[REST] Não criar restaurantes sem uma descrição definida", async () => {
        const data = { 
            name: "Restaurante do Seu Zé", 
            image: "https://image.com/image.png", 
            rate: "1",
            location: "Brasília",
            opened_at: ["12:00", "20:30"]
        }
        const response = await request(app).post(`/restaurants`).send(data)
    
        expect(response.status).toEqual(400)
        expect(response.body.error).toEqual(true)
        expect(response.body.message).toEqual("Você precisa inserir uma descrição para o restaurante")
    })
    
    it.concurrent("[REST] Não criar restaurantes sem uma imagem definida", async () => {
        const data = { 
            name: "Restaurante do Seu Zé", 
            description: "Este é o restaurante do Seu Zé", 
            rate: "1",
            location: "Brasília",
            opened_at: ["12:00", "20:30"]
        }
        const response = await request(app).post(`/restaurants`).send(data)
    
        expect(response.status).toEqual(400)
        expect(response.body.error).toEqual(true)
        expect(response.body.message).toEqual("Você precisa inserir uma imagem para o restaurante")
    })
})
