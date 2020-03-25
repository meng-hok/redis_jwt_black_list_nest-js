import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/users/user.module';
import { UserService } from 'src/users/user.service';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  imports: [
    UserModule, 
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '60s'},
    }),
  ],
})
export class AuthModule {}
