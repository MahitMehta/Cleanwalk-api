import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class LikedModel {
    @Field(() => String)
    userId: string;
    @Field(() => String)
    postId: string; 
}