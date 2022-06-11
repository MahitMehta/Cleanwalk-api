import * as mongoose from "mongoose";

const PointSchema = new mongoose.Schema({
    type: { type: String, required: true  },
    coordinates: { type: Array, required: true },
})

const PostSchema = new mongoose.Schema({
    description: { type: String, required: false, default: "" },
    location: { type: PointSchema, required: true },
    userId: { type: mongoose.Types.ObjectId, required: true }
})

PostSchema.index({ location: "2dsphere" })

export { PostSchema };