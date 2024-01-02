<template>
  <div class="container">
  <h1>로그인 페이지</h1>
    <div>
      <input type="text" placeholder="ID" v-model="user_id" required><br>
      <input type="password" placeholder="PASSWORD" v-model="user_pw" required><br>
      <button @click="loginSubmit" >로그인</button>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      user_id: '',
      user_pw: '',
    };
  },
  methods: {
    async loginSubmit() {
      try {
        let data = { param: { user_id: this.user_id, user_pw: this.user_pw } };
        let result = await axios.post(`/api/user/login`, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (result.data.length > 0) {
          this.$store.dispatch('loginUser', result.data[0]);
          console.log('로그인 성공:', result.data[0]);
          this.$router.push({ path: '/main' });
        } else {
          window.alert('로그인 실패다 ');
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  beforeRouteUpdate(to, from, next) {
    // 동일한 경로에서 컴포넌트가 재사용될 때 Vuex 상태를 초기화
    this.$store.commit('CLEAR_USER');
    next();
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
}
</script>