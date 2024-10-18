const studentIdInput = document.getElementById('student-id');
const submitBtn = document.getElementById('submit-btn');
const loginForm = document.getElementById('login-form');
let selectedSeat = null;

// 顯示當前日期
document.getElementById('current-date').innerText = new Date().toLocaleDateString();

// 登錄按鈕事件
submitBtn.addEventListener('click', async () => {
    const studentId = studentIdInput.value.trim();
    
    if (studentId && selectedSeat) {
        const date = new Date().toLocaleDateString();
        const seatNumber = selectedSeat.innerText.split('\n')[0]; // 獲取座位編號

        selectedSeat.classList.remove('selected'); // 移除選中狀態
        selectedSeat.classList.add('registered'); // 設置為已登錄狀態
        selectedSeat.innerText += `\n${studentId}`; // 顯示學號

        // 發送登錄資訊到伺服器
        try {
            await fetch('http://localhost:3000/login', { // 替換為您的伺服器地址
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ date, seatNumber, studentId })
            });

            alert("登錄成功！");
            
            studentIdInput.value = ''; // 清空輸入框
            loginForm.style.display = 'none'; // 隱藏學號輸入框
            selectedSeat = null; // 重置選中座位
            
        } catch (error) {
            alert("登錄失敗，請稍後再試。");
            console.error("Error:", error);
        }
        
    } else {
        alert("請選擇一個座位並輸入學號！");
    }
});

// 在頁面加載時獲取所有登錄紀錄
async function fetchLoginRecords() {
    try {
        const response = await fetch('http://localhost:3000/records'); // 替換為您的伺服器地址
        const records = await response.json();

        records.forEach(record => {
            const seatElement = document.querySelector(`.seat:nth-child(${record.seatNumber})`);
            if (seatElement) {
                seatElement.classList.add('registered');
                seatElement.innerText += `\n${record.studentId}`; // 顯示學號
            }
        });
    } catch (error) {
        console.error("Error fetching login records:", error);
    }
}

// 初始化獲取紀錄
fetchLoginRecords();
