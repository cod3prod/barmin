import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    title : String,
    image : String,
    address : String,
    coordinates: {
        latitude: { type: Number },
        longitude: { type: Number }
    },
    description : String,
    author : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews : [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

export default mongoose.model('Location', LocationSchema);