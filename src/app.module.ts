import { Module } from '@nestjs/common';
import {  UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    PostModule
    ],
  controllers: [],
  providers: [],
})

export class AppModule {}