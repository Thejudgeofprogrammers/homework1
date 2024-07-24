import { Container } from "inversify";
import { 
    AppController, 
    AppService, 
    AuthController, 
    AuthService, 
    BooksController, 
    BooksService, 
    UsersController, 
    UsersService 
} from "../../modules";

const container = new Container();

container.bind<AppController>(AppController).to(AppController);
container.bind<AppService>(AppService).to(AppService);
container.bind<AuthController>(AuthController).to(AuthController);
container.bind<AuthService>(AuthService).to(AuthService);
container.bind<BooksController>(BooksController).to(BooksController);
container.bind<BooksService>(BooksService).to(BooksService);
container.bind<UsersController>(UsersController).to(UsersController);
container.bind<UsersService>(UsersService).to(UsersService);

export { container };
