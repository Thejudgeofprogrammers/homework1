import { Controller, Get, Post, Put, Delete, Param, Body, Req, Res, HttpStatus } from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDTO } from './dto/book.dto';
import { Request, Response } from 'express';

@Controller('api/books')
export class BooksController {
    constructor(private readonly booksService: BooksService) {}
    
    @Get(':id')
    async getBook(@Param('id') id: string, @Req() req: Request, @Res() res: Response): Promise<void>  {
        try {
            const book = await this.booksService.getBook(id);
            res.status(HttpStatus.OK).json(book);
        } catch (err) {
            res.status(HttpStatus.NOT_FOUND).json({ message: err.message });
        };
    };

    @Get()
    async getAllBooks(@Req() req: Request, @Res() res: Response): Promise<void>  {
        try {
            const books = await this.booksService.getAllBooks(req.user._id);
            res.status(HttpStatus.OK).json(books);
        } catch (err) {
            res.status(HttpStatus.NOT_FOUND).json({ message: err.message });
        };
    };

    @Post()
    async createBook(@Body() createBookDto: BookDTO, @Req() req: Request, @Res() res: Response): Promise<void> {
        try {
            createBookDto.owner = req.user._id;
            await this.booksService.createBook(createBookDto);
            res.status(HttpStatus.CREATED).json({ message: 'Book created successfully' });
        } catch (err) {
            res.status(HttpStatus.BAD_REQUEST).json({ message: err.message });
        };
    };

    @Put(':id')
    async updateBook(@Param('id') id: string, @Body() createBookDto: BookDTO, @Req() req: Request, @Res() res: Response): Promise<void> {
        try {
            await this.booksService.updateBook(id, createBookDto);
            res.status(HttpStatus.OK).json({ message: 'Book updated successfully' });
        } catch (err) {
            res.status(HttpStatus.BAD_REQUEST).json({ message: err.message });
        };
    };

    @Delete(':id')
    async deleteBook(@Param('id') id: string, @Req() req: Request, @Res() res: Response): Promise<void> {
        try {
            await this.booksService.deleteBook(id);
            res.status(HttpStatus.OK).json({ message: 'Book deleted successfully' });
        } catch (err) {
            res.status(HttpStatus.BAD_REQUEST).json({ message: err.message });
        };
    };
};
