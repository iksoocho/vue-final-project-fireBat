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



module.exports = router;