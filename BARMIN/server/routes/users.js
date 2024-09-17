import express from 'express';
import wrapAsync from '../utils/wrapAsync.js';
import User from '../models/user.js';

const router = express.Router();

router.route('/register')
    .post(catchAsync())