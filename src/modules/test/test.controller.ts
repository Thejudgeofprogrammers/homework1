// import { Body, Controller, Get, HttpException, HttpStatus, Post, UseFilters, UsePipes } from '@nestjs/common';
// import { ValidationPipe } from 'src/pipes/validation.pipe';
// import { CreateUserDTO } from './dto/test.user.dto';
// import { ValidationPipeUser } from 'src/pipes/validation.pipe.user';
// import { AllExceptionsFilter } from 'src/exceptions/all.exceptions.filter';

// @Controller('test')
// export class TestController {

//     @Get()
//     public getNewResponse(@Body() body: Request) {
//         return { body, message: 'Success response' };
//     };

//     @Get('error')
//     public getNewError() {
//         throw new HttpException('This controller get Error', HttpStatus.BAD_REQUEST);
//     };

//     @Get('name')
//     public getNameResponse(@Body(new ValidationPipe()) body: string) {
//         return { message: 'Request is valid', data: body}
//     }

//     @Post('create')
//     @UsePipes(ValidationPipeUser)
//     @UseFilters(AllExceptionsFilter)
//     public createUser(@Body() createUserDTO: CreateUserDTO) {
//         return { message: 'User create', data: createUserDTO };
//     };
// };
