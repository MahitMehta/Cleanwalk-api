import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model  } from "mongoose";
import { CreatePostDTO } from "../dtos/createPost.dto";
import type { IPostModel} from "../interfaces/post.interface";

@Injectable()
export class PostsRepository {
    constructor(
        @InjectModel('post')
        private readonly postModel: Model<IPostModel>,
    ){}

    public async getPosts() : Promise<IPostModel[]> {
        const res = await this.postModel.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }   
            },
            {
                $unwind: { path: "$user", preserveNullAndEmptyArrays: true }
            },
            {
                $sort: {
                    updatedAt: -1,
                }
            }
        ])
        return res; 
    }

    public async createPost({ description, imageURL, latitude, longitude }: CreatePostDTO, userId:string) { 
        return await this.postModel.create({
            description,
            userId,
            location: {
                type: "Point",
                coordinates: [ longitude, latitude ]
            }
        });
    }
}