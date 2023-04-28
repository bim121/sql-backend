import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CreateShopDto } from "src/dto/shop-create-dto";
import { ShopService } from "./shop.service";
import { UpdateShopDto } from "src/dto/shop-update-dto";


@Controller('/shop')
export class ShopController {
    constructor(private readonly shopService: ShopService) { }

    @Post('/add')
    addMap(@Body() dto: CreateShopDto) {
        return this.shopService.createUser(dto);
    }

    @Get()
    getAll(){
        return this.shopService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: number){
        return this.shopService.getOne(id);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.shopService.delete(id);
    }

    @Post('/update')
    async update(@Body() updateDto: UpdateShopDto) {
        return this.shopService.update(updateDto);
    }
}