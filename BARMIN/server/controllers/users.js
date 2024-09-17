import User from '../models';

const register = async (req, res, next) => {
    try {
        const { email, username, password} = req.body;
        const user = new User({email, username});
        const registeredUser = await User.register(user, password)
        console.log('아이디 등록 완료');
    }
    catch (err) {
        console.log('아이디 등록 실패', err);
    }
};
