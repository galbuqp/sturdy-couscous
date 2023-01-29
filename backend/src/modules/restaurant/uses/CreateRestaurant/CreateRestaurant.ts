import { Request, Response } from "express"
import { container } from "tsyringe"
import { CreateRestaurantUseCase } from "./UC_CreateRestaurant"


class CreateRestaurantController {
    
    handle = async (req: Request, res: Response) => {
        const { name, description, image, rate, location, opened_at } = req.body
        const useCase = container.resolve(CreateRestaurantUseCase)
        const result = await useCase.execute({ name, description, image, rate, location, opened_at })
        return res.status(201).json(result) 
    }
}
export { CreateRestaurantController }
