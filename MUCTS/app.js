// DB암호화모듈인 dotenv 불러오기
require('dotenv').config();

const express = require('express');
const http = require('http');
const bp = require('body-parser')
const nunjucks = require('nunjucks');

// router 불러오기
const mainRouter = require('./routes/mainRouter');
const userRouter = require("./routes/userRouter");
const chatRouter = require("./routes/chatRouter");
const chargeRouter = require("./routes/chargeRouter")
const partyRouter = require("./routes/partyRouter");

// 서버 실행
const app = express();
const server = http.createServer(app);
const socketHandler = require('./socketHandler');
const io = socketHandler(server);

app.use((req, res, next)=>{
    req.io = io;
    next();
});


// statitc 파일 등록
app.use(express.static("public"));

// 세션 모듈
const session = require('express-session');
const fileStore = require('session-file-store')(session);

// 세션 미들웨어 설정
const sessionMiddleware = session({
    httpOnly: true,
    resave: false,
    secret: "secret",
    store: new fileStore(),
    saveUninitialized: false
  });

app.use(sessionMiddleware)

// post데이터 처리 등록
app.use(bp.urlencoded({extended : true}));

// JSON 데이터 처리 미들웨어 추가
app.use(express.json());

// router 등록
app.use('/', mainRouter);
app.use('/user', userRouter);
app.use('/chat', chatRouter);
app.use('/charge',chargeRouter);
app.use('/party',partyRouter);

// nunjucks
app.set("view engine", "html");
nunjucks.configure("views", {
    express : app,
    watch : true
});




const PORT = 3000;
server.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
});