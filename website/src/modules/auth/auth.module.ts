import { ContainerModule, interfaces } from "inversify";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

const AuthModule: ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    bind<AuthController>(AuthController).toSelf();
    bind<AuthService>(AuthService).toSelf();
});

export { AuthModule };