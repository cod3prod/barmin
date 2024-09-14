let parties;

async function getPartyList() {
    try {
        const response = await fetch('/getPartyList');
        const data = await response.json();
        console.log('getPartyList', data);
        return data;
    } catch (err) {
        console.error('DB에서 party list를 못 가져왔습니다', err);
        return [];
    }
}

window.onload = async () => {
    parties = await getPartyList();
    makeRoom();
}

function makeRoom() {
    const chat_container = document.getElementById("chat-container");
    chat_container.innerHTML = '';

    if (parties.length > 0) {
        parties.forEach(party => {
            const content = `
                <div class="card" data-roomId="${party.party_id}" style="cursor: pointer;">
                    <div class="card-title">${party.party_title}</div>
                    <div class="card-content">총원 ${party.personnel} 명</div>
                    <div class="card-price">${party.min_amount}</div>
                </div>
            `;
            chat_container.innerHTML += content;
        });

        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const roomId = card.getAttribute('data-roomId');
                console.log('Clicked Room ID:', roomId);
                window.location.href = `/chat?room=${roomId}`;
            });
        });
    }
    else {
        chat_container.innerHTML = '<p>현재 파티가 없습니다.</p>';
    }
}
