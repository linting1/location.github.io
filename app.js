const express = require('express');
const app = express();
const path = require('path');
const data = require('./data');
app.use(express.static(path.join(__dirname, 'public')));

// 省份信息
app.get('/province', (req, res) => {
    res.send(data["86"]);
})

// 城市信息
app.get('/cities', (req, res) => {
    var id = req.query.id;
    res.send(data[id]);
})

// 县城信息
app.get('/area', (req, res) => {
    var id = req.query.id;
    res.send(data[id]);
})
app.listen(3000);
console.log('服务器启动成功');