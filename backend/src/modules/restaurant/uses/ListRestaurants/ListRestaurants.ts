import { Request, Response } from "express"
import { container } from "tsyringe"
import { ListRestaurantsUseCase } from "./UC_ListRestaurants"


class ListRestaurantsController {
    handle = async (req: Request, res: Response) => {
        const useCase = container.resolve(ListRestaurantsUseCase)
        const result = await useCase.execute(req.query)
        return res.json(result) 
    }
}
export { ListRestaurantsController }
