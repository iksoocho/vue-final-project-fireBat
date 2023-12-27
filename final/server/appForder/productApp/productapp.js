const express = require('express');
const router = express.Router();
const mysql = require('../../db.js');

// 관리자 상품 리스트
router.get('/', async(req,res)=>{
    let list = await mysql.query('productList');
    res.send(list);
});


// 등록 insert
router.post('/', async (req, res) => {
    let data = req.body.param;
    let result = await mysql.query('productInsert', data);
    res.send(result);

})

// 수정
router.put('/:no', async (req,res) =>{
    let data = [req.body.param, res.params.no];
    let result = await mysql.query('productUpdate', data);
    res.send(result);
})

// 삭제 
router.delete('/:no', async (req,res) => {
    let data = req.params.id;
    let result = await mysql.query('productDelete', data);
    res.send(result);
})
module.exports = router;