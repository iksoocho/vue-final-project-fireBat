const express = require('express');
const router = express.Router();
const mysql = require('../../db.js');

//qna 전체 조회
router.get('/', async (req, res) => {
    let list = await mysql.query('qnaList');
    res.send(list);
});

//단건 조회
router.get('/:qna_no', async (req, res) => {
    let data = req.params.qna_no;
    let list = await mysql.query('qnaInfo', data);
    res.send(list[0]);
});

//insert할때 회원 번호를 회원 아이디로 불러오기
router.get('/userNo/:user_id', async (req, res) => {
    let data = req.params.user_id;
    let list = await mysql.query('userNoForInsert', data);
    res.send(list[0]);
});

//등록
router.post('/', async (req, res) => {
    let data = req.body.param;
    let result = await mysql.query('qnaInsert', data);
    res.send(result);
});

//수정
router.put('/:qna_no', async(req,res)=>{
    let datas = [req.body.param, req.params.qna_no];
    let result =  await mysql.query('qnaUpdate', datas)
    res.send(result);
});

//삭제
router.delete('/:qna_no', async(req,res)=>{
    let data = req.params.qna_no;
    let result = await mysql.query('qnaDelete', data);
    res.send(result);
});

module.exports = router;
