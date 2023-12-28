const express = require('express');
const router = express.Router();
const mysql = require('../../db.js');


// 축제 전체리스트
router.get('/', async (req, res) => {
    let list = await mysql.query('fesList');
    res.send(list);
});

// 단건 조회
router.get('/:f_code', async(req,res)=>{
    let data = req.params.f_code;
    let list = await mysql.query('fesInfo', data);
    res.send(list[0]); //mysql에서 select는 무조건 배열로 넘오 오기 때문에 단건 조회일 경우 list[0]로 해줘야됨
})

// 축제 등록
router.post('/insert', async (req, res) => {
    let data = req.body.param;   // 데이터를 넘길때 req body에 들어감
    let result = await mysql.query('fesInsert', data);
    res.send(result);
});
// 축제 수정
router.put('/update/:f_code', async (req,res) =>{
    let data = [req.body.param.f_code, req.params.f_code];
    let result = await mysql.query('fesUpdate', data);
    res.send(result);
});
// 축제 삭제
router.delete('/delete/:f_code', async (req,res) =>{
    let data = req.params.f_code;
    let result = await mysql.query('fesDelete', data);
    res.send(result);
});
// 메인페이지 랜덤 6가지
router.get('/random', async (req, res) => {
    let list = await mysql.query('fesRandomList');
    res.send(list);
});
module.exports = router;