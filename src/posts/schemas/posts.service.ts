import { Injectable } from "@nestjs/common";
import { CreatePostDTO } from "../dtos/createPost.dto";
import { PostsRepository } from "../posts.repository";

@Injectable()
export class PostsService {
    constructor(
        private readonly postsRepo: PostsRepository,
    ){}

    public async getPosts() {
        return await this.postsRepo.getPosts();
    }

    public async createPost(input: CreatePostDTO, userId:string) {
        return await this.postsRepo.createPost(input, userId);
    }
}

