<template>
  
  <div id="container" style="display: flex; justify-content : center;">
    <form @submit.prevent="submitForm">
    <div :class="{'error': !isValidUserId}">
      <!-- 보류. 영문 한글자 이상 입력시 오류메세지 뜨는데, 한글은 두글자 이상이여야지 뜸 -->
      <label>아이디</label><br>

      <input 
        type="text" 
        v-model="user.user_id" 
        placeholder="4~15자리 영소문자, 숫자" 
        pattern="[a-z0-9]{4,15}" 
        @focus="showErrorMessageId" 
        style="width:400px;height:40px;" 
        required />
      <p class="error-message" v-if="isErrorMessageVisibleId">아이디를 입력해주세요.</p>
      <p class="error-message" v-if="user.user_id.length > 0 && !/[a-z0-9]{4,15}/.test(user.user_id)">4~15자리의 영문 소문자와 숫자만 가능합니다.</p>

    </div>
    <div>
      <label>비밀번호</label><br>
      <input 
        type="password" 
        v-model="user.user_pw"  
        placeholder="8~20자리 영문 대/소문자, 숫자, 특수문자 조합(모두포함)" 
        pattern="^(?!.*(.)\1{3,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&-_]).{8,20}$"  
        @focus="showErrorMessagePw" style="width:400px;height:40px;" 
        required/>
      <p class="error-message" v-if="isErrorMessageVisiblePw">비밀번호를 입력해주세요.</p>
      <p class="error-message" v-if="user.user_pw.length > 0 && !/^(?!.*(.)\1{3,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&-_]).{8,20}$/.test(user.user_pw)">8~20자리의 영문 대/소문자, 숫자, 특수문자 조합을 사용해 주세요.</p>
      <p class="error-message" v-if="/[\s+]/.test(user.user_pw)">공백 없이 입력해 주세요.</p>
      <p class="error-message" v-if="(user.user_pw.match(/(\d)\1{3,}|([A-Za-z])\2{3,}/))">동일한 문자(숫자)는 4회 이상 연속 사용할 수 없습니다.</p>
      <!-- <p class="error-message" v-if="user.user_pw.length > 0 && !/[a-zA-Z\d!@#$%^&/-/_]/.test(user.user_pw)">특수문자는 !@#$%^&*()-_만 사용 가능합니다.</p> -->
    </div>
    <div>
      <label>비밀번호 재입력</label><br>
      <input 
        type="password" 
        placeholder="확인을 위한 비밀번호 재입력" 
        v-model="user.user_recpw" 
        style="width:400px;height:40px;" />
      <p class="error-message" v-if="user.user_recpw !== user.user_pw && user.user_recpw.length > 0">비밀번호가 일치하지 않습니다.</p>
    </div>
    <div> 
      <label>이름</label><br>
      <input 
        type="text" 
        v-model="user.user_name" 
        style="width:400px;height:40px;"/>
    </div>
    <div>
    <label>생년월일</label><br>
    <input 
      type="text" 
      v-model="user.user_birth" 
      placeholder="예) 19950208" 
      pattern="^(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$" 
      @focus="showErrorMessageBirth" 
      style="width:400px;height:40px;margin-right: 20px;" 
      required/>

      <input 
      type="radio" 
      class="btn-check" 
      name="btnradio" 
      id="btnradio1" 
      autocomplete="off" 
      value="0" 
      v-model="user.user_gender"/>
        <label class="btn btn-outline-primary" for="btnradio1">남</label>

    <input 
    type="radio" 
    class="btn-check" 
    name="btnradio" 
    id="btnradio2"  
    autocomplete="off" 
    value="1" 
    v-model="user.user_gender"/>

      <label class="btn btn-outline-primary" for="btnradio2">여</label>
        <p class="error-message" v-if="isErrorMessageVisibleBirth">생년월일을 입력해주세요.</p>
        <p class="error-message" v-else-if="user.user_birth.length > 0 && !/^(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/.test(user.user_birth)">생년월일을 정확하게 입력해 주세요.</p>
      </div>  
      <!-- 전화번호 -->
    <div>
      
      <label>전화번호[필수]</label><br>

      <input 
      type="text" 
      v-model="user.user_tel" 
      placeholder="'-'없이 숫자만 입력" 
      pattern="^\d{2,3}-?\d{3,4}-?\d{4}$" 
      @focus="showisErrorMessageTel"
      style="width:400px;height:40px;" />

      <p class="error-message" v-if="isErrorMessageVisibleTel">전화번호를 입력해주세요.</p>
      <p class="error-message" v-else-if="user.user_tel.length > 0 && !/^\d{2,3}-?\d{3,4}-?\d{4}$/.test(user.user_tel)">전화번호를 정확하게 입력해 주세요.</p>
    
    </div>

    <!-- 이메일 -->
    <div>

      <label>이메일</label><br>

      <input 
        type="text" 
        v-model="user.user_email" 
        style="width:400px;height:40px;"/>
    
    </div>
    
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
        user_birth: '',
        user_tel: '',
        user_email: '',
        user_receive_email: 0,
        user_receive_sms: 0,
        user_gender: null,
      },

      isErrorMessageVisibleId: false,
      isErrorMessageVisiblePw: false,
      isErrorMessageVisibleBirth: false,
      isErrorMessageVisibleTel: false,
      isErrorMessageVisibleEmail: false,
    }
  },
  computed: {
    isValidUserId() {
      return this.user.user_id.length >= 4;
    },
    isValidUserPw(){
      return this.user.user_pw.length >= 8;
    },
  } ,
  watch: {
  'user.user_id'() {
    this.isErrorMessageVisibleId = false;
  },
  'user.user_pw'() {
    this.isErrorMessageVisiblePw = false;
  },
  'user.user_birth'(){
    this.isErrorMessageVisibleBirth = false;
  },
  'user.user_tel'(){
    this.isErrorMessageVisibleTel = false;
  },
  'user.user_email'(){
    this.isErrorMessageVisibleEmail = false;
  }

},
  methods: {
    
    
    submitForm() {
       // 폼 제출전 유효성 검사(보류)
      if (!this.isValidUserId) {
        alert('입력값이 유효하지 않습니다. 다시 확인해주세요.');
        return;
      }
    },

    showErrorMessageId() {
    if (this.user.user_id.length === 0) {
      this.isErrorMessageVisibleId = true;
    }
    },
    showErrorMessagePw(){
      if (this.user.user_pw.length === 0) {
      this.isErrorMessageVisiblePw = true;
    }
    },
    showErrorMessageBirth(){
      if(this.user.user_birth.length === 0) {
        this.isErrorMessageVisibleBirth = true;
      }
    },
    showisErrorMessageTel(){
      if(this.user.user_tel.length === 0){
        this.isErrorMessageVisibleTel = true;
      }
    },
    showisErrorMessageEmail(){
      if(this.user.user_email.length === 0) {
        this.isErrorMessageVisibleEmail = true;
      }
    },
    async signUp() {
  try {
    let data = { param: this.user };
    let result = await axios.post(`/api/user`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(result.data);
  } catch (error) {
    console.error(error);
  }
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
