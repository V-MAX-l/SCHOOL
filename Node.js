const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// 設置 CORS
const allowedOrigins = ['http://example1.com', 'http://example2.com']; // 允許的域名
app.use(cors({
    origin: function (origin, callback) {
        // 如果沒有來源（例如本地請求），則允許
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = '這個來源不被允許訪問';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

app.get('/api/data', (req, res) => {
    res.json({ message: 'Hello from the server!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
