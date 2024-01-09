<template>
  <div class="container">
    <h1>비밀번호 재확인</h1>
    <div class="containerOne">
      <small>개인정보보호를 위해 회원님의 비밀번호를 다시 한번 확인합니다.</small>
    </div>
    <form @submit.prevent>
      <div>
        <input type="text" v-model="user.user_id" readonly /><br />
        <!-- <input type="password" placeholder="비밀번호" v-model="user.user_pw" /> -->
        <input type="password" placeholder="비밀번호" v-model="user.user_pw" @keyup.enter.prevent="checkPassword" />
        <!-- <button @click="checkPassword">확인</button> -->
        <button type="submit">확인</button>
      </div>
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
        user_pw: '', // 수정: user_pw로 변경
      },
    };
  },
  methods: {
    async LoadUserData() {
      try {
        const response = await axios.get('/api/user/userCheck');

        console.log('axios 요청:', response.config);
        console.log('서버 응답:', response.data);

        // 추가된 로그
        console.log(response.data);

        // result 배열에 대한 체크를 추가
        if (response.data && response.data.length > 0) {
          this.user.user_id = response.data[0].user_id;
        } else {
          console.log('데이터가 비어 있습니다.');
          // 데이터가 없을 경우 처리 (예: 기본값 설정)
        }
      } catch (error) {
        // 에러 로그 추가
        console.error('데이터 로드 중 오류:', error);
      }
    },
    async checkPassword() {
      try {
        const response = await axios.post('/api/user/checkPassword', {
          user_id: this.user.user_id, // 수정: this.userId -> this.user.user_id
          user_pw: this.user.user_pw, // 수정: this.userPw -> this.user.user_pw
        });

        console.log(response.data);

        if (response.data.success) {
          this.$router.push('/userUpdate');
        } else {
          window.alert('비밀번호가 일치하지 않습니다.');
        }
      } catch (error) {
        console.error('비밀번호 확인 중 오류:', error.message);
      }
    },
  },
  mounted() {
    this.LoadUserData();
  },
};
</script>

<style scoped>
.containerOne {
  margin: 0 auto;
}
</style>
