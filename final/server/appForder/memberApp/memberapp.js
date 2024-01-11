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
    text: `[페스오더] 인증이메일입니다. 인증번호를 입력해주세요. ${verificationCode}`,
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
    return res.status(400).send({ success: false, error: '수신자가 정의되지 않았습니다.' });
  }

  try {
    const verificationCode = await sendEmail(to, subject, text);
    const userEmail = to; // 사용자 이메일 주소
    let result = await mysql.query('emailCodeSave', [userEmail, verificationCode])

    console.log(`인증 코드 전송됨: ${verificationCode}`);
    res.send({ success: true, verificationCode, result });
  } catch (error) {
    console.error('이메일 전송 실패:', error);
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
    console.log(result.length)

    if (result.length > 0) {
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
router.post('/logout', async(req, res, next) => {
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

router.get('/pwFind', async (req, res) => {
  let data = req.query.user_id; // URL 쿼리 매개변수에서 user_id 값을 가져옴
  console.log(data);
  let result = await mysql.query('idInput', data);
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

    // 데이터베이스에서 user_id와 hashed_password를 얻습니다
    let result = await mysql.query('passwordCheck', userId);
 // 서버에서 로그 추가
    console.log("데이터베이스에서 얻은 user_id", result);
    res.send(result)
}),
router.post('/checkPassword', async (req, res) => {
  const { user_id, user_pw } = req.body; // POST 요청의 body에서 user_id와 user_pw를 추출
  console.log({ user_id, user_pw })

  try {
    // DB에서 사용자의 해싱된 비밀번호를 가져옴
    let result = await mysql.query('passwordCheckOk', [user_id, user_pw]);
    console.log(result)
    if (result.length > 0) {
      const hashedPasswordFromDB = result[0].user_pw;
      console.log(hashedPasswordFromDB)

      // bcrypt.compare를 사용하여 입력된 비밀번호와 DB에 저장된 해싱된 비밀번호를 비교
      const isPasswordMatch = await bcrypt.compare(user_pw, hashedPasswordFromDB);

      if (isPasswordMatch) {
        res.send({ success: true });
      } else {
        res.send({ success: false });
      }
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