import LocalStrategy from 'passport-local';
import User from '../models/user.js';
import { JWT_SECRET } from './config.js';

export default function (passport) {
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
}
