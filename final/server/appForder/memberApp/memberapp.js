const express = require('express');
const router = express.Router();
const mysql = require('../../db.js');

router.post('/', async (req, res) => {
  let data = req.body.param;
  let result = await mysql.query('userInsert', data);
  res.send(result);
});

module.exports = router;
