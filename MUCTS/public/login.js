// 모달창 JS
function openModal() {
    document.getElementById("modal").style.display = "block"; //모달창 보이게 설정하기
}

function closeModal() {
    document.getElementById("modal").style.display = "none";  //모달창 숨기기
}

// 모달 외부 클릭 시 닫기
window.onclick = function (event) {
    if (event.target == document.getElementById("modal")) {
        closeModal();
    }
}



// 모달 창 내부의 취소,확인버튼 버튼 활성화

// 모달창 내부의 취소버튼
document.querySelector('.cancel').onclick=function(){
    closeModal();
}


