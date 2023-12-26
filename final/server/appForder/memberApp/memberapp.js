const express = require('express');
const router = express.Router();
const mysql = require('../../db.js');

// 회원정보등록(2023-12-26)
router.post('/', async (req, res) => {
  let data = req.body.param;
  let result = await mysql.query('userInsert', data);
  res.send(result);
});

// 회원정보수정(2023-12-26)
router.put('/:no', async (req, res) => {
  let datas = [req.body.param, req.params.no];
  let result = await mysql.query('userUpdate', datas);
  res.send(result);
});

// 회원전체조회(2023-12-26)
router.get('/', async (req, res) => {
  let list = await mysql.query('userList');
  res.send(list);
});

// 회원정보삭제(2023-12-26)
router.delete('/:no', async (req, res) => {
  let data = req.params.no;
  let result = await mysql.query('userDelete', data);
  res.send(result);
});
module.exports = router;

// 회원 아이디 찾기(2023-12-26) 등록된 휴대폰번호
router.get('/:tel', async (req, res) => {
  let data = req.params.tel;
  let list = await mysql.query('userIdInfo', data);
  res.send(list);
});
