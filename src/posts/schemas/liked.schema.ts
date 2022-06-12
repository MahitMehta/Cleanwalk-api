import * as mongoose from "mongoose";

const LikedSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, required: true },
    postId: { type: mongoose.Types.ObjectId, required: true },
}, {
    timestamps: true
})

export { LikedSchema }