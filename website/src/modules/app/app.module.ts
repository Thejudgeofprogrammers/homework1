import { ContainerModule, interfaces } from "inversify";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

const AppModule: ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    bind<AppController>(AppController).toSelf();
    bind<AppService>(AppService).toSelf();
});

export { AppModule };
