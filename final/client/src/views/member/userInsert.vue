<template>
  <div id="container">
    <h2>====회원가입페이지입니다====</h2>
    <form @submit.prevent="submitForm">
    <div :class="{'error': !isValidUserId}">
      <!-- 보류. 영문 한글자 이상 입력시 오류메세지 뜨는데, 한글은 두글자 이상이여야지 뜸 -->
      <label>아이디</label><br>
      <input type="text" v-model="user.user_id" placeholder="4~15자리 영소문자, 숫자" pattern="[a-z0-9]{4,15}" required/>
      <p class="error-message" v-if="user.user_id.length === 0 && !isValidUserId">아이디를 입력해주세요.</p>
      <p class="error-message" v-if="user.user_id.length > 0 && !isValidUserId || user.user_id.length > 15 || /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(user.user_id) || /[!@#$%^&*()+\-=_.]/.test(user.user_id)">4~15자리의 영문 소문자와 숫자만 가능합니다.</p>
    </div>
    <tr>
      <th>비밀번호</th>
    </tr>
    <tr>
      <input type="password" v-model="user.user_pw" maxlength="20" />
    </tr>
    <tr>
      <th>비밀번호 재입력</th>
    </tr>
    <tr>
      <input type="password" v-model="user.user_recpw" maxlength="20" />
    </tr>
    <tr>
      <th>이름</th>
    </tr>
    <tr>
      <input type="text" v-model="user.user_name" />
    </tr>
    <tr>
      <th>생년월일</th>
    </tr>
    <tr>
      <input type="text" v-model="user.user_birth" />
      <td>
        <input type="radio" name="gender" value="0" v-model="user.user_gender" />남
        <input type="radio" name="gender" value="1" v-model="user.user_gender" />여
      </td>
    </tr>
    <tr>
      <th>필수 전화번호</th>
    </tr>
    <tr>
      <input type="text" v-model="user.user_tel" />
    </tr>
    <tr>
      <th>이메일</th>
    </tr>
    <tr>
      <input type="text" v-model="user.user_email" />
    </tr>
    <tr>
      <th>주소[선택]</th>
    </tr>
    <button @click="postOpen" >주소검색</button>

    <tr>
      <th>마케팅 정보 수신 동의[선택]</th>
    </tr>
    <tr>
      <input type="checkbox" name="e-mail receives" v-model="user.user_receive_email" />이메일 수신 동의
      <br />
      <input type="checkbox" name="sns receives" v-model="user.user_receive_sms" />SNS 수신 동의
    </tr>
    <tr>
      <button type="submit" v-on:click="signUp()">가입완료</button>
    </tr>
  </form>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      user: {
        user_id: '',
        user_pw: '',
        user_recpw: '',
        user_name: '',
        user_birth: null,
        user_tel: '',
        user_email: '',
        user_address: '',
        user_receive_email: 0,
        user_receive_sms: 0,
        user_gender: null,
      },  
    }
  },
  computed: {
    isValidUserId() {
      return this.user.user_id.length >= 4;
    }
  } ,
  methods: {
    submitForm() {
      // 폼 제출 전에 유효성 검사를 수행하여 오류 메시지를 표시할 수 있습니다.
      if (!this.isValidUserId) {
        alert('입력값이 유효하지 않습니다. 다시 확인해주세요.');
        return;
      }
    },
    
    async signUp() {
      let data = {
        param: this.user,
      };
      let result = await axios(`/api/user`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(data),
      }).catch((err) => console.log(err));

      console.log(result.data);
    },
    postOpen() {
        new daum.Postcode({
          oncomplete: function(data) {
          //확인 시 결과 데이터 Return 확인
            console.log(data)
            this.address = data.address
          }
        }).open();
      }
  },
}
</script>
<style>
.error-message {
  font-size: 12px;
  color: red;
  margin: 4px 0 0 0;
}
</style>
