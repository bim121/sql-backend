import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MachineController } from './machine.controller';
import { MachineService } from './machine.service';
import { Machine } from '../entity/machine.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Machine])],
  providers: [MachineService],
  controllers: [MachineController],
})

export class MachineModule{
    
}