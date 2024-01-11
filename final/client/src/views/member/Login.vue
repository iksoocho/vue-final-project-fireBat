<template>
  <div class="container">
    <form @submit.prevent>
      <div class="container-one">
        <h3
          style="
            padding-top: 20px;
            text-align: left;
            padding-left: 50px;
            color: #dc3545;
          "
        >
          Login
        </h3>
        <input
          type="text"
          placeholder="ID"
          v-model="user_id"
          required
          style="
            margin-top: 10px;
            border: solid 1px #ebebeb;
            border-top-color: #d8d8d8;
            border-left-color: #d8d8d8;
            border-radius: 3px;
            background-color: #fff;
          "
        /><br />
        <input
          type="password"
          placeholder="PASSWORD"
          v-model="user_pw"
          required
          style="
            margin-top: 15px;
            border: solid 1px #ebebeb;
            border-top-color: #d8d8d8;
            border-left-color: #d8d8d8;
            border-radius: 3px;
            background-color: #fff;
          "
        /><br />
        <div
          class="d-grid gap-2"
          style="margin-top: 20px; width: 300px; margin-left: 50px"
        >
          <button
            type="submit"
            class="btn btn-danger"
            @click="login"
            style="height: 40px"
          >
            로그인
          </button>
        </div>
      </div>
    </form>
    <div class="container-two">
      <small
        ><b><a href="/pwFind">비밀번호 찾기</a></b></small
      >
      <small class="side">|</small>
      <small><b>아이디 찾기</b></small>
      <small class="side">|</small>
      <small
        ><b><a href="/emailVerification">회원 가입</a></b></small
      >
    </div>
    <div class="hr-sect">간편로그인</div>
    <div style="margin-bottom: 50px; text-align: center; margin-top: 10px">
      <KakaoLogin />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import KakaoLogin from "@/components/KakaoLogin.vue";

export default {
  components: {
    KakaoLogin,
  },
  data() {
    return {
      user_id: "",
      user_pw: "",
    };
  },
  methods: {
    async login() {
      if (!this.user_id) {
        window.alert("아이디를 입력해주세요");
        return;
      }
      if (!this.user_pw) {
        window.alert("비밀번호를 입력해주세요");
        return;
      }
      try {
        let data = { param: { user_id: this.user_id, user_pw: this.user_pw } };
        let result = await axios.post(`/api/user/login`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (result.data.length > 0 && result.data[0].user_id) {
          this.loginError = false;
          this.unauthorizedError = false;
          // 세션에 사용자 정보 저장
          sessionStorage.setItem(
            "user",
            JSON.stringify(result.data[0].user_id)
          );

          console.log("로그인 성공:", result.data[0]);
          this.$router.push({ path: "/main" });
          window.location.reload();
        } else {
          this.loginError = true;
          window.alert("등록되지않은 아이디입니다."); // 에러 메시지 출력
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            // 서버에서 401 에러가 왔을 때의 처리
            this.unauthorizedError = true;
            alert("비밀번호가 틀립니다.");
            // console.error('Unauthorized Error:', error.response.data);
          } else {
            // 다른 서버 응답 오류
            // console.error('서버 응답 오류:', error.response.data);
          }
        } else if (error.request) {
          // 서버에 요청을 보냈지만 응답을 받지 못한 경우
          // console.error('서버 응답 없음:', error.request);
        } else {
          // 오류 요청을 만들기 전에 발생한 경우
          // console.error('오류 발생:', error.message);
        }
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    // 라우트에 진입하기 전에 로그인 상태 확인
    if (sessionStorage.getItem("user") !== null) {
      next("/main");
    } else {
      next();
    }
  },
  beforeRouteUpdate(to, from, next) {
    // 라우트 업데이트 전에 로그인 상태 확인
    if (sessionStorage.getItem("user") !== null) {
      next("/main");
    } else {
      next();
    }
  },
};
</script>

<style scoped>
.container-one {
  border: solid 1px #ebebeb;
  background-color: #f8f8f8;
  width: 400px;
  height: 260px;
  margin: 0 auto;
  margin-bottom: 10px;
  text-align: center;
  border-radius: 6px;
}

.container-two {
  text-align: center;
  margin-bottom: 10px;
}

.side {
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

input {
  width: 300px;
  height: 40px;
  padding-left: 10px;
}
</style>
