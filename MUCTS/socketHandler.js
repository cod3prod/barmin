const socketIo = require("socket.io");
const conn = require("./config/db");


module.exports = (server) => {
    const io = socketIo(server);
    // 가져올 party 정보를 저장할 거임
    io.roomList = {};

    // 진행중인(party_status=1) Party_TB 가져오기 
    const sql = `
    select * from Party_TB where party_status = 1
    `;

    // 쿼리 실행
    conn.query(sql, (err, results) => {
        if (err) {
            console.error("소켓에서 DB 불러오기 실패", err);
            return;
        }
        else {
            if (results.length!=0){
                for(let i = 0 ; i < results.length ; i++){
                    io.roomList[results[i].party_id] = results[i];
                    io.roomList[results[i].party_id].participantsID = [];
                    io.roomList[results[i].party_id].participantsNick = [];
                    io.roomList[results[i].party_id].participantsReady = [];
                }
                console.log("소켓 select 결과값 : ", results);
            }
            else {
                console.log("socket io에서 방을 가져 왔는데 아무것도 없음..")
            }
            

        }
    });

   
    io.on('connection', (socket) => {
        let roomId; // 채팅방 고유 id (중복x)
        let roomTitle;
        let userNick; // 클라이언트의 닉네임
        let maxRoomCapacity // 채팅방 최대 수용 인원
        console.log(`클라이언트 ${socket.id} 접속`);

        // 클라이언트가 채팅방에 들어감
        socket.on('enter room', (data)=>{
            roomId = data.roomId;
            userNick = data.nick||"Geust's Nickname";
            userId = data.userId||"Guest's ID"
            roomTitle = io.roomList[roomId]?.party_title||"존재하지 않는 방";
            min_amount = io.roomList[roomId]?.min_amount||0; // 최소금액
            maxRoomCapacity = io.roomList[roomId]?.personnel||0;
            

            // 존재하지 않는 방에 갔을 경우
            if(!io.roomList[roomId]){
                console.log(`${userNick} 사용자가 존재하지 않는 방에 들어가서 연결 종료`);
                socket.emit('void room', "존재하지 않는 방입니다.. 다른 방으로 ㄱㄱ")
                socket.disconnect();
                return; // 연결 종료
            }
            
            if(io.roomList[roomId].participantsID.length >= maxRoomCapacity){
                socket.emit('full room', "방 인원이 가득 찼습니다.. 뒤로가기 해주세요ㅠㅠ");
                socket.disconnect();
                return; // 연결 종료
            }
            
            // 사용자 추가
            if(io.roomList[roomId].participantsID.indexOf(userId) === -1){
                io.roomList[roomId].participantsID.push(userId);
                io.roomList[roomId].participantsNick.push(userNick);
                io.roomList[roomId].participantsReady.push(false);
            }
            
            console.log('채팅방 입장할 때 : ', data, io.roomList);

            socket.join(roomId);
            console.log(`사용자 ${userNick} 방 ${roomTitle}에 입장`);
        
            // 클라이언트 인원 현황 리로드
            io.to(roomId).emit('reload participants', io.roomList[roomId])

            // 입장한 사용자에게 메시지 전송
            socket.emit('you joined room', {roomTitle : roomTitle, min_amount : min_amount, msg :`${roomTitle} 방에 입장하셨습니다. 매너 채팅 부탁😜`});

            // 같은 채팅방에 있는 기존 클라이언트에게 메시지 전송
            socket.to(roomId).emit('new user', `${userNick}님께서 입장하셨습니다!`);

        });

        // 클라이언트가 입력한 채팅 받기
        socket.on('send message', (data) => {
            console.log(socket.rooms);
            console.log(`${data.msg} from ${socket.id} room ${roomId}`);

            // 클라이언트에게 받은 메시지를 같은 방에 있는 모든 사용자에게 반환
            socket.emit('return myMessage', data);
            socket.to(roomId).emit('return message', data);
        })

        // 클라이언트에서 집결지 위치 받기
        socket.on('send gathering', (data)=>{
            let lat = data.lat;
            let lng = data.lng;
            console.log(`서버가 사용자에게 집결지를 받음, 위도 ${lat}} 경도 ${lng}`);
            socket.to(roomId).emit('show gathering', {lat : lat, lng : lng});
        })

        // 채팅창에서 결제 성공하고 상태 바꿀 때
        socket.on('change status', (data) =>{
            const idx = io.roomList[roomId].participantsID.indexOf(data.userId);
            if (idx !== -1) {
                console.log('결제 상태 확인', data);
                io.roomList[roomId].participantsReady[idx] = data.ready;
                io.to(roomId).emit('reload participants', io.roomList[roomId]);
            }    
        })

        // 연결 종료
        socket.on('disconnect', () => {
            /*
            Optional Chaining 연산자는 객체의 깊은 프로퍼티에 접근할 때,
            그 중간에 null 또는 undefined가 있어도 오류를 발생시키지 않고 undefined를 반환합니다. 
            이는 코드의 안정성을 높이고, 중간 값이 null 또는 undefined인 경우에 대한 예외 처리를 쉽게 해줍니다.
            */
            if (io.roomList[roomId]) {
                const idx = io.roomList[roomId].participantsNick.indexOf(userNick);
                if (idx !== -1) {
                    io.roomList[roomId].participantsNick.splice(idx, 1); // 요소 삭제
                    io.roomList[roomId].participantsID.splice(idx, 1); // 요소 삭제
                    io.roomList[roomId].participantsReady.splice(idx, 1); // 요소 삭제
                }
        
                // 방이 비어있다면 
                if (io.roomList[roomId].participantsID.length === 0) {
                    delete io.roomList[roomId];
                    
                    let sql = `
                            update Party_TB 
                            set party_status = 0
                            where party_id = ?
                        `
                    // 쿼리 실행
                    conn.query(sql, roomId, (err, results) => {
                        if (err) {
                            console.error("방이 비어 있는데 Party_TB 상태 업데이트 실패", err);
                            return;
                        }
                        else {
                            console.log(`party_id ${roomId} 비활성화 완료!`, results)
                        }
                    });
                }
            }

            // 클라이언트 인원 현황 리로드
            io.to(roomId).emit('reload participants', io.roomList[roomId])

            console.log(`클라이언트 ${socket.id} 접속 해제`);
            console.log('접속 해제 하고', io.roomList[roomId], io.roomList[roomId]?.length);
        });
    });
    // 채팅방 코드 끝!


    return io;
}