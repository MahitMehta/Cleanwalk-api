import { Injectable } from "@nestjs/common";
import { CreatePostDTO } from "../dtos/createPost.dto";
import { LikedRepository } from "../repositories/liked.repository";
import { PostsRepository } from "../repositories/posts.repository";

@Injectable()
export class PostsService {
    constructor(
        private readonly postsRepo: PostsRepository,
        private readonly likedRepo: LikedRepository,
    ){}

    public async getPosts() {
        return await this.postsRepo.getPosts();
    }

    public async createPost(input: CreatePostDTO, userId:string) {
        return await this.postsRepo.createPost(input, userId);
    }

    public async likedPost(postId: string, userId:string) {
        return await this.likedRepo.likePost(postId, userId);
    }
}

