
document.getElementById('searchAddrButton').addEventListener('click', sample4_execDaumPostcode);

function sample4_execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function (data) {
            // 지번 주소를 표시하는 코드
            var jibunAddr = data.jibunAddress; // 지번 주소 변수
            var extraJibunAddr = ''; // 참고 항목 변수

            // 법정동명이 있을 경우 추가한다.
            if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                jibunAddr += ' ' + data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if (data.buildingName !== '' && data.apartment === 'Y') {
                extraJibunAddr += (extraJibunAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if (extraJibunAddr !== '') {
                jibunAddr += ' (' + extraJibunAddr + ')';
            }

            // 우편번호와 지번 주소 정보를 해당 필드에 넣는다.
            document.getElementById('sample4_postcode').value = data.zonecode;
            document.getElementById("sample4_jibunAddress").value = jibunAddr;
            document.getElementById("sample4_detailAddress").value = ''; // 상세주소 필드는 사용자가 직접 입력하도록 설정

            // 팝업 창 닫기 - Daum API에서 자동으로 처리됩니다.
            // data.close(); // 불필요
        }
    }).open();
}

document.getElementById('addressForm').addEventListener('submit', function (event) {
    // addr_code, addr_jibun, addr_detail 값을 합쳐서 address 필드에 넣기
    var postcode = document.getElementById('sample4_postcode').value;
    var jibunAddress = document.getElementById('sample4_jibunAddress').value;
    var detailAddress = document.getElementById('sample4_detailAddress').value;
    var fullAddress = postcode + ' ' + jibunAddress + ' ' + detailAddress;

    document.getElementById('fullAddress').value = fullAddress;
});


// 정보수정 모달창 js

function openModal() {
    document.getElementById("info_modal").style.display = "block";
    console.log("이벤트발생");
}

function closeModal() {
    document.getElementById("info_modal").style.display = "none";
}

window.onclick = function (event) {
    if (event.target == document.getElementById("info_modal")) {
        closeModal();
    }
}
document.querySelector("#changeInfo_btn2").onclick = function () {
    closeModal();
}


