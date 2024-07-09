import { Container } from "inversify";
import { BooksRepository } from "./booksRepository";
import { BooksRepositoryImplements } from './booksRepositoryImplements';

const container = new Container();
container.bind(BooksRepository).toSelf()
// container.bind<BooksRepository>(BooksRepository).to(BooksRepositoryImplements);

export { container };