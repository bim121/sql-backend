import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreatePostDto } from "src/dto/post-create-dto";
import { UpdatePostDto } from "src/dto/post-update-dto";
import { CreateUserDto } from "src/dto/user-create-dto";
import { UpdateUserDto } from "src/dto/user-update-dto";
import { Post } from "src/entity/post.entity";
import { User } from "src/entity/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)    
        private readonly postRepo: Repository<Post> ) {}

    async createPost(postDto: CreatePostDto): Promise<Post> {    
        const { title, userId} = postDto;
        
        const postInDb = await this.postRepo.findOne({ 
            where: { title } 
        });

        if (postInDb ) {
            throw new HttpException('post already exists', HttpStatus.BAD_REQUEST);    
        }

        const post: Post = await this.postRepo.create({ title });
        post.user = { id: userId } as User;
        await this.postRepo.save(post);
        return post;  
    }

    async getAll(): Promise<Post[]> {
        return this.postRepo.find();
    }

    async getOne(id: number): Promise<Post> {
        return this.postRepo.findOneBy({ id });
    }

    async delete(id: number): Promise<void> {
        await this.postRepo.delete({id});
    }

    async update(updateDto: UpdatePostDto): Promise<Post> {
        const {id, title} = updateDto
        await this.postRepo.update(id, { title: title });
        return this.postRepo.findOneBy({ id });
    }

    async getAllPostsByUserId(userId: number): Promise<Post[]> {
        return this.postRepo.find({ where: { user: { id: userId } } });
    }

}