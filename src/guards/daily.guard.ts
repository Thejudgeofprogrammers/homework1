import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class DailyGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const date = new Date;
        if (date.getHours() > 12) {
            return false;
        };
        return true;
    }; 
};