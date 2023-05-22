import { Body, Controller, Delete, Get, Param, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { CreatePostDto } from "src/dto/post-create-dto";
import { PostService } from "./post.service";
import { UpdatePostDto } from "src/dto/post-update-dto";


@Controller('/post')
export class PostController {
    constructor(private readonly postService: PostService) { }

    @Post('/add')
    addMap(@Body() dto: CreatePostDto) {
        return this.postService.createPost(dto);
    }

    @Get()
    getAll(){
        return this.postService.getAll();
    }

    @Get(':id')
    getAllPostsByUserId(@Param('id') id: number){
        return this.postService.getAllPostsByUserId(id);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.postService.delete(id);
    }

    @Post('/update')
    async update(@Body() updateDto: UpdatePostDto) {
        return this.postService.update(updateDto);
    }
}