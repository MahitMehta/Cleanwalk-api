import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { AggregatedPost, Post as PostModel } from "./models/post";
import { PostsService } from "./schemas/posts.service";
import { CreatePostDTO } from "./dtos/createPost.dto";
import { UserId } from "src/user/decorators/user.decorator";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/guards/auth.guard";

@Resolver(() => PostModel)
export class PostResolver {
    constructor(
        private readonly postsService: PostsService
    ){}

    @UseGuards(AuthGuard)
    @Mutation(() => PostModel)
    public async createPost(@Args('input') input : CreatePostDTO, @UserId() userId) {
        return await this.postsService.createPost(input, userId);
    }

    @UseGuards(AuthGuard)
    @Mutation(() => Boolean)
    public async likePost(@Args("postId") postId : string, @UserId() userId){
        await this.postsService.likedPost(postId, userId);
        return true;
    }

    @Query(() => [ AggregatedPost ])
    public async getPosts() {
        return await this.postsService.getPosts();
    }
}