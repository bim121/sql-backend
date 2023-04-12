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
        const { username, password, email} = userDto;
        
        const userInDb = await this.userRepo.findOne({ 
            where: { username } 
        });

        if (userInDb ) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);    
        }

        const user: User = await this.userRepo.create({ username, password, email });
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
        const {id, username} = updateDto
        await this.userRepo.update(id, { username: username });
        return this.userRepo.findOneBy({ id });
    }

}