const seatsContainer = document.getElementById('seats-container');
const loginForm = document.getElementById('login-form');
const studentIdInput = document.getElementById('student-id');
const submitBtn = document.getElementById('submit-btn');
const currentDateElement = document.getElementById('current-date');

let selectedSeat = null;

// 顯示今日日期
currentDateElement.textContent = new Date().toLocaleDateString();

// 創建72個座位
for (let i = 1; i <= 72; i++) {
    const seat = document.createElement('div');
    seat.classList.add('seat');
    seat.innerText = i;

    // 點擊座位事件
    seat.addEventListener('click', () => {
        if (!selectedSeat) {
            seat.classList.add('selected');
            selectedSeat = seat; // 記錄選中的座位
            loginForm.style.display = 'block'; // 顯示學號輸入框
        }
    });

    seatsContainer.appendChild(seat);
}

// 登錄按鈕事件
submitBtn.addEventListener('click', () => {
    const studentId = studentIdInput.value.trim();
    
    if (studentId && selectedSeat) {
        const date = new Date().toLocaleDateString();
        const seatNumber = selectedSeat.innerText;

        selectedSeat.classList.remove('selected'); // 移除選中狀態
        selectedSeat.classList.add('registered'); // 設置為已登錄狀態
        selectedSeat.innerText += `\n${studentId}`; // 顯示學號

        // 儲存登錄資訊到 Local Storage
        saveLoginData(date, seatNumber, studentId);

        studentIdInput.value = ''; // 清空輸入框
        loginForm.style.display = 'none'; // 隱藏學號輸入框
        selectedSeat = null; // 重置選中座位
        
    } else {
        alert("請選擇一個座位並輸入學號！");
    }
});

// 儲存登錄資訊到 Local Storage
function saveLoginData(date, seatNumber, studentId) {
    const logins = JSON.parse(localStorage.getItem('loginRecords')) || [];
    
    // 添加新紀錄
    logins.push({ date, seatNumber, studentId });
    
    // 移除超過一個月的紀錄
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    
    const filteredLogins = logins.filter(login => new Date(login.date) >= oneMonthAgo);
    
    localStorage.setItem('loginRecords', JSON.stringify(filteredLogins));
}