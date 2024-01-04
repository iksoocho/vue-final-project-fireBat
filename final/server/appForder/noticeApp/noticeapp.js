const express = require('express');
const router = express.Router();
const mysql = require('../../db.js');

//전체 조회
router.get('/', async (req, res) => {
    let list = await mysql.query('noticeList');
    res.send(list);
});

//단건 조회
router.get('/:notice_no', async (req, res) => {
    let data = req.params.notice_no;
    let list = await mysql.query('noticeInfo', data);
    res.send(list[0]);
});



//수정
router.put('/:notice_no', async(req,res)=>{
    let datas = [req.body.param, req.params.notice_no];
    let result =  await mysql.query('noticeUpdate', datas)
    res.send(result);
});

//삭제
router.delete('/:notice_no', async(req,res)=>{
    let data = req.params.notice_no;
    let result = await mysql.query('noticeDelete', data);
    res.send(result);
});

//등록
router.post('/', async (req, res) => {
    let data = req.body.param;
    let result = await mysql.query('noticeInsert', data);
    res.send(result);
});

module.exports = router;
