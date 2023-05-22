import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "src/dto/user-create-dto";
import { UpdateUserDto } from "src/dto/user-update-dto";
import { User } from "src/entity/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)    
        private readonly userRepo: Repository<User> ) {}

    async createUser(userDto: CreateUserDto): Promise<User> {    
        const { name, password, email} = userDto;
        
        const userInDb = await this.userRepo.findOne({ 
            where: { name } 
        });

        if (userInDb ) {
            throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);    
        }

        const user: User = await this.userRepo.create({ name, password, email });
        await this.userRepo.save(user);
        return user;  
    }

    async getAll(): Promise<User[]> {
        return this.userRepo.find();
    }

    async getOne(id: number): Promise<User> {
        return this.userRepo.findOneBy({ id });
    }

    async delete(id: number): Promise<void> {
        await this.userRepo.delete({id});
    }

    async update(updateDto: UpdateUserDto): Promise<User> {
        const {id, name} = updateDto
        await this.userRepo.update(id, { name: name });
        return this.userRepo.findOneBy({ id });
    }

}