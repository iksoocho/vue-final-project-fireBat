const express = require('express');
const router = express.Router();
const mysql = require('../../db.js');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { promisify } = require('util');

const compare = promisify(bcrypt.compare);

// 랜덤한 인증 코드 생성 함수
const generateVerificationCode = () => {
  const length = 6; // 인증 코드 길이
  const characters = '0123456789'; // 인증 코드에 포함될 문자들
  let code = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }

  return code;
};

const sendEmail = async (to, subject, text) => {

  const verificationCode = generateVerificationCode();
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nsa30003@gmail.com',
      pass: 'vfmf yzmo kvyv iprn',
    },
  });

  const mailOptions = {
    from: 'nsa30003@gmail.com',
    to,
    subject,
    text: `Your verification code is: ${verificationCode}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    return verificationCode; // 생성한 인증 코드 반환
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // 에러 발생 시 예외 처리
  }
};

// 예제 사용
// const userEmail = 'nsa30003@gmail.com'; // 실제 이메일 주소로 변경해야 합니다.
// const emailSubject = 'Email Verification';

router.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;
  console.log(req.body);
  if (!to) {
    return res.status(400).send({ success: false, error: 'No recipients defined' });
  }

  try {
    const verificationCode = await sendEmail(to, subject, text);
    const userEmail = to; // 사용자 이메일 주소
    let result = await mysql.query('emailCodeSave', [userEmail, verificationCode])
  

    console.log(`Verification code sent: ${verificationCode}`);
    res.send({ success: true, verificationCode });
  } catch (error) {
    console.error('Failed to send email:', error);
    res.status(500).send({ success: false, error: error.message });
  }
});

// 이메일 인증 확인
router.post('/verify-code', async (req, res) => {
  const { user_email, user_email_code } = req.body;

  if (!user_email || !user_email_code) {
    return res.status(400).send({ success: false, error: 'Invalid data provided' });
  }

  try {
    // user_email과 user_email_code를 사용하여 코드 검증 로직을 구현
    // ...

    // 예시: MySQL 쿼리
    const result = await mysql.query('emailCodeCheck', [user_email, user_email_code]);

    if (result) {
      res.send({ success: true });
    } else {
      res.status(400).send({ success: false, error: 'Invalid verification code' });
    }
  } catch (error) {
    console.error('Failed to verify code:', error);
    res.status(500).send({ success: false, error: error.message });
  }
});


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

      if (passwordMatch === true) {
        // 비밀번호가 일치할 경우 세션에 사용자 정보 저장
        req.session.user_id = user_id;
        req.session.is_logined = true;
      } else if(passwordMatch === false) {
        res.status(401).json({ error: 'InvalidCredentials' });
        return;
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

router.get('/userCheck', async (req, res,) => {
  const userId = req.session.user_id;
  console.log(userId);
  const user_pw = req.query.user_pw;

  try {
    // 데이터베이스에서 user_id와 hashed_password를 얻습니다
    let result = await mysql.query('passwordCheck', [userId]);

    // 서버에서 로그 추가
    console.log("데이터베이스에서 얻은 user_id와 hashed_password:", result);

    if (result.length > 0) {
      const hashedPasswordFromDB = result[0].user_pw;
      console.log(hashedPasswordFromDB); // 에러.

      // 두 번째 await를 이 위치로 이동
      try {
        if (user_pw !== undefined && user_pw !== null) {
          const isPasswordMatch = await bcrypt.compare(user_pw, hashedPasswordFromDB);
          console.log(isPasswordMatch);

          if (isPasswordMatch) {
            const user_id = result[0].user_id;
            res.send({ user_id, result });
          } else {
            const user_id = null;
            res.send({ user_id, result });
          }
        } else {
          const user_id = null;
          res.send({ user_id, result });
        }
      } catch (error) {
        console.error("bcrypt.compare에서 오류 발생:", error);
        // 적절한 오류 처리
        res.status(500).send({ error: 'Internal Server Error', errorMessage: error.message });
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