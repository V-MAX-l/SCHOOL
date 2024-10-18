const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// 設置 CORS
const allowedOrigins = ['http://example1.com', 'http://example2.com']; // 允許的域名
app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = '這個來源不被允許訪問';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

app.use(bodyParser.json()); // 解析 JSON 請求體

let loginRecords = []; // 用於存儲登錄紀錄

// 登錄路由，接收 POST 請求
app.post('/login', (req, res) => {
    const { date, seatNumber, studentId } = req.body;
    
    if (!date || !seatNumber || !studentId) {
      return res.status(400).json({ message: '缺少必要的資料' });
    }

    loginRecords.push({ date, seatNumber, studentId });
    
    res.status(200).json({ message: '登錄成功' });
});

// 獲取歷史紀錄，返回 GET 請求
app.get('/records', (req, res) => {
    res.json(loginRecords);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
