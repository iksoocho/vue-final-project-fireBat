const express = require('express');
const router = express.Router();
const mysql = require('../../db.js');


// 축제 전체리스트
router.get('/', async (req, res) => {
    let list = await mysql.query('fesList');
    res.send(list);
    
});

// 축제 등록
router.post('/', async (req, res) => {
    let data = req.body.param;
    let result = await mysql.query('fesInsert', data);
    res.send(result);
})
// 축제 수정

// 축제 삭제


module.exports = router;