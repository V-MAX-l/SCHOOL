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
