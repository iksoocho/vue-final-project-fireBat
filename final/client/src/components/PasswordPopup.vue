<template>
  <div class="password-popup">
    <h1
      style="
        font-size: 16px;
        padding-right: 400px;
        font-weight: bold;
        width: 540px;
        height: 37px;
        background-color: #dc3545;
        padding-top: 6px;
        color: #fff;
        padding-left: 10px;
      "
    >
      <th>비밀번호 변경</th>
      <td><button @click="handleClose">X</button></td>
    </h1>
    <p
      style="
        font-size: 12px;
        color: #666;
        text-align: left;
        padding-left: 20px;
        line-height: 1.4;
        padding-top: 12px;
      "
    >
      비밀번호 변경 시 휴대폰, 컴퓨터 등 모든 기기 및 브라우저에서
      로그아웃되며,<br />
      변경된 비밀번호로 다시 로그인 후 이용하실 수 있습니다.
    </p>
    <div class="pwContainer">
      <input
        type="password"
        v-model="newPassword"
        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$"
        placeholder="새 비밀번호"
        style="
          width: 460px;
          height: 40px;
          margin-top: 2px;
          border: solid 1px #ebebeb;
          border-top-color: #d8d8d8;
          border-left-color: #d8d8d8;
          border-radius: 3px;
          background-color: #fff;
          padding-left: 15px;
        "
      /><br />
      <p
        class="error-message"
        v-if="
          newPassword.length > 0 &&
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(
            newPassword
          )
        "
        style="
          color: red;
          margin-bottom: 0px;
          font-size: 12px;
          padding-right: 80px;
        "
      >
        8~20자리의 영문 대/소문자, 숫자, 특수문자 조합을 사용해 주세요.
      </p>

      <input
        type="password"
        v-model="confirmPassword"
        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$"
        @focus="confirmPasswordActivated = true"
        style="
          width: 460px;
          height: 40px;
          margin-top: 2px;
          border: solid 1px #ebebeb;
          border-top-color: #d8d8d8;
          border-left-color: #d8d8d8;
          border-radius: 3px;
          background-color: #fff;
          margin-top: 15px;
          padding-left: 10px;
        "
        placeholder="새 비밀번호 재입력"
      />
      <p
        v-if="confirmPasswordActivated && error"
        class="error"
        style="
          color: red;
          margin-bottom: 0px;
          font-size: 12px;
          padding-right: 270px;
        "
      >
        {{ error }}
      </p>
      <button
        class="btn btn-danger"
        style="width: 460px; height: 40px; margin-top: 15px"
        @click="handleChangePassword"
      >
        비밀번호 변경
      </button>
    </div>
    <!-- Display error message if passwords do not match -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      newPassword: "",
      confirmPassword: "",
      confirmPasswordActivated: false,
      error: null,
    };
  },
  watch: {
    newPassword: "validatePasswordMatch",
    confirmPassword: "validatePasswordMatch",
  },
  methods: {
    validatePasswordMatch() {
      // 두 번째 비밀번호 확인 입력란이 활성화된 경우에만 검증
      if (
        this.confirmPasswordActivated &&
        this.newPassword !== this.confirmPassword
      ) {
        this.error = "비밀번호가 일치하지 않습니다.";
      } else {
        this.error = null;
      }
    },
    async handleChangePassword() {
      console.log("비밀번호 변경 버튼 클릭");

      console.log("Request Payload:", {
        newPassword: this.newPassword,
        confirmPassword: this.confirmPassword,
      });

      if (this.newPassword === this.confirmPassword) {
        // 비밀번호 유효성 검사
        if (
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(
            this.newPassword
          )
        ) {
          alert(
            "8~20자리의 영문 대/소문자, 숫자, 특수문자 조합을 사용해 주세요."
          );
          return;
        }

        try {
          const response = await axios.put("/api/user/changePassword", {
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
          window.alert("로그아웃 되었습니다.");
          console.log("로그아웃 되었습니다.");

          await this.$router.push("/login");
          window.location.reload();
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
.pwContainer {
  width: 500px;
  margin: 0 auto;
  margin-top: 20px;
  position: relative;
  padding: 20px 0;
  border: solid 1px #ebebeb;
  background-color: #f8f8f8;
  margin-bottom: 20px;
}
.password-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -40%);
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.error {
  color: red;
}
</style>
