const express = require("express");
const router = express.Router();
const conn = require('../config/db');


router.get("/", (req, res) => {
    res.render("main",
        { user : req.session.user_id }
    );
});


// 방 목록 가져오기
router.get("/getPartyList", (req, res) => {
    const sql = `
    select * from Party_TB where party_status=1
    `;
    
    // 쿼리 실행
    conn.query(sql, (err, results) => {
        if (err) {
            console.error("메인 라우터에서 방목록 DB 불러오기 실패", err);
            return;
        }
        else {
            res.json(results);
        }
    });
})


// 사용자가 회원가입을 요청했을 때!
router.get("/join",(req,res)=>{
    res.render("join");
})

//  사용자가 로그인을 요청했을 때
router.get("/login",(req,res)=>{
    res.render("login");
})

// 사용자가 로그아웃을 요청했을 때
router.get("/logout",(req,res)=>{
    req.session.destroy();
    res.redirect("/");
})




router.get("/charge",(req,res)=>{
    res.render("charge");
})
module.exports = router;