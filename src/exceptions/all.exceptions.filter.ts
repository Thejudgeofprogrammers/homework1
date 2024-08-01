import { ArgumentsHost, ExceptionFilter, HttpException, HttpStatus, Catch } from "@nestjs/common";
import { Response } from "express";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        const errorRes = {
            timestamp: new Date().toISOString(),
            status: 'fail',
            data: exception instanceof HttpException ? exception.getResponse() : exception,
            code: (exception instanceof HttpException && exception.getStatus()) || 500,
        };

        response.status(status).json(errorRes);
    };
};
