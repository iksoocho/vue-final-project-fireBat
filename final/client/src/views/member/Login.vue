<template>
  <div class="container">
    <div class="container-one">
      <h3 style="padding-top: 20px; text-align: left; padding-left: 50px; color: #dc3545;">Login</h3>
      <input type="text" placeholder="ID" v-model="user_id" required style="margin-top: 10px;"><br>
      <input type="password" placeholder="PASSWORD" v-model="user_pw" required style="margin-top: 15px;"><br>
      <div class="d-grid gap-2" style="margin-top: 20px; width: 300px; margin-left: 50px;">
       <button type="submit" class="btn btn-danger" @click="loginSubmit" style="height: 40px;">로그인</button>
      </div>
    </div>
    <div class="container-two">
      <small><b>비밀번호 찾기</b></small>
      <small class="side">|</small>
      <small><b>아이디 찾기</b></small>
      <small class="side">|</small>
      <small><b><a href="/userInsert">회원 가입</a></b></small>
    </div>
    <div class="hr-sect">간편로그인</div>
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
<style scoped>

.container-one{
  border: solid 1px black;
  width: 400px;
  height: 250px;
  margin: 0 auto;
  margin-bottom: 10px;
  text-align:center;
  border-radius: 10px;
  }
.container-two{
  text-align:center;
  margin-bottom: 10px;
}
.side{
  padding-left: 10px;
  padding-right: 10px;
}
.hr-sect {
	display: flex;
	flex-basis: 100%;
	align-items: center;
	color: rgba(0, 0, 0, 0.35);
	font-size: 12px;
	margin: 8px 0px;
  width: 400px;
  margin: 0 auto;
}
.hr-sect::before,
.hr-sect::after {
	content: "";
	flex-grow: 1;
	background: rgba(0, 0, 0, 0.35);
	height: 1px;
	font-size: 0px;
	line-height: 0px;
	margin: 0px 16px;
}
.container-two a {
    text-decoration: none; /* 밑줄 제거 */
    color: inherit; /* 부모 요소의 색상 상속 */
  }
input{
  width: 300px;
  height: 40px;
  padding-left: 10px;
}
</style>