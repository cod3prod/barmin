import express from 'express';
const router = express.Router();
import Location from '../models/location.js';

router.route('/')
    .get(async (req, res)=>{
        try {
            const locations = await Location.find({});
            res.json({ success: true, message: 'locations 불러오기 성공', locations });
        }
        catch(err) {
            console.log(err);
            res.json({ success:false, message: `locations 불러오기 실패 ${err}` })
        }
    })
    .post(async (req, res)=>{
        try{
            const location = new Location(req.body.location);
            await location.save();
            res.json({success : true, message : "철봉 위치 등록 완료"});
        }
        catch(err) {
            console.log(err);
            res.json({ success:false, message: `철봉 위치 등록 실패 ${err}`});
        }
    })

export default router;