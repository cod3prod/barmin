import mongoose from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose';

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    role: {
        type:String,
        required: true,
    },
    email: {
        type: String,
        requred: true,
        unique: true
    }
});

UserSchema.plugin(passportLocalMongoose);

export default mongoose.model('User', UserSchema);