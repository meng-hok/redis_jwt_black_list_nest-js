import { Module ,NestModule, MiddlewareConsumer} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { JWTBlacklistTokenPrevention } from './auth/middleware/jwt-token-checking.middleware';
// import ConfigService from './configuration/ConfigService';
import { RedisModule} from 'nestjs-redis'

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    AuthModule,
    RedisModule.register({port: 6379,host:"127.0.0.1"}),
  ],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer){
    consumer
      .apply(JWTBlacklistTokenPrevention)
      .forRoutes("/")
  } 
}
