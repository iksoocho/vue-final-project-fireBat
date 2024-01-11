<template>
  <div class="container">
    <h3 style="text-align: center; margin-bottom: 50px; color: #dc3545">Sign-up</h3>
    <div class="containerOne">
      <div style="width: 600px; margin: 0 auto; margin-bottom: 20px">
        <h5 style="font-weight: bold; margin-top: 40px">약관에 동의해주세요.</h5>
      </div>
      <div class="containerTwo">
        <input
          type="checkbox"
          style="margin-left: 25px; margin-top: 20px; width: 17px; height: 17px"
          v-model="selectAllChecked"
        />
        <label style="font-weight: 600; padding: 10px 0px 20px 10px; color: black; font-size: 1.2em">모두동의</label>
      </div>
      <div class="containerThree">
        <input type="checkbox" style="margin-left: 25px; width: 17px; height: 17px" v-model="agreements[0].checked" />
        <label style="margin-bottom: 0px; color: black; font-size: 1.2em; padding-left: 10px; padding-right: 276px"
          >페스오더 이용약관 (필수)</label
        >
        <label style="margin-bottom: 0px"><a href="#" style="text-decoration: none">내용보기</a></label>
        <hr />
        <input
          type="checkbox"
          style="margin-left: 25px; width: 17px; height: 17px"
          v-model="agreements[1].checked"
        /><label style="margin-bottom: 0px; color: black; font-size: 1.2em; padding-left: 10px; padding-right: 210px"
          >개인정보 수집 및 이용 동의 (필수)</label
        >
        <label style="margin-bottom: 0px"><a href="#" style="text-decoration: none">내용보기</a></label>
        <hr />
        <input
          type="checkbox"
          style="margin-left: 25px; width: 17px; height: 17px"
          v-model="agreements[2].checked"
        /><label style="margin-bottom: 0px; color: black; font-size: 1.2em; padding-left: 10px; padding-right: 210px"
          >개인정보 수집 및 이용 동의 (선택)</label
        >
        <label style="margin-bottom: 0px"><a href="#" style="text-decoration: none">내용보기</a></label>
        <hr style="margin-bottom: 60px" />
        <h5 style="font-weight: bold; margin-bottom: 0">안전한 회원가입을 위한 본인인증을 진행해 주세요.</h5>
      </div>
      <br />
      <div class="containerFour">
        <label for="email" style="margin-bottom: 5px; font-weight: bold; color: black">이메일 인증</label><br />
        <input
          type="email"
          v-model="user_email"
          id="email"
          pattern="^[a-z09_+.-]+([a-z0-9-]+\.)+[a-z0-9]{2,4}$"
          style="
            width: 400px;
            height: 40px;
            padding-left: 10px;
            border: solid 1px #ebebeb;
            border-top-color: #d8d8d8;
            border-left-color: #d8d8d8;
            border-radius: 3px;
            background-color: #fff;
          "
          placeholder="이메일을 입력해 주세요."
        />

        <button @click="sendVerificationCode" class="btn btn-danger" style="margin-bottom: 4px; margin-left: 20px">
          인증번호 발송
        </button>
        <div v-if="showVerification" style="margin-bottom: 8px">
          <label for="verificationCode" style="margin-bottom: 5px; font-weight: bold; color: black; margin-top: 10px"
            >인증번호</label
          ><br />
          <input
            type="text"
            v-model="verificationCode"
            id="verificationCode"
            style="width: 400px; height: 40px; padding-left: 10px"
            placeholder="인증번호를 입력해 주세요."
          />
          <button @click="verifyCode" class="btn btn-danger" style="margin-bottom: 4px; margin-left: 20px">
            인증 확인
          </button>
        </div>
      </div>
    </div>

    <div v-if="showNextStep">
      <!-- 다음 단계의 내용을 여기에 추가하세요 -->
      <p>인증이 완료되었습니다! 다음 단계로 진행하세요.</p>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import Swal from 'sweetalert2';
export default {
  data() {
    return {
      user_email: '',
      verificationCode: '',
      showVerification: false,
      showNextStep: false,
      user: {
        // user 객체를 추가
        user_email: '',
      },
      selectAllChecked: false,
      agreements: [
        { name: '페스오더 이용약관 (필수)', checked: false },
        { name: '개인정보 수집 및 이용 동의 (필수)', checked: false },
        { name: '개인정보 수집 및 이용 동의 (선택)', checked: false },
      ],
    };
  },
  watch: {
    selectAllChecked(newValue) {
      // "모두동의" 체크박스 상태에 따라 하위 체크박스 상태를 변경
      this.agreements.forEach((agreement) => {
        agreement.checked = newValue;
      });
    },
  },
  methods: {
    async sendVerificationCode() {
      if (this.isEmailInvalid) {
        // 이메일 형식이 유효하지 않을 경우 에러 메시지 표시
        Swal.fire({
          icon: 'warning',
          title: '인증번호 전송 실패',
          text: '올바른 이메일을 입력해 주세요.',
          conriemButtonText: '확인',
        });
        return;
      }
      if (!this.canSendVerificationCode) {
        // 필수 약관 체크가 되지 않았을 경우 경고창 표시
        Swal.fire({
          icon: 'warning',
          title: '인증번호 전송 실패',
          text: '필수 약관을 모두 체크해 주세요.',
          conriemButtonText: '확인',
        });
        return;
      }
      if (!this.user_email.trim()) {
        // 이메일이 입력되지 않았을 경우 경고창 표시
        Swal.fire({
          icon: 'warning',
          title: '인증번호 전송 실패',
          text: '이메일을 입력해 주세요.',
          conriemButtonText: '확인',
        });
        return;
      }

      // 인증번호 발송 버튼 클릭 시 로직
      try {
        const checkResponse = await axios.get(`/api/user/email/${encodeURIComponent(this.user_email)}`);
        console.log(checkResponse.data.isDuplicated);
        if (checkResponse.data.isDuplicated) {
          alert('이미 존재하는 이메일입니다.');
        } else {
          const sendResponse = await axios.post('/api/user/send-email', {
            to: this.user_email,
            subject: 'Your Subject',
            text: 'Your Email Body',
          });

          if (sendResponse.data.success) {
            await Swal.fire({
              icon: 'success',
              title: '인증번호 발송 성공.',
              text: '인증번호를 입력해주세요.',
            });
            this.showVerification = true;
          } else {
            console.error(sendResponse.data.error);
          }
        }
      } catch (error) {
        console.error('인증번호 발송 실패:', error);
      }
    },
    async verifyCode() {
      try {
        const response = await axios.post('/api/user/verify-code', {
          user_email: this.user_email,
          user_email_code: this.verificationCode,
        });

        if (response.data.success) {
          // 서버에서 코드 검증 성공 시, 다음 단계로 전환
          await Swal.fire({
            icon: 'success',
            title: '인증완료!',
            text: '회원가입 페이지로 넘어갑니다.',
          });
          this.showNextStep = true;
          this.user.user_email = this.user_email;
          this.$router.push({
            name: 'userInsert',
            query: { user_email: this.user_email }, // params 대신 query 사용
          });
        } else {
          Swal.fire({
            icon: 'warning',
            title: '인증실패!',
            text: '인증번호가 틀립니다.',
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'warning',
          title: '인증실패!',
          text: '인증번호가 틀립니다.',
        });
      }
    },
  },

  computed: {
    isEmailInvalid() {
      const emailPattern = /^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/;
      return this.user_email.length > 0 && !emailPattern.test(this.user_email);
    },
    canSendVerificationCode() {
      // 필수 약관 체크 여부 확인
      const requiredAgreementsChecked = this.agreements.slice(0, 2).every((agreement) => agreement.checked);

      // 이메일 유효성과 필수 약관 및 선택 약관 체크 여부 모두 충족해야 버튼 활성화
      return !this.isEmailInvalid && requiredAgreementsChecked;
    },
  },
};
</script>
<style scoped>
.container {
  margin: 0 auto;
}
.containerOne {
  margin: 0 auto;
  border: solid 1px #ebebeb;
  background-color: #f8f8f8;
  width: 760px;
  margin-bottom: 50px;
}
.containerTwo {
  border: solid 1px rgb(212, 212, 212);
  width: 600px;
  height: 60px;
  border-radius: 3px;
  margin: 0 auto;
}
.containerThree {
  width: 600px;
  margin: 0 auto;
  margin-top: 16px;
  text-decoration: none; /* 밑줄 제거 */
  color: inherit; /* 부모 요소의 색상 상속 */
}
.containerFour {
  padding-left: 25px;
  padding-top: 20px;
  padding-bottom: 20px;
  margin: 0 auto;
  border: solid 1px rgb(212, 212, 212);
  width: 600px;
  margin-bottom: 50px;
  border-radius: 3px;
}
</style>
