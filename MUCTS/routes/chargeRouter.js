const express = require("express");
const router = express.Router();
const conn = require("../config/db");


// 1.충전
router.post("/charge", (req, res) => {
    const user_id = req.session.user_id;
    if (!user_id) {
        return res.status(401).send('로그인이 필요합니다.');
    }

    let { charge_money } = req.body;
    console.log('Received data:', req.body); // 로그 추가
    charge_money = parseFloat(charge_money);

    if (isNaN(charge_money)) {
        console.error('유효하지 않은 금액:', charge_money);
        return res.status(400).send('유효하지 않은 금액입니다.');
    }

    // 1. 충전 기록을 Charge_TB에 추가
    let chargeSql = "INSERT INTO Charge_TB (user_id, charge_money) VALUES (?, ?)";
    conn.query(chargeSql, [user_id, charge_money], (err) => {
        if (err) {
            console.error('충전 기록 저장 오류:', err);
            return res.status(500).send('서버 오류');
        }

        // 2. User_TB에서 누적 금액 업데이트
        let updateSql = `
            UPDATE User_TB
            SET point = COALESCE(point, 0) + ?
            WHERE user_id = ?`;
        conn.query(updateSql, [charge_money, user_id], (err) => {
            if (err) {
                console.error('누적 금액 업데이트 오류:', err);
                return res.status(500).send('서버 오류');
            }
            res.status(200).send({ message: `${charge_money}원 충전완료` });
        });
    });
});


// 2. 금액 조회
router.post("/money", (req, res) => {
    const user_id = req.session.user_id;
    if (!user_id) {
        return res.status(401).send('로그인이 필요합니다.');
    }

    let selectSql = "SELECT point FROM User_TB WHERE user_id = ? LIMIT 1";
    conn.query(selectSql, [user_id], (err, rows) => {
        if (err) {
            console.error('데이터베이스 쿼리 오류:', err);
            return res.status(500).send('서버 오류');
        }

        if (rows.length > 0) {
            let remainingMoney = rows[0].point;  // 올바른 필드명을 사용
            res.send(`현재 금액: ${remainingMoney}`);
        } else {
            res.send('잔액 정보가 없습니다.');
        }
    });
});




// 3. 사용할 금액
router.post("/use", (req, res) => {
    const user_id = req.session.user_id;
    if (!user_id) {
        return res.status(401).json({ message: '로그인이 필요합니다.' });
    }

    let { charge_money } = req.body;
    charge_money = parseFloat(charge_money);

    if (isNaN(charge_money) || charge_money <= 0) {
        console.error('유효하지 않은 금액:', charge_money);
        return res.status(400).json({ message: '유효하지 않은 금액입니다.' });
    }

    // 1. User_TB에서 현재 포인트 조회
    let selectUserSql = "SELECT point FROM User_TB WHERE user_id = ? LIMIT 1";
    conn.query(selectUserSql, [user_id], (err, rows) => {
        if (err) {
            console.error('데이터베이스 쿼리 오류:', err);
            return res.status(500).json({ message: '서버 오류' });
        }

        if (rows.length > 0) {
            let currentPoints = rows[0].point;

            // 2. 포인트가 충분한지 확인
            if (currentPoints < charge_money) {
                console.log("잔액 부족");
                return res.status(400).json({ message: '잔액이 부족합니다.' });
            }

            // 3. Charge_TB에 음수 값으로 포인트 사용 기록 추가
            let insertChargeSql = "INSERT INTO Charge_TB (user_id, charge_money) VALUES (?, ?)";
            conn.query(insertChargeSql, [user_id, -charge_money], (err) => {
                if (err) {
                    console.error('포인트 사용 기록 저장 오류:', err);
                    return res.status(500).json({ message: '서버 오류' });
                }

                // 4. User_TB에서 포인트 차감
                let updateUserSql = `
                    UPDATE User_TB
                    SET point = point - ?
                    WHERE user_id = ?`;
                conn.query(updateUserSql, [charge_money, user_id], (err) => {
                    if (err) {
                        console.error('데이터베이스 쿼리 오류:', err);
                        return res.status(500).json({ message: '서버 오류' });
                    }

                    // 5. 최종 결과 응답
                    res.status(200).json({ message: `포인트 사용 완료! 남은 포인트: ${currentPoints - charge_money}` });
                });
            });
        } else {
            console.log("잔액 정보가 없음");
            return res.status(404).json({ message: '잔액 정보가 없습니다.' });
        }
    });
});


router.get("/charge", (req, res) => {
    console.log(req.session.user_id);
    let user_id = req.session.user_id;
    let sql = "select * from User_TB where user_id=?";

    conn.query(sql, [user_id], (err, rows) => {
        if (err) {
            console.error('쿼리 오류:', err);
            return res.status(500).send('서버 오류');
        }
        if (rows.length > 0) {
            console.log("가져온값",rows[0]);
            res.render("charge",
                {
                    charge: rows[0],
                    // user_date: formattedJoinDate
                    user : req.session.user_id
                });
        } else {
            res.render("charge", { charge: null });
        }
    })
})

// routes/chargeRouter.js
router.get('/history', (req, res) => {
    const user_id = req.session.user_id;
    if (!user_id) {
        return res.status(401).send('로그인이 필요합니다.');
    }

    // 포인트 내역을 가져오는 SQL 쿼리
    const sql = "SELECT charge_date, charge_money FROM Charge_TB WHERE user_id = ? ORDER BY charge_date DESC";
    conn.query(sql, [user_id], (err, rows) => {
        if (err) {
            console.error('데이터베이스 쿼리 오류:', err);
            return res.status(500).send('서버 오류');
        }

        // 결과를 JSON 형식으로 클라이언트에 반환
        console.log('historty의 마지막', rows); // 조아론이 만짐
        res.json(rows);
    });
});


module.exports = router;