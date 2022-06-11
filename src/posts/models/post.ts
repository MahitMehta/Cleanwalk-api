import { Field, ObjectType } from "@nestjs/graphql";
import { IUserModel } from "src/user/interfaces/user.interface";
import { User } from "src/user/models/user.model";


@ObjectType()
export class Point {
    @Field(() => String)
    type: string;
    @Field(() => [ Number ])
    coordinates: Array<Number>
}

@ObjectType()
export class Post {
    @Field(() => String)
    description: string;
    @Field(() => Point)
    location: Point
    @Field(() => String)
    userId: string;
    @Field(() => Date)
    createdAt: Date
    @Field(() => Date)
    updatedAt: Date;
}

@ObjectType()
export class AggregatedPost extends Post{
    @Field(() => User)
    user: IUserModel
}