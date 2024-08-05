import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from '../../strategy';
import { UsersModule } from '../users/users.module';
import { TokenModule } from '../token/token.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
    controllers: [AuthController],
    providers: [ AuthService, JwtStrategy ],
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: process.env.SECRET,
            signOptions: { expiresIn: process.env.EXPIRE_JWT },
        }),
        UsersModule, TokenModule 
    ],
    exports: [PassportModule, JwtModule]
})
export class AuthModule {}
