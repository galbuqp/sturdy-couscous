import { Request, Response } from "express"
import { container } from "tsyringe"
import { SingleRestaurantUseCase } from "./UC_SingleRestaurant"


class SingleRestaurantController {
    handle = async (req: Request, res: Response) => {
        const { id } = req.params
        const useCase = container.resolve(SingleRestaurantUseCase)
        const result = await useCase.execute(id)
        return res.json(result) 
    }
}
export { SingleRestaurantController }
