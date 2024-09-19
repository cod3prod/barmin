import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config.js';

const register = async (req, res, next) => {
    try {
        const { email, username, password} = req.body;
        const user = new User({email, username});
        const registeredUser = await User.register(user, password)
        const { _id } = registeredUser;
        const token = jwt.sign({ _id, username }, JWT_SECRET, { expiresIn: '1h' });
        req.login(registeredUser, err => {
            if (err) {
                return next(err);
            }
            console.log("아이디 등록 성공");
            res.json({ success: true, message: 'Registration successful', token });
        })
    }
    catch (err) {
        console.log('아이디 등록 실패', err);
        res.json({ success: false, message: err });
    }
};

const login = (req, res) => {
    const { _id, username } = req.user
    const token = jwt.sign({ _id, username }, JWT_SECRET, { expiresIn : '1h'});
    res.json({ success: true, message: "환영합니다", token});
}

const logout = (req, res) => {
    req.logout();
    res.json({ success: true, message: "안녕히가세요"});
}

export default { register, login, logout };
