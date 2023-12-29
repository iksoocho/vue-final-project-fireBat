const express = require('express');
const router = express.Router();
const mysql = require('../../db.js');

// 관리자 상품 리스트
router.get('/', async(req,res)=>{
    let list = await mysql.query('productList');
    res.send(list);
});

// 단건
router.get('/:prod_code', async(req,res) =>{
    let data = req.params.prod_code;
    let prodInfo = await mysql.query('productInfo',data);
    res.send(prodInfo[0]);
})


// 상품등록 insert
router.post('/insert', async (req, res) => {
    let data = req.body.param;
    console.log(data);
    let result = await mysql.query('productInsert', data);
    res.send(result);

})

// 상품수정
router.put('/update/:prod_code', async (req,res) =>{
    let data = [req.body.param, res.params.prod_code];
    let result = await mysql.query('productUpdate', data);
    res.send(result);
})

// 상품삭제 
router.delete('/delete/:prod_code', async (req,res) => {
    let data = req.params.prod_code;
    let result = await mysql.query('productDelete', data);
    res.send(result);
})

// 메인페이지 랜덤 6가지
router.get('/random', async (req, res) => {
    let list = await mysql.query('fesRandomList');
    res.send(list);
});

module.exports = router;