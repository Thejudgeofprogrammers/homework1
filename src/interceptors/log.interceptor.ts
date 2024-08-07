import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class LogInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        console.log('New req!');
        const now = Date.now();

        return next.handle()
            .pipe(
                tap(() => {
                    console.log(`\nExecution time: ${Date.now() - now}ms`);
                    console.log('\nReq was successful!');
                })
            );
    };
};
