import { describe, it, expect } from 'vitest'
import request from 'supertest'
import { app } from '../../../../shared/infra/http/app'
import { nanoid } from 'nanoid'



describe(`[REST] Obter dados de um restaurante`, () => {
    const req = request(app)
    it("Informação obtida com sucesso", async () => {
        let uuid = ''
        const list = await req.get(`/restaurants`)

        if(list.body.length > 0){
            uuid = list.body[0].uuid
        }

        if(list.body.length < 1){
            const data = { 
                name: "Restaurantes de Teste [REST/LISTAGEM]", 
                description: "Este é o restaurante do Seu Zé", 
                image: "https://image.com/image.png", 
                rate: "1",
                location: "Brasília",
                opened_at: ["12:00", "20:30"]
            }

            const create = await req.post(`/restaurants`).send(data)
            uuid = create.body.uuid
        }

        const result = await req.get(`/restaurants/${ uuid }`)

        expect(result.status).toBe(200)
        expect(result.body.uuid).toBeDefined()
    })


    it("Restaurante não existente", async () => {
        const result = await req.get(`/restaurants/${ nanoid(26) }`)
        expect(result.status).toBe(404)
        expect(result.body.error).toBeDefined()
        expect(result.body.message).toBe("Este restaurante não existe!")
    })
})