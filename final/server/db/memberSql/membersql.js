module.exports = {
  userInsert: `INSERT INTO user SET ?`, // 회원정보등록
  userList: `SELECT * FROM user`, // 회원리스트
  userIdInfo: `SELECT user_id FROM user WHERE user_tel = ?`, // 아이디 찾기(회원정보에 등록한 휴대전화로 인증)
  userDelete: `DELETE FROM user WHERE user_no = ?`, // 회원정보삭제
  userUpdate: `UPDATE user SET user_name = ?, user_zip = ?, user_addr = ?, user_detail_addr = ? , 
                                user_birth = ?, user_email = ?, user_tel = ? 
                                WHERE user_id = ?`, // 회원정보수정
  userCheck: `SELECT COUNT(*) AS count FROM user WHERE user_id = ?`, // 아이디 중복 체크
  userEmailCheck: `SELECT COUNT(*) AS count FROM user WHERE user_email = ?`, // 이메일 중복 체크
  userLogin: `SELECT * FROM user WHERE user_id = ? AND user_pw = ?`, // 로그인
  userInfo: `SELECT * FROM user WHERE user_id = ?`
};
