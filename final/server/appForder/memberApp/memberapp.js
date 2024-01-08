const express = require('express');
const router = express.Router();
const mysql = require('../../db.js');
const bcrypt = require('bcrypt');

// 로그인
router.post('/login', async (req, res, next) => {
  const { user_id, user_pw } = req.body.param;

  try {
    // userLogin 쿼리 실행
    let result = await mysql.query('userLogin', [user_id, user_pw]);

    if (result.length > 0) {
      const hashedPassword = result[0].user_pw;

      // bcrypt를 사용하여 비밀번호 비교
      const passwordMatch = await bcrypt.compare(user_pw, hashedPassword);
      console.log('Password Match:', passwordMatch);

      if (passwordMatch) {
        // 비밀번호가 일치할 경우 세션에 사용자 정보 저장
        req.session.user_id = user_id;
        req.session.is_logined = true;
      }
    }

    req.session.save(err => {
      if (err) {
        console.error(err);
        throw err;
      }
      
      console.log(req.session);
      res.send(result);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});



// 로그아웃
router.post('/logout', (req, res, next) => {
  req.session.destroy();
  res.send({ success: true });
});

// 회원정보등록(2023-12-26)
router.post('/', async (req, res) => {
  let data = req.body.param;
  const hashedPassword = await bcrypt.hash(data.user_pw, 10);
  data.user_pw = hashedPassword;
  let result = await mysql.query('userInsert', data);
  res.send(result);
});

// 회원정보수정(2023-12-26)
router.put('/userUpdate', async (req, res) => {
  try {
    let userId = req.session.user_id;
    // 클라이언트 측에서 올바른 필드 이름을 사용하도록 확인
    let datas = [
      req.body.user_name,
      req.body.user_zip, 
      req.body.user_addr, 
      req.body.user_detail_addr, 
      req.body.user_birth,
      req.body.user_email,
      req.body.user_tel, 
      userId];

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

router.get('/userCheck', async (req, res) => {
  const userId = req.session.user_id;
  const user_pw = req.query.user_pw;

  try {
    // 데이터베이스에서 user_id와 hashed_password를 얻습니다
    let result = await mysql.query('passwordCheck', [userId]);

    // 서버에서 로그 추가
    console.log("데이터베이스에서 얻은 user_id와 hashed_password:", result);

    if (result.length > 0) {
      const hashedPasswordFromDB = result[0].hashed_password;

      // 사용자의 입력 비밀번호와 데이터베이스에서 얻은 hashed_password가 정상적으로 있을 경우에만 비교합니다
      if (user_pw && hashedPasswordFromDB) {
        const isPasswordMatch = await bcrypt.compare(user_pw, hashedPasswordFromDB);

        if (isPasswordMatch) {
          const user_id = result[0].user_id;
          res.send({ user_id, result });
        } else {
          const user_id = null;
          res.send({ user_id, result });
        }
      } else {
        // user_pw 또는 hashedPasswordFromDB가 없는 경우
        const user_id = null;
        res.send({ user_id, result });
      }
    } else {
      // 데이터가 없을 경우 user_id 및 hashed_password를 기본값으로 설정하여 전송
      const user_id = null;
      const hashed_password = null; // 또는 빈 문자열로 설정할 수도 있습니다.
      res.send({ user_id, hashed_password });
    }
  } catch (error) {
    console.error("서버 응답 중 오류:", error);

    // 추가: 서버에서 발생한 오류 메시지를 응답으로 전송
    res.status(500).send({ error: 'Internal Server Error', errorMessage: error.message });
  }
});

router.post('/checkPassword', async (req, res) => {
  const { user_id, user_pw } = req.body; // POST 요청의 body에서 user_id와 user_pw를 추출

  try {
    let result = await mysql.query('userLogin', [user_id, user_pw]); // userLogin 쿼리 실행

    if (result.length > 0) {
      res.send({ success: true });
    } else {
      res.send({ success: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error', errorMessage: error.message });
  }
});


router.put('/changePassword', async (req, res) => {
  try {
    const userId = req.session.user_id;
    const newPassword = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword;

    // 새로운 비밀번호와 확인 비밀번호가 일치하는지 확인
    if (newPassword !== confirmPassword) {
      return res.status(400).send({ error: 'New password and confirmation do not match' });
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(newPassword, 10); // 10은 saltRounds입니다.

    // 비밀번호 변경 로직
    await updateUserPassword(userId, hashedPassword);

    // 변경 완료 응답
    res.send({ success: true });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

async function updateUserPassword(userId, hashedPassword) {
  // 데이터베이스의 user_pw 컬럼을 새로운 해싱된 비밀번호로 업데이트하는 로직
  await mysql.query('passwordUpdate', [hashedPassword, userId]);
}
router.get('/userUpdate', async (req, res) => {
  console.log('API 요청이 들어왔습니다.');
  console.log(req.session); 
  let userId = req.session.user_id;
  console.log(userId)
  let result = (await mysql.query('userInfo', userId))[0];
  
  res.send(result);
  
});
module.exports = router;