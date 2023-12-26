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
    

})

module.exports = router;