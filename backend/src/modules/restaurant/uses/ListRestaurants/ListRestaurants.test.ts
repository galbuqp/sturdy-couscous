import { test, expect } from 'vitest'
import request from 'supertest'
import { app } from '../../../../shared/infra/http/app'


test(`[REST] Listagem de restaurantes`, async () => {
    const result = await request(app).get(`/restaurants`)

    expect(result.status).toBe(200)
    expect(result.body).toBeInstanceOf(Array)
})