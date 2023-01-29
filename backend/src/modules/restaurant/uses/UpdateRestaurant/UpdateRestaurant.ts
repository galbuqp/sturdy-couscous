import { Request, Response } from "express"
import { container } from "tsyringe"
import { UpdateRestaurantUseCase } from "./UC_UpdateRestaurant"


class UpdateRestaurantController {
    handle = async (req: Request, res: Response) => {
        const { id: uuid } = req.params
        const { name, description, image, rate, location, opened_at } = req.body

        const useCase = container.resolve(UpdateRestaurantUseCase)
        await useCase.execute({ uuid, name, description, image, rate, location, opened_at })
        return res.json({ message: "Alterações realizadas com sucesso." }) 
    }
}

export { UpdateRestaurantController }
