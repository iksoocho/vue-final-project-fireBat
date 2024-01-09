<template>
  <div class="password-popup">
    <h2>비밀번호 변경</h2>
    <div>
      <label for="newPassword">새 비밀번호</label>
      <input
        type="password"
        v-model="newPassword"
        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$"
        id="newPassword"
      /><br />
      <p
        class="error-message"
        v-if="
          newPassword.length > 0 &&
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(newPassword)
        "
      >
        8~20자리의 영문 대/소문자, 숫자, 특수문자 조합을 사용해 주세요.
      </p>

      <label for="confirmPassword">비밀번호 확인</label>
      <input type="password" v-model="confirmPassword" id="confirmPassword" @focus="confirmPasswordActivated = true" />
    </div>
    <!-- Display error message if passwords do not match -->
    <p v-if="confirmPasswordActivated && error" class="error">{{ error }}</p>

    <button @click="handleChangePassword">비밀번호 변경</button>
    <button @click="handleClose">닫기</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      newPassword: '',
      confirmPassword: '',
      confirmPasswordActivated: false,
      error: null,
    };
  },
  watch: {
    newPassword: 'validatePasswordMatch',
    confirmPassword: 'validatePasswordMatch',
  },
  methods: {
    validatePasswordMatch() {
      // 두 번째 비밀번호 확인 입력란이 활성화된 경우에만 검증
      if (this.confirmPasswordActivated && this.newPassword !== this.confirmPassword) {
        this.error = '비밀번호가 일치하지 않습니다.';
      } else {
        this.error = null;
      }
    },
    async handleChangePassword() {
      console.log('비밀번호 변경 버튼 클릭');

      console.log('Request Payload:', {
        newPassword: this.newPassword,
        confirmPassword: this.confirmPassword,
      });

      if (this.newPassword === this.confirmPassword) {
        try {
          const response = await axios.put('/api/user/changePassword', {
            newPassword: this.newPassword,
            confirmPassword: this.confirmPassword,
          });

          console.log('API 응답:', response.data);

          this.$emit('change-password', {
            newPassword: this.newPassword,
            confirmPassword: this.confirmPassword,
          });

          this.$emit('close');

          await axios.post('/api/user/logout');
          sessionStorage.removeItem('user');
          console.log('로그아웃 되었습니다.');
          await this.$router.push('/login');
          window.location.reload();
        } catch (error) {
          console.error('API 호출 에러:', error);
          this.error = '비밀번호 변경 중 오류가 발생했습니다.';
          // 서버 응답에서 오류에 대한 자세한 정보 표시
          if (error.response) {
            console.error('서버 응답 상태:', error.response.status);
            console.error('서버 오류 상세 정보:', error.response.data);
            this.error = '서버에서 유효성 검사 오류가 발생했습니다.';
          } else if (error.request) {
            console.error('서버 응답이 없습니다.');
            this.error = '서버 응답이 없습니다.';
          } else {
            console.error('요청 설정 중 오류:', error.message);
            this.error = '요청 설정 중 오류가 발생했습니다.';
          }
        }
      } else {
        alert('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
      }
    },

    handleClose() {
      console.log('닫기 버튼 클릭');
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.password-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.password-popup {
  width: 550px;
}

.error {
  color: red;
}
</style>
