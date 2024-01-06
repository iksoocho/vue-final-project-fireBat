<template>
  <div class="password-popup">
    <h2>비밀번호 변경</h2>
    <label for="newPassword">새 비밀번호</label>
    <input type="password" v-model="newPassword" id="newPassword" />

    <label for="confirmPassword">비밀번호 확인</label>
    <input type="password" v-model="confirmPassword" id="confirmPassword" />

    <button @click="handleChangePassword">비밀번호 변경</button>
    <button @click="handleClose">닫기</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      newPassword: "",
      confirmPassword: "",
      // currentPassword: "",
      error: null, // 새로운 error 속성 추가
    };
  },
  methods: {
    async handleChangePassword() {
      console.log("비밀번호 변경 버튼 클릭");

      console.log("Request Payload:", {
        // currentPassword: this.currentPassword,
        newPassword: this.newPassword,
        confirmPassword: this.confirmPassword,
      });

      if (this.newPassword === this.confirmPassword) {
        try {
          const response = await axios.put("/api/user/changePassword", {
            // currentPassword: this.currentPassword,
            newPassword: this.newPassword,
            confirmPassword: this.confirmPassword,
          });

          console.log("API 응답:", response.data);

          this.$emit("change-password", {
            newPassword: this.newPassword,
            confirmPassword: this.confirmPassword,
          });

          this.$emit("close");

          await axios.post("/api/user/logout");
          sessionStorage.removeItem("user");
          console.log("로그아웃 되었습니다.");

          this.$router.push("/login");
        } catch (error) {
          console.error("API 호출 에러:", error);
          this.error = "비밀번호 변경 중 오류가 발생했습니다.";
          // 서버 응답에서 오류에 대한 자세한 정보 표시
          if (error.response) {
            console.error("서버 응답 상태:", error.response.status);
            console.error("서버 오류 상세 정보:", error.response.data);
            this.error = "서버에서 유효성 검사 오류가 발생했습니다.";
          } else if (error.request) {
            console.error("서버 응답이 없습니다.");
            this.error = "서버 응답이 없습니다.";
          } else {
            console.error("요청 설정 중 오류:", error.message);
            this.error = "요청 설정 중 오류가 발생했습니다.";
          }
        }
      } else {
        alert("새 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
      }
    },

    handleClose() {
      console.log("닫기 버튼 클릭");
      this.$emit("close");
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
</style>
