const express = require('express');
const router = express.Router();
const conn = require("../config/db");

router.get('/', (req, res)=>{
    res.render('chat.html');
});

router.get('/session', (req, res) => {
    if(req.session.nick){
        console.log("chatRouter에서 닉네임을 보냈습니다!", req.session.nick)
        res.json({nick : req.session.nick, userId : req.session.user_id});
    }
    else{
        res.status(401).json({ message : '세션이 존재하지 않습니다!'});
    }
});

router.get('/db', (req, res)=>{
    if(req.session.user_id===undefined){
        console.log("chat에서 db 사용 중인데 세션 아이디가 존재하지 않음");
        res.json({point : 0}); // 게스트
        return ;
    }

    const sql = `
    select point from User_TB where user_id = ?
    `;
    
    // 쿼리 실행
    conn.query(sql, [req.session.user_id], (err, result) => {
        if (err) {
            console.error("chat 서버에서 DB 불러오기 실패", err);
            return;
        }
        else {
            res.json({point : result[0].point});
        }
    });

})

module.exports = router;