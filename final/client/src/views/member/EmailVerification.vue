<template>
  <div>
    <label for="email">이메일:</label>
    <input type="email" v-model="user_email" id="email" />
    <button @click="sendVerificationCode">인증번호 발송</button>

    <div v-if="showVerification">
      <label for="verificationCode">인증번호:</label>
      <input type="text" v-model="verificationCode" id="verificationCode" />
      <button @click="verifyCode">인증 확인</button>
    </div>

    <div v-if="showNextStep">
      <!-- 다음 단계의 내용을 여기에 추가하세요 -->
      <p>인증이 완료되었습니다! 다음 단계로 진행하세요.</p>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      user_email: '',
      verificationCode: '',
      showVerification: false,
      showNextStep: false,
      user: {
        // user 객체를 추가
        user_email: '',
      },
    };
  },
  methods: {
    async sendVerificationCode() {
      try {
        const checkResponse = await axios.get(`/api/user/email/${encodeURIComponent(this.user_email)}`);
        console.log(checkResponse.data.isDuplicated);
        if (checkResponse.data.isDuplicated) {
          alert('이미 존재하는 이메일입니다.');
        } else {
          const sendResponse = await axios.post('/api/user/send-email', {
            to: this.user_email,
            subject: 'Your Subject',
            text: 'Your Email Body',
          });

          if (sendResponse.data.success) {
            alert('인증번호 발송 성공. 인증번호를 입력해주세요.');
            this.showVerification = true;
          } else {
            console.error(sendResponse.data.error);
          }
        }
      } catch (error) {
        console.error('인증번호 발송 실패:', error);
      }
    },
    async verifyCode() {
      try {
        const response = await axios.post('/api/user/verify-code', {
          user_email: this.user_email,
          user_email_code: this.verificationCode,
        });

        if (response.data.success) {
          // 서버에서 코드 검증 성공 시, 다음 단계로 전환
          this.showNextStep = true;
          this.user.user_email = this.user_email;
          this.$router.push({
            name: 'userInsert',
            query: { user_email: this.user_email }, // params 대신 query 사용
          });

          alert('인증완료!');
        } else {
          console.error(response.data.error);
        }
      } catch (error) {
        console.error('코드 확인 실패:', error);
      }
    },
  },
};
</script>
