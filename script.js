const seatsContainer = document.getElementById('seats-container');
const loginForm = document.getElementById('login-form');
const studentIdInput = document.getElementById('student-id');
const submitBtn = document.getElementById('submit-btn');
const currentDateElement = document.getElementById('current-date');

let selectedSeat = null;

// 顯示今日日期
currentDateElement.textContent = new Date().toLocaleDateString();

// 創建72個座位並初始化狀態
for (let i = 1; i <= 72; i++) {
    const seat = document.createElement('div');
    seat.classList.add('seat');
    seat.innerText = i;

    // 初始化座位狀態
    const seatStatus = JSON.parse(localStorage.getItem(`seat-${i}`));
    if (seatStatus) {
        seat.classList.add('registered');
        seat.innerText += `\n${seatStatus.studentId}`; // 顯示學號
    }

    // 點擊座位事件
    seat.addEventListener('click', () => {
        if (!selectedSeat && !seat.classList.contains('registered')) {
            seat.classList.add('selected');
            selectedSeat = seat; // 記錄選中的座位
            loginForm.style.display = 'block'; // 顯示學號輸入框
        }
    });

    seatsContainer.appendChild(seat);
}

// 登錄按鈕事件
submitBtn.addEventListener('click', async () => {
    const studentId = studentIdInput.value.trim();
    
    if (studentId && selectedSeat) {
        const date = new Date().toLocaleDateString();
        const seatNumber = selectedSeat.innerText.split('\n')[0]; // 獲取座位編號

        selectedSeat.classList.remove('selected'); // 移除選中狀態
        selectedSeat.classList.add('registered'); // 設置為已登錄狀態
        selectedSeat.innerText += `\n${studentId}`; // 顯示學號

        // 儲存登錄資訊到 Local Storage
        saveLoginData(date, seatNumber, studentId);

        alert("登錄成功！");
        
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
    
    localStorage.setItem('loginRecords', JSON.stringify(logins));
