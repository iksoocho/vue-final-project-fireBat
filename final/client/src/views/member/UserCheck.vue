<template>
  <div class="container">
    <h1
      style="
        height: 100px;
        line-height: 100px;
        font-family: 'Noto Sans KR';
        font-size: 24px;
        color: #333;
        font-weight: 700;
      "
    >
      비밀번호 재확인
    </h1>
    <div class="containerOne">
      <small
        style="
          position: relative;
          line-height: 18px;
          font-size: 12px;
          color: #666;
        "
        >개인정보보호를 위해 회원님의 비밀번호를 다시 한번 확인합니다.</small
      >
    </div>
    <div class="containerTwo">
      <form @submit.prevent>
        <div>
          <input
            type="text"
            v-model="user.user_id"
            readonly
            style="
              padding: 4px 11px 6px;
              width: 458px;
              height: 40px;
              line-height: 28px;
              border: solid 1px #ebebeb;
              border-top-color: #d8d8d8;
              border-left-color: #d8d8d8;
              border-radius: 3px;
              background-color: #fff;
            "
          />
          <br />
          <!-- <input type="password" placeholder="비밀번호" v-model="user.user_pw" /> -->
          <input
            type="password"
            placeholder="비밀번호"
            v-model="user.user_pw"
            style="
              padding: 4px 11px 6px;
              width: 458px;
              height: 40px;
              line-height: 28px;
              margin-top: 11px;
              border: solid 1px #ebebeb;
              border-top-color: #d8d8d8;
              border-left-color: #d8d8d8;
              border-radius: 3px;
              background-color: #fff;
            "
          />
          <!-- <button @click="checkPassword">확인</button> -->
          <button
            type="submit"
            class="btn btn-danger"
            style="width: 458px; height: 40px; margin-top: 11px"
            @keyup.enter.prevent="checkPassword"
            @click="checkPassword"
          >
            확인
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: {
        user_id: "",
        user_pw: "", // 수정: user_pw로 변경
      },
    };
  },
  methods: {
    async LoadUserData() {
      try {
        const response = await axios.get("/api/user/userCheck");

        console.log("axios 요청:", response.config);
        console.log("서버 응답:", response.data);

        // 추가된 로그
        console.log(response.data);

        // result 배열에 대한 체크를 추가
        if (response.data && response.data.length > 0) {
          this.user.user_id = response.data[0].user_id;
        } else {
          console.log("데이터가 비어 있습니다.");
          // 데이터가 없을 경우 처리 (예: 기본값 설정)
        }
      } catch (error) {
        // 에러 로그 추가
        console.error("데이터 로드 중 오류:", error);
      }
    },
    async checkPassword() {
      try {
        const response = await axios.post("/api/user/checkPassword", {
          user_id: this.user.user_id, // 수정: this.userId -> this.user.user_id
          user_pw: this.user.user_pw, // 수정: this.userPw -> this.user.user_pw
        });

        console.log(response.data);

        if (response.data.success) {
          this.$router.push("/userUpdate");
        } else {
          window.alert("비밀번호가 일치하지 않습니다.");
        }
      } catch (error) {
        console.error("비밀번호 확인 중 오류:", error.message);
      }
    },
  },
  mounted() {
    this.LoadUserData();
  },
};
</script>

<style scoped>
.container {
  margin: 0 auto;
  text-align: center;
  margin-bottom: 50px;
}
.containerOne {
  margin: 0 auto;
  text-align: center;
}
.containerTwo {
  position: relative;
  padding: 20px 0;
  border: solid 1px #ebebeb;
  background-color: #f8f8f8;
  width: 500px;
  height: 182px;
  margin: 0 auto;
  margin-top: 16px;
}
</style>
