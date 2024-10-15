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
        selectedSeat.classList.remove('selected'); // 移除選中狀態
        selectedSeat.classList.add('registered'); // 設置為已登錄狀態
        selectedSeat.innerText += `\n${studentId}`; // 顯示學號
        studentIdInput.value = ''; // 清空輸入框
        loginForm.style.display = 'none'; // 隱藏學號輸入框
        selectedSeat = null; // 重置選中座位
        
        // 將登錄資訊寫入 Google Sheet
        writeToGoogleSheet(new Date().toLocaleDateString(), studentId, selectedSeat.innerText);
    } else {
        alert("請選擇一個座位並輸入學號！");
    }
});

// 將登錄資訊寫入 Google Sheet
function writeToGoogleSheet(date, studentId, seatNumber) {
    // 在這裡實現將資訊寫入 Google Sheet 的程式碼
    // 使用 Google Sheet API 或其他方式將資料寫入指定的工作表
    console.log(`日期：${date}, 學號：${studentId}, 座位號碼：${seatNumber}`);
}