import { test, expect } from 'vitest'
import request from 'supertest'
import { app } from '../../../../shared/infra/http/app'
import { nanoid } from 'nanoid'



test(`[REST] Deletar um restaurante`, async () => {
    const req = request(app)
    const list = await req.get(`/restaurants`)

    const { uuid } = list.body.pop()
    console.log("Created UUID", uuid)
    
    const result = await req.delete(`/restaurants/${ uuid }`)

    expect(result.status).toEqual(202)
    expect(result.body.message).toEqual("Restaurante removido com sucesso!")
})


test(`[REST] Tentativa de delete com UUID desconhecido`, async () => {
    const result = await request(app).delete(`/restaurants/${ nanoid(26) }`)

    expect(result.status).toEqual(404)
    expect(result.body.error).toEqual(true)
    expect(result.body.message).toEqual("Oops! Parece que este restaurante não existe")
})


