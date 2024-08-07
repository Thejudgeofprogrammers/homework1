import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { BookCommentsService } from '../book-comments.service';
import { Server } from 'socket.io';
import IBookCommentDTO from '../interface/book-comment.dto';

@WebSocketGateway()
export class BookCommentsGateway {
    @WebSocketServer()
    server: Server;

    constructor(private readonly bookCommentsService: BookCommentsService) {};

    @SubscribeMessage('getAllComments')
    async handleGetAllComments(@MessageBody() bookId: string): Promise<IBookCommentDTO[]> {
        const comments = await this.bookCommentsService.findAllComments(bookId);
        return comments;
    };

    @SubscribeMessage('addComment')
    async handleAddComment(@MessageBody() data: { bookId: string, comment: string }): Promise<IBookCommentDTO> {
        const newComment = await this.bookCommentsService.createComment(data.bookId, data.comment);
        this.server.emit('commentAdded', newComment);
        return newComment;
    };
};
