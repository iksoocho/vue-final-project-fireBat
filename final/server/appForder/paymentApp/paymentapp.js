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

module.exports = router;