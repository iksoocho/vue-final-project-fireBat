const express = require('express');
const router = express.Router();
const mysql = require('../../db.js');

// 로그인
router.post('/login', async (req, res, next) => {
  const { user_id, user_pw } = req.body.param;
  let result = await mysql.query('userLogin', [user_id, user_pw]);
  if(result != null){
    req.session.user_id = user_id;
    req.session.is_logined = true;
  }
  req.session.save(err => {
    if(err) throw err;
    // res.redirect('/');
    res.send(result);
    console.log(req.session)
  }  
)});

// 로그아웃
router.post('/logout', (req, res, next) => {
  req.session.destroy();
  res.send({ success: true });
});

// 회원정보등록(2023-12-26)
router.post('/', async (req, res) => {
  let data = req.body.param;
  let result = await mysql.query('userInsert', data);
  res.send(result);
});

// 회원정보수정(2023-12-26)
router.put('/myPage', async (req, res) => {
  try {
    let userId = req.session.user_id;
    // 클라이언트 측에서 올바른 필드 이름을 사용하도록 확인
    let datas = [req.body.user_name, req.body.user_zip, req.body.user_addr, req.body.user_detail_addr, userId];

    // MySQL 쿼리 실행 (mysql.query 함수 사용)
    let result = await mysql.query('userUpdate', datas);

    // 결과를 클라이언트로 전송
    res.send(result);
  } catch (error) {
    // 에러 처리
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
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

router.get('/email/:email', async (req, res) => {
  try {
    let data = req.params.email;
    let result = await mysql.query('userEmailCheck', data);
    let isDuplicated = result[0].count > 0;

    res.send({ isDuplicated });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error', errorMessage: error.message });
  }
});

router.get('/myPage', async (req, res) => {
  let userId = req.session.user_id;
  let result = await mysql.query('userInfo', [userId]);
  res.send(result);
});
module.exports = router;