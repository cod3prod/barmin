import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ReviewSchema = new Schema({
    body: String,
    rating: { type: Number, required: true, min: 1, max: 5 },
    author : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviewDate: { type: Date, default: Date.now }
});

export default mongoose.model('Review', ReviewSchema);