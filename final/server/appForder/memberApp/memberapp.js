const express = require('express');
const router = express.Router();
const mysql = require('../../db.js');

// 로그인
router.post('/login', async (req, res) => {
  let { user_id, user_pw } = req.body.param;
  let result = await mysql.query('userLogin', [user_id, user_pw]);
  res.send(result);
});

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

// 회원 아이디 찾기(2023-12-26) 등록된 휴대폰번호
router.get('/tel/:tel', async (req, res) => {
  let data = req.params.tel;
  let list = await mysql.query('userIdInfo', data);
  res.send(list);
});

router.get('/id/:id', async (req, res) => {
  try {
    let data = req.params.id;
    let result = await mysql.query('userCheck', data);
    let isDuplicated = result[0].count > 0;

    res.send({ isDuplicated });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error', errorMessage: error.message });
  }
});


module.exports = router;