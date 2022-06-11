import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreatePostDTO {
  @Field(() => String)
  description: string;
  @Field(() => String, { nullable: true })
  imageURL?: string;
  @Field(() => Number)
  latitude: number;
  @Field(() => Number)
  longitude: number;
}