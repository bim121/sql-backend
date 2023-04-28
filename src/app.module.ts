import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from './entity/shop.entity';
import { ShopModule } from './user/shop.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'shop.db',
      entities: [Shop],
      synchronize: true, 
    }),
    ShopModule,
    ]
})

export class AppModule {}