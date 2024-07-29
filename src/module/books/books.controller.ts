import { Controller, Param, Body, Get, Post, Put, Delete } from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDTO } from './dto/book.dto';

@Controller('api/books')
export class BooksController {
    constructor(private readonly booksService: BooksService) {}
    
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<BookDTO>  {
        return this.booksService.findOne(id);
    };

    @Get()
    async findAll(): Promise<BookDTO[]>  {
        return this.booksService.findAll();
    };

    @Post()
    async createBook(@Body() createBookDto: BookDTO): Promise<void> {
        return this.booksService.createBook(createBookDto);
    };

    @Put(':id')
    async updateBook(@Param('id') id: string, @Body() createBookDto: BookDTO): Promise<void> {
        return this.booksService.updateBook(id, createBookDto);
    };

    @Delete(':id')
    async deleteBook(@Param('id') id: string): Promise<void> {
        return this.booksService.deleteBook(id);
    };
};
