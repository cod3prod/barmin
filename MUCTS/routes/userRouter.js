// 회원정보를 DB에 연결해서 관리하는 라우터
const express = require("express")
const router = express.Router();

// mysql db와 연결
const conn = require("../config/db");

// 회원가입 경로로 접근했을 때!
router.post("/join", (req, res) => {
    // 요청 본문에서 데이터 추출
    const { user_id, pw, name, nick, addr_code, addr_jibun, addr_detail, email, birth_date, gender, tel, wd_account, ba_number } = req.body;

    // 주소 정보를 합침
    let address = `${addr_code} ${addr_jibun} ${addr_detail}`;

    console.log("데이터 확인!", req.body);
    
    // SQL 쿼리문 작성
    const sql = `
        INSERT INTO User_TB (user_id, pw, name, nick, address, email, birth_date, gender, tel, point, wd_account, ba_number)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?)
    `;

    // 쿼리 실행
    conn.query(sql, [user_id, pw, name, nick, address, email, birth_date, gender, tel, wd_account, ba_number], (err, results) => {
        if (err) {
            console.error("Database insertion error: ", err);
            res.send("<script>alert('회원가입 실패..'); history.back();</script>");
        } else {
            console.log("Insert 결과값 : ", results);
            res.send(`
                <script>
                    alert('회원가입 성공!');
                    window.location.href='/login';
                </script>`
            );
        }
    });
});

router.post("/login", (req, res) => {
    console.log("넘어온 데이터", req.body);
    let { user_id, pw } = req.body;

    let sql = "select * from User_TB where user_id=? and pw=?";

    conn.query(sql, [user_id, pw], (err, rows) => {

        console.log("select 결과값: ", rows);

        if (rows.length > 0) {
            console.log(rows[0]);
            req.session.user_id = rows[0].user_id;
            req.session.nick = rows[0].nick;
            res.send(`
                <script>
                    alert('로그인 성공: ${rows[0].nick}님 환영합니다!');
                    window.location.href='/';
                </script>
            `)
        } else {
            res.send("<script>alert('로그인 실패..'); history.back();</script>");
        }
    });
});



router.get("/myPage", (req, res) => {
    console.log(req.session.user_id);
    let user_id = req.session.user_id;
    let sql = "select * from User_TB where user_id=?";

    conn.query(sql, [user_id], (err, rows) => {


        if (rows.length > 0) {

            // 날짜 포멧팅 해주는 함수
            function formatDate(date) {
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                let hours = date.getHours();
                const minutes = String(date.getMinutes()).padStart(2, '0');
                const ampm = hours >= 12 ? '오후' : '오전';
                hours = hours % 12;
                hours = hours ? String(hours).padStart(2, '0') : '12';

                return `${year}년 ${month}월 ${day}일 ${ampm} ${hours}:${minutes}`;
            }

            const joinDate = new Date(rows[0].user_date);
            const formattedJoinDate = formatDate(joinDate);
            res.render("myPage",
                {
                    user: rows[0],
                    user_date: formattedJoinDate
                });
        } else {
            res.render("myPage", { user: null });
        }
    })
})

router.get("/changeInfo",(req,res)=>{
    console.log(req.session.user_id);
    let user_id = req.session.user_id;
    let sql = "select * from User_TB where user_id=?";

    conn.query(sql, [user_id], (err, rows) => {
        if (rows.length > 0) {
            console.log(rows[0]);
            res.render("changeInfo", { user: rows[0] });
        } else {
            res.render("changeInfo", { user: null });
        }
    })
})





router.post("/changeInfo", (req, res) => {
    // 요청 본문에서 데이터 추출
    const { pw, name, nick, email, addr_code, addr_jibun, addr_detail, tel, wd_account, ba_number } = req.body;
    const user_id = req.session.user_id;
    let address = `${addr_code} ${addr_jibun} ${addr_detail}`;

    console.log("수정할 데이터 확인:", req.body);

    // SQL 쿼리문 작성
    const sql = `
        UPDATE User_TB 
        SET
            pw = ?,
            name = ?,
            nick = ?,
            email = ?,
            address = ?,
            tel = ?,
            wd_account = ?,
            ba_number = ?
        WHERE user_id = ?;
    `;

    // 쿼리 실행
    conn.query(sql, [pw, name, nick, email, address, tel, wd_account, ba_number, user_id], (err, result) => {
        if (err) {
            console.error("SQL 실행 중 오류 발생:", err);
            res.status(500).send("서버 오류가 발생했습니다.");
        } else if (result.affectedRows > 0) {
            console.log("변경 성공!", result);
            res.send(`
                <script>
                    alert('회원정보 수정성공!');
                    window.location.href='/user/myPage';
                </script>
            `)
        } else {
            console.log("변경 없음!", result);
            res.status(400).send("변경된 내용이 없습니다.");
        }
    });
});


module.exports = router;