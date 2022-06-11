import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import config from "src/config";
import { UserModule } from "src/user/user.module";
import { PostsRepository } from "./posts.repository";
import { PostResolver } from "./posts.resolver";
import { PostSchema } from "./schemas/post.schema";
import { PostsService } from "./schemas/posts.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'post', schema: PostSchema }
        ]),
        UserModule,
        JwtModule.register({
            secret: config.jwt.jwtSecret,
            signOptions: {
              expiresIn: config.jwt.jwtExpire,
            },
        }),
    ],
    providers: [ PostResolver, PostsService, PostsRepository ]
})
export class PostsModule {}