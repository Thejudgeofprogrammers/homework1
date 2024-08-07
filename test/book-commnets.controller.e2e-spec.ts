import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { BookCommentsService } from '../src/modules/book.comments/book-comments.service';
import { BookCommentsController } from '../src/modules/book.comments/book-comments.controller';


const mockBookComment = {
    _id: '66afb2c1d13177c17183d4a1',
    bookId: '66afb2c1d13177c17183d4a2',
    comment: "hello",
};

describe('BookCommentsController (e2e)', () => {
let app: INestApplication;

beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
    controllers: [BookCommentsController],
    providers: [{
        provide: BookCommentsService,
        useValue: {
            createComment: jest.fn().mockResolvedValue(mockBookComment),
            findAllComments: jest.fn().mockResolvedValue([mockBookComment]),
            updateComment: jest.fn().mockResolvedValue(mockBookComment),
            deleteComment: jest.fn().mockResolvedValue(mockBookComment),
        }}],
        })
        .compile();
            
        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/api/books/comments/bookId (GET)', () => {
        return request(app.getHttpServer())
            .get('/api/books/comments/bookId')
            .expect(200)
            .expect([mockBookComment]);
    });

    it('/api/books/comments (POST)', () => {
        return request(app.getHttpServer())
            .post('/api/books/comments')
            .send(mockBookComment)
            .expect(201)
            .expect((res) => {
                expect(res.body.message).toEqual('Комментарий успешно создан');
                expect(res.body.data).toMatchObject(mockBookComment);
            });
    });

    it('/api/books/comments/id (PUT)', () => {
        return request(app.getHttpServer())
            .put('/api/books/comments/id')
            .send(mockBookComment)
            .expect(200)
            .expect({ message: 'Комментарий успешно обновлён' });
    });

    it('/api/books/comments/id (DELETE)', () => {
        return request(app.getHttpServer())
            .delete('/api/books/comments/id')
            .expect(200)
            .expect({ message: 'Комментарий успешно удалён' });
    });

    afterAll(async () => {
        await app.close();
    });
});