import { ContainerModule, interfaces } from "inversify";
import { BooksController } from "./books.controller";
import { BooksService } from "./books.service";

const BooksModule: ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    bind<BooksController>(BooksController).toSelf();
    bind<BooksService>(BooksService).toSelf()
});

export { BooksModule };