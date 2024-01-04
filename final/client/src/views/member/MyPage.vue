<template>
  <div>
    <h2>내 정보 수정</h2>
    <form @submit.prevent="updateUserInfo">
      <label>이름: <input v-model="userData.user_name" /></label>
      <label>이메일: <input v-model="userData.user_email" /></label>
      <!-- 다른 필드들도 필요에 따라 추가 -->
      <button type="submit">변경 사항 저장</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: {
        user_name: '',
        user_email: '',
        // 다른 필드들도 필요에 따라 추가
      },
    };
  },
  methods: {
    async updateUserInfo() {
      try {
        console.log(this.userData);
        let response = await this.$axios.put(`/api/user/myPage/${this.user.user_id}`, {
          param: this.userData,
        });

        if (response.data.success) {
          // Vuex 스토어에서 사용자 정보 업데이트
          this.$store.commit('SET_USER', response.data.user);
          // 마이 페이지로 이동하거나 성공 메시지 표시
          this.$router.push('/myPage');
        } else {
          // 오류 시나리오 처리
          console.error(response.data.error);
          // 사용자에게 오류 메시지 표시
        }
      } catch (error) {
        console.error(error);
        // 오류 처리
      }
    },
  },
};
</script>