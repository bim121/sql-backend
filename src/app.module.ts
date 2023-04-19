import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Machine } from './entity/machine.entity';
import { MachineModule } from './machine/machine.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'machine.db',
      entities: [Machine],
      synchronize: true, 
    }),
    MachineModule,
    ],
  controllers: [],
  providers: [],
})

export class AppModule {}