const express = require('express');
const router = express.Router();
const mysql = require('../../db.js');

router.get('/', async (req, res) => {
    let list = await mysql.query('boardList');
    res.send(list);
});

router.get('/:no', async (req, res) => {
    let data = req.params.no;
    let list = await mysql.query('boardInfo', data);
    res.send(list[0]);
});

router.post('/', async (req, res) => {
    let data = req.body.param;
    let result = await mysql.query('boardInsert', data);
    res.send(result);
});

// ... 나머지 게시물 관련 라우트들 ...

module.exports = router;
