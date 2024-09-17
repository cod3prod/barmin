import mongoose from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    joinedDate: { type: Date, default: Date.now }
});

UserSchema.plugin(passportLocalMongoose);

export default mongoose.model('User', UserSchema);