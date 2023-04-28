import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateShopDto } from "src/dto/shop-create-dto";
import { UpdateShopDto } from "src/dto/shop-update-dto";
import { Shop } from "src/entity/shop.entity";
import { Repository } from "typeorm";

@Injectable()
export class ShopService {
    constructor(
        @InjectRepository(Shop)    
        private readonly shopRepo: Repository<Shop> ) {}

    async createUser(shopDto: CreateShopDto): Promise<Shop> {    
        const { name, type, owner} = shopDto;
        
        const shopInDb = await this.shopRepo.findOne({ 
            where: { name } 
        });

        if (shopInDb ) {
            throw new HttpException('Shop already exists', HttpStatus.BAD_REQUEST);    
        }

        const shop: Shop = await this.shopRepo.create({ name, type, owner });
        await this.shopRepo.save(shop);
        return shop;  
    }

    async getAll(): Promise<Shop[]> {
        return this.shopRepo.find();
    }

    async getOne(id: number): Promise<Shop> {
        return this.shopRepo.findOneBy({ id });
    }

    async delete(id: number): Promise<void> {
        await this.shopRepo.delete({id});
    }

    async update(updateDto: UpdateShopDto): Promise<Shop> {
        const {id, name} = updateDto
        await this.shopRepo.update(id, { name: name });
        return this.shopRepo.findOneBy({ id });
    }

}