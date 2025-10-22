import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import configuration from '@config/configuration';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    MongooseModule.forRoot(configuration().mongoUri),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
