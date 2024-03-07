import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { response } from "express";
import { map } from "rxjs";


export class CustomInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, handler: CallHandler) {
        return handler.handle().pipe(
            map((data) => {
                const response = {
                    ...data,
                    createAt: data.created_at,
                };
                delete response.updated_at
                delete response.created_at
                return response;
            })
        )
    }
}