function checkAccount() {
    fetch('/party/checkAccount')
        .then(response => response.json())
        .then(data => {
            if (data.hasAccount) {
                window.location.href = '/party/makeParty';
            } else {
                document.getElementById('authModal').style.display = 'block';
            }
        })
        .catch(error => console.error('Error:', error));
}

function showAccountModal() {
    document.getElementById('authModal').style.display = 'none';
    document.getElementById('userId').value = 'someUserId'; // 실제 userId를 서버에서 세션을 통해 가져와야 함
    document.getElementById('myModal').style.display = 'block';
}

function redirectToMainPage() {
    document.getElementById('authModal').style.display = 'none';
    window.location.href = '/'; // 메인 페이지로 리디렉션
}

function closeAuthModal() {
    document.getElementById('authModal').style.display = 'none';
}

function closeAccountModal() {
    document.getElementById('myModal').style.display = 'none';
}

window.onclick = function (event) {
    const authModal = document.getElementById('authModal');
    const accountModal = document.getElementById('myModal');
    if (event.target == authModal) {
        authModal.style.display = 'none';
    }
    if (event.target == accountModal) {
        accountModal.style.display = 'none';
    }
}
