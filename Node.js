const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

let loginRecords = []; // 儲存登錄紀錄

app.post('/login', (req, res) => {
    const { date, seatNumber, studentId } = req.body;
    loginRecords.push({ date, seatNumber, studentId });
    res.status(200).send('Login recorded');
});

app.get('/records', (req, res) => {
    res.json(loginRecords);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
