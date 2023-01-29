import { describe, it, expect } from 'vitest'
import request from 'supertest'
import { app } from '../../../../shared/infra/http/app'
import { nanoid } from 'nanoid'



describe("[REST] Atualização de informações de um restaurante", () => {
    const req = request(app)
    it("Sucesso na atualização", async () => {
        let object: any = {}

        const list = await req.get(`/restaurants`)
        object = { ...list.body.shift() }

        object.description = "Atualizado com sucesso."

        const result = await req.patch(`/restaurants/${ object.uuid }`).send(object)
        expect(result.status).toBe(200)
        expect(result.body.message).toBe("Alterações realizadas com sucesso.")
    })


    it("Restaurante não existente", async () => {
        const result = await req.patch(`/restaurants/${ nanoid(26) }`).send({})
        expect(result.status).toBe(404)
        expect(result.body.message).toBe("Este restaurante não existe!")
        expect(result.body.error).toBeDefined()
    })
})