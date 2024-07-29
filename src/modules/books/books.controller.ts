import { Controller, Get, Post, Put, Delete, Param, Body, Req, Res, HttpStatus } from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDTO } from './dto/book.dto';
import { Request, Response } from 'express';
import { Types } from 'mongoose';

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
            const userId = req.user?._id;
            if (!userId) {
                res.status(HttpStatus.UNAUTHORIZED).json({ message: 'User not authenticated' });
                return;
            };
            const books = await this.booksService.getAllBooks(userId);
            res.status(HttpStatus.OK).json(books);
        } catch (err) {
            res.status(HttpStatus.NOT_FOUND).json({ message: err.message });
        };
    };

    @Post()
    async createBook(@Body() createBookDto: BookDTO, @Req() req: Request, @Res() res: Response): Promise<void> {
        try {
            const userId = req.user?._id;
            if (!userId) {
                res.status(HttpStatus.UNAUTHORIZED).json({ message: 'User not authenticated' });
                return;
            };
            createBookDto.owner = new Types.ObjectId(userId);
            await this.booksService.createBook(createBookDto);
            res.status(HttpStatus.CREATED).json({ message: 'Book created successfully' });
        } catch (err) {
            res.status(HttpStatus.BAD_REQUEST).json({ message: err.message });
        };
    };

    @Put(':id')
    async updateBook(@Param('id') id: string, @Body() updateBookDto: BookDTO, @Req() req: Request, @Res() res: Response): Promise<void> {
        try {
            if (updateBookDto.owner) {
                updateBookDto.owner = new Types.ObjectId(updateBookDto.owner);
            }
            await this.booksService.updateBook(id, updateBookDto);
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
