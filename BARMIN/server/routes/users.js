import express from 'express';
import wrapAsync from '../utils/wrapAsync.js';
import users from '../controllers/users.js';
import passport from 'passport';

const router = express.Router();

router.post('/register',wrapAsync(users.register));

router.post('/login', passport.authenticate('local'), users.login );

router.get('/logout', users.logout);

export default router;