import express from 'express';
import wrapAsync from '../utils/wrapAsync.js';
import users from '../controllers/users.js';
import passport from 'passport';

const router = express.Router();

router.route('/register')
    .post(wrapAsync(users.register));

// router.route('/login')
//     .post(passport.authenticate('local', {
//         failureFlash: true,
//         failureRedirect: '/login'
//     }), users.login );

// router.get('/logout', users.logout);

export default router;