import { Body, Controller, Delete, Get, Param, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import {  UserService } from "./user.service";
import { CreateUserDto } from "src/dto/user-create-dto";
import { UpdateUserDto } from "src/dto/user-update-dto";


@Controller('/user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('/add')
    addMap(@Body() dto: CreateUserDto) {
        return this.userService.createUser(dto);
    }

    @Get()
    getAll(){
        return this.userService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: number){
        return this.userService.getOne(id);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.userService.delete(id);
    }

    @Post('/update')
    async update(@Body() updateDto: UpdateUserDto) {
        return this.userService.update(updateDto);
    }
}