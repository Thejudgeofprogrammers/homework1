import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BookComment, BookCommentDocument } from './schemas/book-comment.schema';
import IBookCommentDTO from './interface/book-comment.dto';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class BookCommentsService {
    constructor(
        @InjectModel(BookComment.name) private readonly bookCommentModel: Model<BookCommentDocument>,
    ) {};

        async createComment(bookId: string, comment: string): Promise<IBookCommentDTO> {
            try {
                const newComment = await this.bookCommentModel.create({ bookId: new Types.ObjectId(bookId), comment });
                return await newComment.save();
            } catch (err) {
                console.error('Коммнтарий не создан', err);
                throw new WsException('Ошибка создания комментария');
            };
        };

        async findAllComments(bookId: string): Promise<IBookCommentDTO[]> {
            try {
                const comments = await this.bookCommentModel.find({ bookId: new Types.ObjectId(bookId) }).select('-__v').exec();
                return Promise.all(comments);
            } catch (err) {
                console.error('Коммнтарии не найдены', err);
                throw new WsException('Ошибка поиска комментариев');
            };
        };

        async updateComment(id: string, updateData: Partial<{ comment: string}>): Promise<IBookCommentDTO> {
            try {
                    if (!updateData) {
                        throw new WsException('Комментарий не найден');
                    }
                    return await this.bookCommentModel.findByIdAndUpdate(new Types.ObjectId(id), updateData, { new: true }).select('-__v').exec();
            } catch (err) {
                console.error('Коммнтарий не обновлён', err);
                throw new WsException('Ошибка обновления комментария');
            };
        };

        async deleteComment(id: string): Promise<IBookCommentDTO> {
            try {
                const deletedComment = await this.bookCommentModel.findByIdAndDelete(new Types.ObjectId(id)).select('-__v').exec();;
        
                if (!deletedComment) {
                    throw new WsException('Комментарий не найден');
                };
        
                return deletedComment;
            } catch (err) {
                console.error('Комментарий не удалён', err);
                throw new WsException('Ошибка удаления комментария');
            };
        };
};
