const recordsBody = document.getElementById('records-body');

// 從 Local Storage 獲取紀錄並顯示
function displayLoginRecords() {
    const logins = JSON.parse(localStorage.getItem('loginRecords')) || [];
    console.log("Login records from localStorage:", logins); // 添加日誌以檢查紀錄

    if (logins.length === 0) {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.colSpan = 3;
        cell.textContent = "目前沒有任何登錄紀錄。";
        row.appendChild(cell);
        recordsBody.appendChild(row);
        return;
    }

    logins.forEach(record => {
        const row = document.createElement('tr');
        
        const dateCell = document.createElement('td');
        dateCell.textContent = record.date;
        
        const seatCell = document.createElement('td');
        seatCell.textContent = record.seatNumber;
        
        const studentCell = document.createElement('td');
        studentCell.textContent = record.studentId;
        
        row.appendChild(dateCell);
        row.appendChild(seatCell);
        row.appendChild(studentCell);
        
        recordsBody.appendChild(row);
    });
}

// 初始化顯示紀錄
displayLoginRecords();
