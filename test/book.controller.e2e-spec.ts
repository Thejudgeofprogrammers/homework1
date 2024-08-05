import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { BooksController } from '../src/modules/books/books.controller';
import { BooksService } from '../src/modules/books/books.service';
import { MockJwtAuthGuard } from './jwt-auth.guard.mock';
import { JwtAuthGuard } from '../src/guards/jwt-guard';

const mockBook = {
    _id: '66afb2c1d13177c17183d4a1',
    title: 'Test Book',
    description: 'book',
    authors: 'John',
    favorite: false,
    fileCover: '',
    fileName: '',
    owner: '66afb2c1d13177c17183d4a2',
    isPublished: false,
    count: 0,
};

describe('BooksController (e2e)', () => {
let app: INestApplication;

beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
    controllers: [BooksController],
    providers: [{
        provide: BooksService,
        useValue: {
            getBook: jest.fn().mockResolvedValue(mockBook),
            getAllBooks: jest.fn().mockResolvedValue([mockBook]),
            createBook: jest.fn().mockResolvedValue(mockBook),
            updateBook: jest.fn().mockResolvedValue(mockBook),
            deleteBook: jest.fn().mockResolvedValue(mockBook)
        }}],
        })
        .overrideGuard(JwtAuthGuard)
        .useClass(MockJwtAuthGuard)
        .compile();
            
        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/api/books/:id (GET)', () => {
        return request(app.getHttpServer())
            .get('/api/books/mockId')
            .expect(200)
            .expect(mockBook);
    });

    it('/api/books (GET)', () => {
        return request(app.getHttpServer())
            .get('/api/books')
            .expect(200)
            .expect([mockBook]);
    });

    it('/api/books (POST)', () => {
        return request(app.getHttpServer())
            .post('/api/books')
            .send(mockBook)
            .expect(201)
            .expect((res) => {
                expect(res.body.message).toEqual('Книга успешно создана');
                expect(res.body.book).toMatchObject(mockBook);
            });
    });

    it('/api/books/:id (PUT)', () => {
        return request(app.getHttpServer())
            .put('/api/books/mockId')
            .send(mockBook)
            .expect(200)
            .expect({ message: 'Книга успешно обновлена' });
    });

    it('/api/books/:id (DELETE)', () => {
        return request(app.getHttpServer())
            .delete('/api/books/mockId')
            .expect(200)
            .expect({ message: 'Книга успешно удалена' });
    });

    afterAll(async () => {
        await app.close();
    });
});