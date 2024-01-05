const express = require('express');
const router = express.Router();
const mysql = require('../../db.js');

router.get('/', async (req, res) => {
   let list = await mysql.query('payList');
   res.send(list);
});

router.get('/notice', async (req, res) => {
   let list = await mysql.query('noticeList');
   res.send(list);
});

router.post('/pay', async (req, res) => {
   let data = req.body.param;
   let result = await mysql.query('orderInsert', data);
   res.send(result);
});

module.exports = router;