import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateMachineDto } from "src/dto/machine-create-dto";
import { UpdateMachineDto } from "src/dto/machine-update-dto";
import { Machine } from "src/entity/machine.entity";
import { Repository } from "typeorm";

@Injectable()
export class MachineService {
    constructor(
        @InjectRepository(Machine)    
        private readonly machineRepo: Repository<Machine> ) {}

    async createUser(machineDto: CreateMachineDto): Promise<Machine> {    
        const { name, model, brand} = machineDto;
        
        const machineInDb = await this.machineRepo.findOne({ 
            where: { name } 
        });

        if (machineInDb ) {
            throw new HttpException('machine already exists', HttpStatus.BAD_REQUEST);    
        }

        const machine: Machine = await this.machineRepo.create({ name, model, brand });
        await this.machineRepo.save(machine);
        return machine;  
    }

    async getAll(): Promise<Machine[]> {
        return this.machineRepo.find();
    }

    async getOne(id: number): Promise<Machine> {
        return this.machineRepo.findOneBy({ id });
    }

    async delete(id: number): Promise<void> {
        await this.machineRepo.delete({id});
    }

    async update(updateDto: UpdateMachineDto): Promise<Machine> {
        const {id, name} = updateDto
        await this.machineRepo.update(id, { name: name });
        return this.machineRepo.findOneBy({ id });
    }

}