<template>
  <div class="container">
    <h3
      style="
        height: 100px;
        line-height: 100px;
        font-family: 'Noto Sans KR';
        font-size: 24px;
        color: #333;
        font-weight: 700;
      "
    >
      회원 정보
    </h3>
    <div
      style="
        border: solid 1px #d8d8d8;
        padding-top: 60px;
        width: 920px;
        margin: 0 auto;
        height: 900px;
        margin-bottom: 50px;
        background-color: #fff;
      "
    >
      <h5 style="text-align: left; font-weight: bold; padding-left: 80px">필수정보</h5>
      <div class="formContainer">
        <form @submit.prevent="submitForm">
          <div>
            <th>아이디</th>
            <td>{{ user.user_id }}</td>
          </div>

          <div>
            <th style="vertical-align: middle">이름</th>
            <td>
              <input
                v-if="isEditingName"
                type="text"
                v-model="user.user_name"
                style="
                  width: 100px;
                  height: 38px;
                  padding-left: 10px;
                  vertical-align: middle;
                  border: solid 1px #ebebeb;
                  border-top-color: #d8d8d8;
                  border-left-color: #d8d8d8;
                  border-radius: 3px;
                  background-color: #fff;
                "
              />
              <span v-else style="vertical-align: middle">{{ user.user_name }}</span>

              <button
                type="button"
                class="btn btn-danger"
                style="margin-left: 16px; vertical-align: middle"
                @click="toggleEditMode('name')"
              >
                {{ isEditingName ? '수정완료' : '수정' }}
              </button>
            </td>
          </div>

          <div>
            <th>성별</th>
            <td>
              {{ getGenderLabel }}
            </td>
          </div>

          <div>
            <th>생년월일</th>
            <!-- 사용자에게는 'YYYY년 MM월 DD일' 형식으로 표시 -->
            <td>
              {{ formattedUserBirth }}
            </td>
            <!-- 실제로 서버에 전송되는 값은 날짜만 포함된 'YYYY-MM-DD' 형식 -->
            <input type="hidden" v-model="user.user_birth" />
          </div>

          <div>
            <th style="vertical-align: middle">비밀번호</th>
            <td>
              <button type="button" class="btn btn-danger" @click="openPasswordChangePopup" style="margin-top: 4px">
                비밀번호 변경
              </button>
            </td>
          </div>

          <!-- AddressSearch 컴포넌트를 포함합니다 -->
          <th style="vertical-align: middle">주소</th>
          <td style="padding-top: 25px">
            <AddressSearch :user="user" @address-updated="handleAddressUpdated" />
          </td>

          <!-- 추후 컴포넌트화.(2024,01,05) -->
          <div>
            <th style="height: 56px">전화번호</th>
            <td>
              <div style="display: flex; align-items: center">
                <div :class="{ isEditingTel: isEditingTel }" v-if="isEditingTel">
                  <select
                    v-model="user.user_tel_first"
                    class="dropdown"
                    style="
                      width: 70px;
                      height: 40px;
                      border: solid 1px #ebebeb;
                      border-top-color: #d8d8d8;
                      border-left-color: #d8d8d8;
                      border-radius: 3px;
                      background-color: #fff;
                    "
                    id="telSelect"
                  >
                    <option value="02">02</option>
                    <option value="031">031</option>
                    <option value="032">032</option>
                    <option value="033">033</option>
                    <option value="041">041</option>
                    <option value="043">043</option>
                    <option value="044">044</option>
                    <option value="051">051</option>
                    <option value="052">052</option>
                    <option value="053">053</option>
                    <option value="054">054</option>
                    <option value="055">055</option>
                    <option value="061">061</option>
                    <option value="062">062</option>
                    <option value="063">063</option>
                    <option value="064">064</option>
                    <option value="010">010</option>
                    <option value="011">011</option>
                    <option value="016">016</option>
                    <option value="017">017</option>
                    <option value="018">018</option>
                    <option value="019">019</option></select
                  >-
                  <input
                    type="text"
                    v-model="user.user_tel_second"
                    maxlength="4"
                    @input="validateNumericInput('user_tel_second')"
                    style="
                      width: 70px;
                      height: 40px;
                      border: solid 1px #ebebeb;
                      border-top-color: #d8d8d8;
                      border-left-color: #d8d8d8;
                      border-radius: 3px;
                      background-color: #fff;
                    "
                  />-
                  <input
                    type="text"
                    v-model="user.user_tel_third"
                    maxlength="4"
                    @input="validateNumericInput('user_tel_third')"
                    style="
                      width: 70px;
                      height: 40px;
                      border: solid 1px #ebebeb;
                      border-top-color: #d8d8d8;
                      border-left-color: #d8d8d8;
                      border-radius: 3px;
                      background-color: #fff;
                    "
                  />
                </div>
                <span style="margin-right: 10px" v-else>{{ formatPhoneNumber(user.user_tel) }}</span>

                <button class="btn btn-danger" type="button" @click="toggleEditMode('tel')">
                  {{ isEditingTel ? '수정완료' : '수정' }}
                </button>
              </div>
            </td>
          </div>

          <div>
            <th>이메일</th>
            <td style="solid 1px #ebebeb">
              <div style="display: flex; align-items: center">
                <div v-if="isEditingEmail" class="emailInputs">
                  <input
                    type="text"
                    style="
                      width: 140px;
                      height: 40px;
                      padding-left: 10px;
                      border: solid 1px #ebebeb;
                      border-top-color: #d8d8d8;
                      border-left-color: #d8d8d8;
                      border-radius: 3px;
                      background-color: #fff;
                    "
                    v-model="user.user_email_first"
                  />
                  <span style="margin-left: 10px">@</span>
                  <input
                    type="text"
                    v-model="user.user_email_second"
                    style="
                      width: 140px;
                      height: 40px;
                      padding-left: 10px;
                      margin-left: 10px;
                      border: solid 1px #ebebeb;
                      border-top-color: #d8d8d8;
                      border-left-color: #d8d8d8;
                      border-radius: 3px;
                      background-color: #fff;
                    "
                  />
                </div>
                <span v-else>{{ user.user_email }}</span>
                <div>
                  <button
                    class="btn btn-danger"
                    type="button"
                    style="margin-left: 10px"
                    @click="toggleEditMode('email')"
                  >
                    {{ isEditingEmail ? '수정완료' : '수정' }}
                  </button>
                </div>
              </div>
              <p
                v-if="
                  isEditingEmail &&
                  (!isValidEmail(user.user_email_first, user.user_email_second) ||
                    isExistingEmail(user.user_email_first, user.user_email_second))
                "
                style="color: red; margin-top: 5px; font-size: 12px; margin-bottom: 0px"
              >
                {{
                  !isValidEmail(user.user_email_first, user.user_email_second)
                    ? '올바른 이메일 형식이 아닙니다.'
                    : '이미 존재하는 이메일 주소입니다.'
                }}
              </p>
            </td>
          </div>
          <!-- 다른 필요한 정보를 포함합니다 -->
          <div style="text-align: center; margin-top: 30px">
            <button
              class="btn btn-danger"
              type="submit"
              style="width: 220px; height: 60px; font-size: 20px; font-weight: bold"
            >
              회원정보 수정
            </button>
          </div>
        </form>
      </div>
    </div>
    <PasswordChangePopup
      v-if="isChangingPassword"
      @change-password="handleChangePassword"
      @close="closePasswordChangePopup"
    />
  </div>
</template>

<script>
import axios from 'axios';
import AddressSearch from '../../components/AddressSearch.vue';
import PasswordChangePopup from '../../components/PasswordPopup.vue';
import moment from 'moment';
import Swal from 'sweetalert2';
export default {
  components: {
    AddressSearch,
    PasswordChangePopup,
  },
  data() {
    return {
      user: {
        user_id: '',
        user_name: '',
        user_gender: '', // default 값 설정
        user_birth: null,
        user_zip: '',
        user_addr: '',
        user_detail_addr: '',
        user_tel: '',
        user_email: '',
        user_tel_first: '', // 전화번호 첫 번째 부분을 저장하는 추가 속성
        user_tel_second: '', // 전화번호 두 번째 부분을 저장하는 추가 속성
        user_tel_third: '',
        user_email_first: '',
        user_email_second: '',
      },
      isChangingPassword: false,
      isEditingEmail: false,
      isEditingName: false,
      isEditingTel: false,
      initialTelData: {},
      initialEmailData: {},
      isChangingPassword: false,
    };
  },
  computed: {
    getGenderLabel() {
      return this.user.user_gender === 0 ? '남' : this.user.user_gender === 1 ? '여' : '기타';
    },
    formattedUserBirth() {
      // user_birth를 'YYYY-MM-DD' 형식으로 변환
      return moment(this.user.user_birth).format('YYYY년 MM월 DD일');
    },
  },
  methods: {
    isValidEmail(emailFirst, emailSecond) {
      const emailRegex = /^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/;
      return emailRegex.test(`${emailFirst}@${emailSecond}`);
    },
    isExistingEmail(emailFirst, emailSecond) {
      const existingEmails = ['example@example.com', 'another@example.com']; // 기존의 이메일 목록
      const currentEmail = `${emailFirst}@${emailSecond}`;
      return existingEmails.includes(currentEmail);
    },
    handleChangePassword() {
      this.$emit('change-password', {
        newPassword: this.newPassword,
        confirmPassword: this.confirmPassword,
      });
    },
    handleClose() {
      this.$emit('close');
    },
    openPasswordChangePopup() {
      console.log('비밀번호 변경 팝업을 엽니다...');
      this.$nextTick(() => {
        this.isChangingPassword = true;
      });
    },

    closePasswordChangePopup() {
      this.isChangingPassword = false;
    },
    formatPhoneNumber(phoneNumber) {
      // 전화번호에 '-' 추가
      return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    },
    validateNumericInput(field) {
      // 입력값이 숫자가 아니면 초기값으로 되돌립니다.
      if (!/^\d+$/.test(this.user[field])) {
        this.user[field] = this.initialTelData[field];
      }
    },
    resetInputStyles() {
      // Reset the styles of the input fields when exiting edit mode
      const inputFields = document.querySelectorAll('input[type="text"]');
      inputFields.forEach((input) => {
        input.style.backgroundColor = ''; // Reset background color
        input.style.border = ''; // Reset border
      });
    },
    async loadUserData() {
      try {
        // 서버에서 사용자 정보를 불러오는 API 호출
        console.log('사용자 정보를 불러오는 중...');
        const response = await axios.get(`/api/user/userUpdate`);
        // 불러온 사용자 정보를 컴포넌트 데이터에 저장
        console.log('서버 응답완료:', response.data);
        this.user = response.data;
      } catch (error) {
        console.error('사용자 정보를 불러오는 데 실패했습니다.', error);
      }
    },
    async submitForm() {
      try {
        let data = {
          user_name: this.user.user_name,
          user_zip: this.user.user_zip,
          user_addr: this.user.user_addr,
          user_detail_addr: this.user.user_detail_addr,
          user_birth: moment(this.user.user_birth).format('YYYY-MM-DD'),
          user_tel: this.user.user_tel,
          user_email: this.user.user_email,
          // 다른 필요한 정보를 추가합니다
        };

        // 회원정보 수정 API 호출
        let result = await axios.put(`/api/user/userUpdate`, data);
        console.log(result.data.affectedRows === 1);
        if (result.data.affectedRows === 1) {
          // 수정 성공 시 처리
          await Swal.fire({
            icon: 'success',
            title: '회원정보 수정 완료.',
            text: '회원정보가 성공적으로 변경되었습니다.',
            conriemButtonText: '확인',
          });
          await this.$router.push('/main');
          window.location.reload();

          // 수정 후 마이 페이지로 이동
        } else {
          // 오류 시 처리
          console.error('수정에러', result.data);
          // 사용자에게 오류 메시지 표시
          // 예: this.errorMessage = result.data.error;
        }
      } catch (error) {
        console.error(error);
        // 오류 처리
      }
    },

    handleAddressUpdated(updatedAddress) {
      // AddressSearch 컴포넌트에서 주소가 업데이트되면 사용자의 주소를 업데이트합니다
      this.user.user_zip = updatedAddress.user_zip;
      this.user.user_addr = updatedAddress.user_addr;
      this.user.user_detail_addr = ''; // 수정 시 상세주소 초기화
    },

    toggleEditMode(section) {
      console.log('Toggle edit mode for:', section);
      console.log('Before:', this.initialEmailData);
      if (section === 'name') {
        this.isEditingName = !this.isEditingName;
      } else if (section === 'tel') {
        this.isEditingTel = !this.isEditingTel;
        if (this.isEditingTel) {
          const telWithoutDash = this.user.user_tel.replace(/-/g, '');
          this.user.user_tel_first = telWithoutDash.substring(0, 3);
          this.user.user_tel_second = telWithoutDash.substring(3, 7);
          this.user.user_tel_third = telWithoutDash.substring(7, 11);
          // 추가: 초기 전화번호 데이터 저장
          this.initialTelData = {
            user_tel_first: this.user.user_tel_first,
          };
        } else {
          this.user.user_tel = `${this.user.user_tel_first}${this.user.user_tel_second}${this.user.user_tel_third}`;
        }
      } else if (section === 'email') {
        // 이메일 섹션에 대한 편집 모드를 한 번만 토글
        this.isEditingEmail = !this.isEditingEmail;
        if (this.isEditingEmail) {
          // 편집을 위한 초기값 설정
          const emailWithoutDash = this.user.user_email;
          this.user.user_email_first = emailWithoutDash.split('@')[0];
          this.user.user_email_second = emailWithoutDash.split('@')[1];
          this.initialEmailData = {
            user_email_first: this.user.user_email_first,
            user_email_second: this.user.user_email_second,
          };
          console.log('초기 이메일 데이터:', this.initialEmailData);
        } else {
          // 편집 모드를 빠져나올 때 값 결합
          this.user.user_email = `${this.user.user_email_first}@${this.user.user_email_second}`;
        }
      }
    },
  },
  created() {
    this.loadUserData();
    // 추가: 전화번호 수정 모드에서 초기 데이터가 있으면 select 초기값 설정
    if (this.isEditingTel && this.initialTelData.user_tel_first) {
      this.user.user_tel_first = this.initialTelData.user_tel_first;
    }
  },
};
</script>
<style scoped>
.isEditingTel {
  width: 240px;
}
.isEditingTel input {
  width: 50px;
}
.container {
  margin: 0 auto;
  text-align: center;
}
.formContainer {
  margin: 0 auto;
  position: relative;
  width: 760px;
  text-align: left;
  height: 1000px;
  border-right-color: #333;
}
th {
  font-size: 16px;
  width: 140px;
  height: 50px;
  padding: 6px 0 6px 0;
  line-height: 16px;
  text-align: center;
  color: #333;
  text-indent: 0;
  border-top: solid 1px #ebebeb;
  border-right: solid 1px #ebebeb;
  background-color: #f8f8f8;
  border-bottom: solid 1px #ebebeb;
}
td {
  width: 620px;
  height: 50px;
  padding: 13px 19px 16px;
  min-height: 22px;
  line-height: 20px;
  font-size: 16px;
  color: #666;
  text-indent: 0;
  border-top: solid 1px #ebebeb;
  border-right: solid 1px #ebebeb;
  border-bottom: solid 1px #ebebeb;
  border-right: none;
}
</style>
