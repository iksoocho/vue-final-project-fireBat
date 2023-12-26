const express = require('express');
const router = express.Router();
const mysql = require('../../db.js');

// 전체
router.get('/', async(req,res)=>{
    let list = await mysql.query('productList');
    res.send(list);
});

// 단건
router.get('/:no', async (req,res) => {
    
})
// 등록 insert
router.post('/', async (req, res) => {
    let data = req.body.param;
    let result = await mysql.query('productInsert', data);
    res.send(result);

})

// 삭제 
router.delete('/:no', async (req,res) => {
    let data = req.params.id;
    let result = await mysql.query('productDelete', data);
    res.send(result);
})
module.exports = router;