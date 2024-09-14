const socket = io();
let sessionNick;
let sessionUserId;
let min_amount;
let userPoint;

// 세션에서 닉네임과 아이디를 가져오는 함수
async function getSessionNick() {
  try {
    const response = await fetch('/chat/session');
    const data = await response.json();
    sessionNick = data.nick;
    sessionUserId = data.userId;
  }
  catch (err) {
    console.error('세션에서 닉네임을 가져오지 못했습니다', err);
  }
}

// DB에서 유저의 포인트를 가져오는 함수
async function getUserPoint() {
  try {
    const response = await fetch('/chat/db');
    const data = await response.json();
    userPoint = parseInt(data.point);
  }
  catch (err) {
    console.error('DB에서 유저의 포인트를 가져오지 못했습니다', err);
  }
}

// 쿼리 스트링으로 된 채팅방 번호 가져오기
const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const currentRoom = parseInt(params.get('room'));

// 채팅방에 입장하는 함수
async function enterRoom() {
  try {
    socket.emit('enter room', { nick: sessionNick, userId: sessionUserId, roomId: currentRoom });
  } catch (err) {
    console.error('채팅방에 입장 실패..', err);
  }
}

// 로드 시 세션에서 닉네임을 가져옴
window.onload = async () => {
  await getSessionNick();
  await getUserPoint();
  await enterRoom();
  getLocation(); // 위치 정보를 가져오기
}

// 채팅 요소 선택
const textarea = document.getElementById('messageInput');
const conversationWrapper = document.getElementById('conversation-wrapper');
const participantList = document.getElementById('content-participants-list');
const roomTitle = document.getElementById("conversation-status-title");
const roomCapacity = document.getElementById("conversation-status-capacity");
const conversationBTN = document.getElementById("conversation-submit-button");
const exitBTN = document.getElementById("chat-sidebar-end-exit");

// 퇴장 버튼
exitBTN.addEventListener('click', (event) => {
  event.preventDefault();
  if(confirm("진짜 나가시겠습니까?")){
    window.location.href = "/";
  }
  else{
    return;
  }
})

// 존재하지 않는 방
socket.on('void room', (msg)=>{
  const conversation_default = document.getElementById("conversation-default");
  const conversation = document.getElementById("conversation");
  const conversation_default_text = document.getElementById("conversation-default-text");
  const content_sidebar = document.getElementById("content-sidebar");
  content_sidebar.style.display = "none";
  conversation_default_text.innerText = msg;
  conversation_default.classList.toggle("active");
  conversation.classList.toggle("active");
})

// 가득찬 방
socket.on('full room', (msg) => {
  console.log("테스트중", msg);
  const conversation_default = document.getElementById("conversation-default");
  const conversation = document.getElementById("conversation");
  const conversation_default_text = document.getElementById("conversation-default-text");
  const content_sidebar = document.getElementById("content-sidebar");
  content_sidebar.style.display = "none";
  conversation_default_text.innerText = msg;
  conversation_default.classList.toggle("active");
  conversation.classList.toggle("active");
})


// 본인 입장 알림
socket.on('you joined room', (data) => {
  min_amount = parseInt(data.min_amount); // 입장한 방의 최소 금액을 가져옴
  const formattedNum = new Intl.NumberFormat().format(min_amount);
  const formattedPoint = new Intl.NumberFormat().format(userPoint);
  document.getElementById("content-sidebar-minAmount").innerText =`${formattedNum} 원`;
  document.getElementById("modal-payment-minAmount").innerText =`${formattedNum} 원`;
  document.getElementById("modal-payment-userPoint").innerText =`${formattedPoint} 포인트`;
  roomTitle.innerText = data.roomTitle;
  serverMessage(data.msg);
  scrollToBottom();
});

// 새로운 유저 입장 알림
socket.on('new user', (msg) => {
  serverMessage(msg);
  scrollToBottom();
});

// 사용자에게 인원 현황을 보여주자..
socket.on('reload participants', (data) => {
  participantList.innerHTML = '<li class="content-participants-title"><span>Participants</span></li>';
  const { participantsID, participantsNick, participantsReady ,user_id, personnel } = data;

  roomCapacity.innerText = `${participantsID.length} / ${personnel}`;
  if (participantsID.length >= personnel) {
    roomCapacity.classList.add('full');
  } else {
    roomCapacity.classList.remove('full');
  }

  for (let i = 0; i < participantsID.length; i++) {
    const id = participantsID[i];
    const nickname = participantsNick[i];
    const isHost = (id === user_id);
    const isReady = participantsReady[i]
    addParticipant(nickname, id, isHost, isReady); 
  }
});

function addParticipant(nickname, id, isHost, isReady) {
  const participantHTML = `
    <li>
        <div class="content-participant" id="${id}">
            <span class="content-participant-info">
                <span class="content-participant-name">${nickname}</span>
                <span class="content-participant-text">${id}</span>
            </span>
            <span class="content-participant-more">
                ${isReady ? '<span class="content-participant-ready">완료</span>' : ''}
                <span class="content-participant-role">${isHost ? 'Host' : 'Guest'}</span>
            </span>
        </div>
    </li>
  `;
  participantList.innerHTML += participantHTML;
}

// 버튼 클릭으로 메시지 전송
conversationBTN.addEventListener('click', (event) => {
  event.preventDefault();
  if (textarea.value.trim()) {
    socket.emit('send message', { sender: sessionNick, msg: textarea.value.trim() });
    textarea.value = '';
  }
  textarea.focus();
});

// Enter 키를 감지하여 메시지 전송
textarea.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    if (textarea.value.trim()) {
      socket.emit('send message', { sender: sessionNick, msg: textarea.value.trim() });
      textarea.value = '';
    }
  }
});

// 내 메시지 수신
socket.on('return myMessage', (data) => {
  let sender = 'me';
  addMessage(sender, data.msg);
  scrollToBottom();
});

// 다른 사람 메시지 수신
socket.on('return message', (data) => {
  let sender = data.sender || "Guest";
  let msg = `${sender} : ${data.msg}`;
  addMessage(sender, msg);
  scrollToBottom()
});

// 메시지를 추가하는 함수
function addMessage(sender, text) {
  const now = new Date();
  const time = formatTime(now);
  const messageHTML = `
    <li class="conversation-item ${sender === 'me' ? 'me' : ''}">
        <div class="conversation-item-content">
            <div class="conversation-item-box">
                <div class="conversation-item-text">
                    <p>${text}</p>
                    <div class="conversation-item-time">${time}</div>
                </div>
            </div>
        </div>
    </li>
  `;
  conversationWrapper.innerHTML += messageHTML;
}

// 서버 메시지를 보여주는 함수
function serverMessage(text) {
  const serverMessage = `
    <div class="conversation-divider">
      <span>${text}</span>
    </div>
  `;
  conversationWrapper.innerHTML += serverMessage;
}

// 채팅창의 가장 아래로 스크롤하는 함수
function scrollToBottom() {
  const lastMessage = conversationWrapper.lastElementChild;
  if (lastMessage) {
    lastMessage.scrollIntoView({ behavior: 'smooth' });
  }
}

// 현재 시간을 포맷팅하는 함수
function formatTime(date) {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

// 채팅창 열고 닫기
const chatBTN = document.getElementById("chatBTN");
chatBTN.addEventListener('click', (event) => {
  event.preventDefault();
  const conversation = document.getElementById("conversation");
  const conversation_default = document.getElementById("conversation-default");
  conversation.classList.toggle('active');
  conversation_default.classList.toggle('active');
  
  if(window.innerWidth<=767){
    const content_sidebar = document.getElementById("content-sidebar");
    if(content_sidebar.classList.contains("active")){
      content_sidebar.classList.remove("active");
    }
  }
});

// 참가자 현황
const participantsBTN = document.getElementById("participantsBTN");
participantsBTN.addEventListener('click', (event) => {
  event.preventDefault();
  const content_sidebar = document.getElementById("content-sidebar");
  content_sidebar.classList.toggle("active");

  if(window.innerWidth<=767){
    const conversation = document.getElementById("conversation");
    const conversation_default = document.getElementById("conversation-default");
    if(conversation.classList.contains('active')){
      conversation.classList.remove('active');
    }
    if(conversation_default.classList.contains('active')){
      conversation_default.classList.remove('active');
    }
    if(!conversation.classList.contains('active')&&!conversation_default.classList.contains('active')){
      conversation.classList.add('active');
    }
  }
});

// 모달창
// 맵 모달창 열기
const mapBTN = document.getElementById("mapBTN");
mapBTN.addEventListener('click', (event) => {
  event.preventDefault()
  document.getElementById('modal-map').classList.add('active');
  openModal();
});

// 포인트 사용 모달창 열기
const paymentBTN = document.getElementById("paymentBTN");
paymentBTN.addEventListener('click', (event) => {
  event.preventDefault()
  document.getElementById('modal-payment').classList.add('active');
  openModal();
})


// 모달창 닫기
const modalCloseButton = document.getElementById("modal-close");
modalCloseButton.addEventListener('click', ()=>{
  closeModal()
})

function openModal() {
  document.getElementById('modal').style.display = 'flex';
  initializeMap(); // 모달이 열릴 때 지도를 초기화
}

function closeModal() {
  document.getElementById('modal-map').classList.remove('active');
  document.getElementById('modal-payment').classList.remove('active');
  document.getElementById('modal-payment-alert').classList.remove('active');
  document.getElementById('modal').style.display = 'none';
}

// 카카오맵에서 사용할 전역변수들..
let latitude; // 내 중심위치 위도
let longitude; // 내 중심위치 경도
let gatheringLatitude; // 집결지의 위도
let gatheringLongitude; // 집결지의 경도
let map; // 지도를 전역 변수로 선언
let marker; // 마커를 전역 변수로 선언

// 위치 정보를 가져오는 함수
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert("이 브라우저는 Geolocation을 지원하지 않습니다.");
  }
}

// 위치 정보를 표시하고 전역 변수에 할당하는 함수
function showPosition(position) {
  latitude = position.coords.latitude;  // 전역 변수에 위도 할당
  longitude = position.coords.longitude; // 전역 변수에 경도 할당
  console.log("위도: " + latitude);
  console.log("경도: " + longitude);
}

// 에러 처리 함수
function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.log("사용자가 위치 정보 요청을 거부했습니다.");
      break;
    case error.POSITION_UNAVAILABLE:
      console.log("위치 정보를 사용할 수 없습니다.");
      break;
    case error.TIMEOUT:
      console.log("요청 시간이 초과되었습니다.");
      break;
    case error.UNKNOWN_ERROR:
      console.log("알 수 없는 오류가 발생했습니다.");
      break;
  }
}

// 카카오맵 지도 초기화
function initializeMap() {
  if (latitude && longitude) { // 위도와 경도가 유효할 경우
    var container = document.getElementById('modal-map'); // 지도를 담을 영역의 DOM 레퍼런스
    var options = { // 지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(latitude, longitude), // 지도의 중심좌표.
      level: 4 // 지도의 레벨(확대, 축소 정도)
    };

    map = new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴

    // 지도를 클릭한 위치에 표출할 마커입니다
    marker = new kakao.maps.Marker({ 
      position: map.getCenter() // 지도 중심좌표에 마커를 생성합니다 
    }); 
    marker.setMap(map); // 지도에 마커를 표시합니다

    // 지도에 클릭 이벤트를 등록합니다
    kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
      // 클릭한 위도, 경도 정보를 가져옵니다 
      var latlng = mouseEvent.latLng; 
      
      // 마커 위치를 클릭한 위치로 옮깁니다
      marker.setPosition(latlng);
      
      // 보낼 위치의 위도와 경도 설정
      gatheringLatitude = latlng.getLat(); // 집결지의 위도
      gatheringLongitude = latlng.getLng(); // 집결지의 위도
    });
  } else {
    console.error("위도와 경도가 설정되지 않았습니다.");
  }
}

// 모달창 send 버튼
const modal_send_gathering = document.getElementById("modal-send-gathering");
modal_send_gathering.addEventListener('click', () => {
  // map 모달창일 때
  if ( document.getElementById('modal-map').classList.contains('active')){
    // gatheringLatitude와 gatheringLongitude가 제대로 설정되었는지 확인
    if (gatheringLongitude === undefined || gatheringLatitude === undefined) {
      alert("집결지를 선택해주세요!");
    }
    else {
      // socket.emit을 통해 집결지의 위도와 경도를 전송
      socket.emit('send gathering', { lat: gatheringLatitude, lng: gatheringLongitude });
    }
  }
  // payment 모달창일 때
  else if(document.getElementById('modal-payment').classList.contains('active')) {
    const url = '/charge/use'; 
    const charge_money = parseInt(document.getElementById("charge_money").value);
    const modal_payment_alert = document.getElementById("modal-payment-alert");
    if(Number.isNaN(charge_money) || charge_money <= 0){
      modal_payment_alert.classList.add("active");
      modal_payment_alert.innerText = "제대로 입력해주세요!";
      return;
    }
    else if(charge_money > userPoint){
      modal_payment_alert.classList.add("active");
      modal_payment_alert.innerText = "포인트가 부족합니다!";
      return;
    }

    const data = {
      charge_money : charge_money
    };
    console.log('보낼 데이터', data);
  
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('네트워크 응답이 좋지 않습니다.');
        }
        return response.json(); 
    })
    .then(data => {
        console.log('성공:', data.message);
        socket.emit('change status', {userId : sessionUserId, ready : true});
        
        // 모달창에 성공 알림
        modal_payment_alert.classList.add("active");
        modal_payment_alert.innerText = data.message;
        
        /*
        // 준비 완료 구현
        const participantReady = '<span class="content-participant-ready">완료</span>';
        const participantElement = document.getElementById(sessionUserId);

        // 참여자 요소가 생성될 때만 만들기
        if (participantElement){
          const participantMore = participantElement.querySelector('.content-participant-more');

          // 레디가 되지 않았을 때만
          if(participantMore && !participantMore.querySelector('.content-participant-ready')){
            participantMore.innerHTML = participantReady + participantMore.innerHTML;
          }
          else{
            console.log(`ID ${sessionUserId}를 가진 요소를 찾을 수 없습니다.`);
          }
        }
        */
        
    })
    .catch(error => {
        console.error('오류:', error); // 오류 처리
    });
  }
});

// 서버에게 받은 집결
socket.on('show gathering', (data) => {
  // 받은 위도와 경도를 변수에 저장
  const lat = data.lat;  // 집결지의 위도
  const lng = data.lng;  // 집결지의 경도

  // 모달이 열려 있는지 확인
  if (document.getElementById('modal').style.display === 'flex') {
    // 마커의 위치를 집결지로 설정
    const gatheringPosition = new kakao.maps.LatLng(lat, lng);
    marker.setPosition(gatheringPosition); // 마커 위치 업데이트
    map.setCenter(gatheringPosition); // 지도 중심 업데이트
  } else {
    // 모달이 닫혀있다면, 상태를 저장해 놓음
    gatheringLatitude = lat;
    gatheringLongitude = lng;
    console.log(`새 집결지 설정됨 - 위도: ${lat}, 경도: ${lng}`);
    alert(`집결지가 설정되었습니다! 맵을 열어주세요`);
  }
});
