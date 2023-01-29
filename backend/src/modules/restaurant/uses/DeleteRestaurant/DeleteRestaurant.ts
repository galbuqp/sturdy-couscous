import { Request, Response } from "express"
import { container } from "tsyringe"
import { DeleteRestaurantUseCase } from "./UC_DeleteRestaurant"


class DeleteRestaurantController {
    handle = async (req: Request, res: Response) => {
        const { id } = req.params
        const useCase = container.resolve(DeleteRestaurantUseCase)
        const result = await useCase.execute(id)
        return res.status(202).json({ message: "Restaurante removido com sucesso!" }) 
    }
}
export { DeleteRestaurantController }
