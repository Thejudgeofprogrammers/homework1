import { ContainerModule, interfaces } from "inversify";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

const UsersModule: ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    bind<UsersController>(UsersController).toSelf();
    bind<UsersService>(UsersService).toSelf();
});

export { UsersModule };
