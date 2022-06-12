import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model  } from "mongoose";
import { LikedModel } from "../models/liked";

@Injectable()
export class LikedRepository {
    constructor(
        @InjectModel('liked')
        private readonly likeModel: Model<LikedModel>,
    ) {
     
    }
    public async likePost(postId: string, userId:string) {
        await this.likeModel.updateOne({ postId, userId }, { $set: { postId, userId }}, { upsert: true });
    }
}