import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Location from './models/location.js';
import { port, DB_URL } from './config/config.js';

mongoose.connect(DB_URL)
    .then(()=>{
        console.log('MongoDB 연결 성공');
    })
    .catch((err)=>{
        console.error('MongoDB 연결 실패', err);
    });

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/locations', async (req, res)=>{
    const locations = await Location.find({});
    res.json(locations);
});

app.post('/locations', async (req, res)=>{
    const location = new Location(req.body);
    await location.save();
    res.json({success:true, redirect:location._id});
})

app.get('/locations/:id', async (req, res)=>{
    const location = await Location.findById(req.params.id);
    res.json(location); 
})

app.get('/locations/:id/edit', async (req, res)=>{
    const location = await Location.findById(req.params.id);
    res.json(location); 
})

app.put('/locations/:id', async (req, res)=>{
    const { id } = req.params;
    await Location.findByIdAndUpdate(id, {
        ...req.body
    })
    res.json({success:true});
})

app.delete('/locations/:id', async (req, res)=>{
    const { id } = req.params;
    await Location.findByIdAndDelete(id);
    res.json({success:true});
})

app.listen(port, ()=>{
    console.log(`Serving on port ${port}`);
})