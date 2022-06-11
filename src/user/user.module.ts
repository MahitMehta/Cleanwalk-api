import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./schemas/user.schema";
import { UserRepository } from "./repositories/user.repository";
import { UserService } from "./user.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'user', schema: UserSchema }
        ]),
    ],
    providers: [ UserService, UserRepository ],
    exports: [ UserService, UserRepository ]
})
export class UserModule {}