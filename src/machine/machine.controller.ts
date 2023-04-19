import { Body, Controller, Delete, Get, Param, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { CreateMachineDto } from "src/dto/machine-create-dto";
import { MachineService } from "./machine.service";
import { UpdateMachineDto } from "src/dto/machine-update-dto";


@Controller('/machine')
export class MachineController {
    constructor(private readonly machineService: MachineService) { }

    @Post('/add')
    addMap(@Body() dto: CreateMachineDto) {
        return this.machineService.createUser(dto);
    }

    @Get()
    getAll(){
        return this.machineService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: number){
        return this.machineService.getOne(id);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.machineService.delete(id);
    }

    @Post('/update')
    async update(@Body() updateDto: UpdateMachineDto) {
        return this.machineService.update(updateDto);
    }
}