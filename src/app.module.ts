import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'user.db',
      entities: [User],
      synchronize: true, 
    }),
    UserModule,
    ],
  controllers: [],
  providers: [],
})

export class AppModule {}