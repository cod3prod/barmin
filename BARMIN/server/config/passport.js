import LocalStrategy from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/user.js';
import { JWT_SECRET } from '../config/config.js';

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET
};

export default function (passport) {
    passport.use(new LocalStrategy(User.authenticate()));
    passport.use('jwt',
        new JwtStrategy(options, async (payload, done) => {
            try {
                const findUser = await User.findById(payload.id);
                if (findUser) {
                    return done(null, findUser);
                }
                else{
                    return done(null, false, { message : "해당 유저가 존재하지 않습니다."})
                }
            }
            catch(err) {
                done(err, false, { message : "에러가 발생했습니다."})
            }
        })
    )
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
}
