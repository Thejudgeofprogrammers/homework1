// import { 
//     CallHandler, 
//     ExecutionContext, 
//     Injectable, 
//     NestInterceptor,
//     HttpException } from "@nestjs/common";
// import { Observable } from "rxjs";
// import { map, catchError } from 'rxjs/operators';

// @Injectable()
// export class AddInfoHttp implements NestInterceptor {
//     public intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
//         return next.handle().pipe(
//             map(data => ({
//                 status: 'success',
//                 data
//             })),
//             catchError(err => {
//                 let response = {
//                     status: 'fall',
//                     data: err.message
//                 };
                
//                 if (err instanceof HttpException) {
//                     const responseMsg = err.getResponse;

//                     response = {
//                         status: 'fall',
//                         data: typeof responseMsg === 'string' ? responseMsg : (responseMsg as any).message
//                     };
//                 } 
//                 throw err;
//             })
//         )
//     };
// };