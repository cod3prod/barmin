// DB와 연결정보를 관리하는 공간
const mysql = require("mysql2");

// DB연결정보를 설정
const conn = mysql.createConnection({
    host : process.env.DB_HOST,
    port : process.env.DB_PORT,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE
});


// 연결 진행 !  이거는 모듈이다!
conn.connect((err)=>{
    if(err){
        console.log('DB 연결 실패');
    }
    else{
        console.log("DB 연결 성공");
    } 
});

module.exports = conn;  //모듈 문 만들기!!