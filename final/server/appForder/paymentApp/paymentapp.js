const express = require('express');
const router = express.Router();
const mysql = require('../../db.js');

router.get('/api/', async (req, res) => {
   let list = await mysql.query('payList');
   res.send(list);
});

router.get('/notice', async (req, res) => {
   let list = await mysql.query('noticeList');
   res.send(list);
});

// router.post('/api/pay', async (req, res) => {
//    let data = req.body.param;
//    let result = await mysql.query('orderInsert', data);
//    res.send(result);
// });

router.get('/cart/:userId', async (req, res) => {
   let data = req.params.userId;
   let list = await mysql.query('cartList', data);
   res.send(list);
});

router.put("/cart/:poc/:cno", async (req, res) => { // 장바구니 수량 변경
   let data = [req.params.poc, req.params.cno];
   let list = await mysql.query("cartUpdate", data);
   res.send(list);
 });

router.post("/cart", async (req, res) => { // 장바구니 추가
   let data = req.body.param;
   let result = await mysql.query("cartInsert", data);
   res.send(result);
 });

module.exports = router;