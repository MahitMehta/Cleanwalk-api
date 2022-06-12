import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import config from "src/config";
import { UserModule } from "src/user/user.module";
import { PostsRepository } from "./repositories/posts.repository";
import { PostResolver } from "./posts.resolver";
import { LikedSchema } from "./schemas/liked.schema"
import { PostSchema } from "./schemas/post.schema";
import { PostsService } from "./schemas/posts.service";
import { LikedRepository } from "./repositories/liked.repository";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'post', schema: PostSchema },
            { name: 'liked', schema: LikedSchema }
        ]),
        UserModule,
        JwtModule.register({
            secret: config.jwt.jwtSecret,
            signOptions: {
              expiresIn: config.jwt.jwtExpire,
            },
        }),
    ],
    providers: [ PostResolver, PostsService, PostsRepository, LikedRepository ]
})
export class PostsModule {}