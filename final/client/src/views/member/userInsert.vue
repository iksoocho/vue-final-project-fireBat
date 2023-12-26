<template>
  <div id="container">
    <h2>====회원가입페이지입니다====</h2>
    <tr>
      <th>아이디</th>
    </tr>
    <tr>
      <input type="text" v-model="userInfo.user_id" maxlength="15" />
    </tr>
    <tr>
      <th>비밀번호</th>
    </tr>
    <tr>
      <input type="password" v-model="userInfo.user_pw" maxlength="20" />
    </tr>
    <tr>
      <th>비밀번호 재입력</th>
    </tr>
    <tr>
      <input type="password" v-model="userInfo.user_recpw" maxlength="20" />
    </tr>
    <tr>
      <th>이름</th>
    </tr>
    <tr>
      <input type="text" v-model="userInfo.user_name" />
    </tr>
    <tr>
      <th>생년월일</th>
    </tr>
    <tr>
      <input type="text" v-model="userInfo.user_birth" />
      <td>
        <input type="radio" name="gender" value="0" v-model="userInfo.user_gender" />남
        <input type="radio" name="gender" value="1" v-model="userInfo.user_gender" />여
      </td>
    </tr>
    <tr>
      <th>필수 전화번호</th>
    </tr>
    <tr>
      <input type="text" v-model="userInfo.user_tel" />
    </tr>
    <tr>
      <th>이메일</th>
    </tr>
    <tr>
      <input type="text" v-model="userInfo.user_email" />
    </tr>
    <tr>
      <th>주소[선택]</th>
    </tr>
    <tr>
      <input type="text" v-model="userInfo.user_address" />
      <input type="button" value="주소찾기" />
    </tr>
    <tr>
      <input type="text" />
    </tr>
    <tr>
      <input type="text" />
    </tr>
    <tr>
      <input type="text" />
    </tr>
    <tr>
      <th>마케팅 정보 수신 동의[선택]</th>
    </tr>
    <tr>
      <input type="checkbox" name="e-mail receives" v-model="userInfo.user_receive_email" />이메일 수신 동의
      <br />
      <input type="checkbox" name="sns receives" v-model="userInfo.user_receive_sms" />SNS 수신 동의
    </tr>
    <tr>
      <button v-on:click="insertInfo">가입완료</button>
    </tr>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      userInfo: {
        user_id: '',
        user_pw: '',
        user_recpw: '',
        user_name: '',
        user_birth: null,
        user_tel: '',
        user_email: '',
        user_address: '',
        user_receive_email: null,
        user_receive_sms: null,
        user_gender: null,
      },
    };
  },
  methods: {
    async insertInfo() {
      let data = {
        param: this.userInfo,
      };
      let result = await axios(`/userInsert`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(data),
      }).catch((err) => console.log(err));

      console.log(result.data);
    },
  },
};
</script>
