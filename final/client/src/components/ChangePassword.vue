<template>
  <div>
    <h3>비밀번호 수정</h3>
    <form @submit.prevent="changePassword">
      <div>
        <label>현재 비밀번호</label><br>
        <input type="password" v-model="currentPassword" required />
      </div>

      <div>
        <label>새로운 비밀번호</label><br>
        <input type="password" v-model="newPassword" required />
      </div>

      <div>
        <label>새로운 비밀번호 확인</label><br>
        <input type="password" v-model="confirmPassword" required />
      </div>

      <button type="submit">비밀번호 수정</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    };
  },
  methods: {
    async changePassword() {
      try {
        // 비밀번호 변경 로직을 수행하고 서버에 요청을 보냅니다.
        const data = {
          currentPassword: this.currentPassword,
          newPassword: this.newPassword,
          confirmPassword: this.confirmPassword,
          // 다른 필요한 정보들도 추가
        };

        // 비밀번호 변경 API 호출
        const result = await axios.put(`/api/user/changePassword`, data);

        console.log(result.data);

        if (result.data.success) {
          // 비밀번호가 성공적으로 변경된 경우
          window.alert('비밀번호가 성공적으로 변경되었습니다.');
          // 모달 창 닫기 등의 로직 수행
        } else {
          window.alert('비밀번호 변경에 실패했습니다. 다시 시도해주세요.');
        }
      } catch (error) {
        console.error(error);
        window.alert('비밀번호 변경에 실패했습니다. 다시 시도해주세요.');
      }
    },
  },
};
</script>