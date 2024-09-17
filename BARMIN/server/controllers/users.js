import User from '../models/user.js';

const register = async (req, res, next) => {
    try {
        const { email, username, password} = req.body;
        const user = new User({email, username});
        const registeredUser = await User.register(user, password)
        req.login(registeredUser, err => {
            if (err) {
                return next(err);
            }
            console.log("아이디 등록 성공");
        })
    }
    catch (err) {
        console.log('아이디 등록 실패', err);
    }
};

export default { register };
