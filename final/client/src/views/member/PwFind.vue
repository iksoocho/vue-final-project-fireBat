<template>
  <div class="container">
    <h1>비밀번호 찾기</h1>
    <input type="text" placeholder="ID를 입력해주세요." v-model="user_id" />
    <button @click="sendId">다음</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user_id: "",
    };
  },
  methods: {
    async sendId() {
      try {
        const checkId = await axios.get(`api/user/pwFind`, {
          params: {
            user_id: this.user_id,
          },
        });
        console.log(checkId);
        console.log(checkId.data.length);
        // console.log(checkId.data[0].user_email);
        if (checkId.data.length > 0) {
          const user_email = checkId.data[0].user_email;
          console.log(user_email);
          this.$router.push({
            name: "emailCheck",
            params: { userEmail: user_email },
          });
        } else if (!this.user_id) {
          alert("이메일을 입력해주세요");
        } else {
          alert("존재하지 않는 아이디입니다.");
        }
      } catch (error) {
        console.error("아이디 확인 실패:", error);
      }
    },
  },
};
</script>
