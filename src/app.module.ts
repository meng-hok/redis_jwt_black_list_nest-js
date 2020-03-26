import { Module ,NestModule, MiddlewareConsumer} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { JWTBlacklistTokenPrevention } from './auth/middleware/jwt-token-checking.middleware';
// import ConfigService from './configuration/ConfigService';
import { RedisModule} from 'nestjs-redis'
import { NestSessionOptions, SessionModule } from 'nestjs-session';
import { ExpressSessionMiddleware } from '@nest-middlewares/express-session';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    AuthModule,
    SessionModule.forRoot({  session: { secret: 'keyboard cat' }}),
  ],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer){
   
    consumer
      .apply(JWTBlacklistTokenPrevention)
      .exclude("/auth/login","/auth/logout","/auth/register")
      .forRoutes("/")
  } 
}
