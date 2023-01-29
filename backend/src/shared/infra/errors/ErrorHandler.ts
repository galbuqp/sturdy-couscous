import { NextFunction, Request, Response } from "express"
import { AppError } from "./AppError"

const ErrorHandler = (err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof AppError){
        return response.status(err.code).json({
            error: true,
            status: err.code,
            message: err.message
        })
    }

    return response.status(500).json({ 
        error: true,
        status: 500,
        message: "Internal error",
        details: err.message
    })
}

export { ErrorHandler }