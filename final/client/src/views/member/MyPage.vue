<template>
  <div>
    <h3>회원 정보 수정</h3>
    <form ref="infoUpdateForm" @submit.prevent="submitForm">
      <div>
        <h5>아이디</h5>
        <span>{{ user.user_id }}</span>
      </div>

      <div>
        <label>이름</label><br />
        <input v-if="isEditingName" type="text" v-model="user.user_name" />
        <span v-else>{{ user.user_name }}</span>
        <button type="button" @click="toggleEditMode('name')">
          {{ isEditingName ? "수정완료" : "수정" }}
        </button>
      </div>

      <div>
        <label>성별</label><br />
        <span>{{ getGenderLabel }}</span>
      </div>

      <div>
        <label>생년월일</label><br />
        <span>{{ formattedUserBirth }}</span>
        <input type="hidden" v-model="user.user_birth" />
      </div>

      <div>
        <label>비밀번호</label>
        <button @click="openPasswordChangeModal">비밀번호변경</button>
      </div>

      <AddressSearch :user="user" @address-updated="handleAddressUpdated" />

      <div>
        <label>전화번호</label><br />
        <div :class="{ isEditingTel: isEditingTel }" v-if="isEditingTel">
          <select v-model="user.user_tel_first" class="dropdown" id="telSelect">
            <!-- ... (기존 내용) ... --></select
          >-
          <input
            type="text"
            v-model="user.user_tel_second"
            maxlength="4"
            @input="validateNumericInput('user_tel_second')"
          />-
          <input
            type="text"
            v-model="user.user_tel_third"
            maxlength="4"
            @input="validateNumericInput('user_tel_third')"
          />
        </div>
        <span v-else>{{ formatPhoneNumber(user.user_tel) }}</span>
        <div>
          <button
            class="telButton"
            type="button"
            @click="toggleEditMode('tel')"
          >
            {{ isEditingTel ? "수정완료" : "수정" }}
          </button>
        </div>
      </div>

      <div>
        <label>이메일</label><br />
        <div v-if="isEditingEmail" class="emailInputs">
          <input type="text" v-model="user.user_email_first" />
          <span>@</span>
          <input type="text" v-model="user.user_email_second" />
        </div>
        <span v-else>{{ user.user_email }}</span>
        <div>
          <button
            class="emailButton"
            type="button"
            @click="toggleEditMode('email')"
          >
            {{ isEditingEmail ? "수정완료" : "수정" }}
          </button>
        </div>
      </div>

      <button type="submit">정보 수정</button>
    </form>
    <PasswordChange v-if="isPasswordChangeModalOpen" />
  </div>
</template>

<script>
import PasswordChange from "../../components/PasswordChange.vue";
import axios from "axios";
import AddressSearch from "../../components/AddressSearch.vue";
import moment from "moment";

export default {
  components: {
    AddressSearch,
    PasswordChange,
  },
  data() {
    return {
      user: {
        user_id: "",
        user_name: "",
        user_gender: "",
        user_birth: null,
        user_zip: "",
        user_addr: "",
        user_detail_addr: "",
        user_tel: "",
        user_email: "",
        user_tel_first: "",
        user_tel_second: "",
        user_tel_third: "",
        user_email_first: "",
        user_email_second: "",
      },
      isEditingEmail: false,
      isEditingName: false,
      isEditingTel: false,
      initialTelData: {},
      initialEmailData: {},
      isPasswordChangeModalOpen: false,
    };
  },
  computed: {
    getGenderLabel() {
      return this.user.user_gender === 0
        ? "남"
        : this.user.user_gender === 1
        ? "여"
        : "기타";
    },
    formattedUserBirth() {
      return moment(this.user.user_birth).format("YYYY년 MM월 DD일");
    },
  },
  methods: {
    formatPhoneNumber(phoneNumber) {
      return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
    },
    validateNumericInput(field) {
      if (!/^\d+$/.test(this.user[field])) {
        this.user[field] = this.initialTelData[field];
      }
    },
    resetInputStyles() {
      const inputFields = document.querySelectorAll('input[type="text"]');
      inputFields.forEach((input) => {
        input.style.backgroundColor = "";
        input.style.border = "";
      });
    },
    async loadUserData() {
      try {
        console.log("사용자 정보를 불러오는 중...");
        const response = await axios.get(`/api/user/myPage`);
        console.log("서버 응답완료:", response.data);
        this.user = response.data;
      } catch (error) {
        console.error("사용자 정보를 불러오는 데 실패했습니다.", error);
      }
    },
    async submitForm() {
      try {
        let data = {
          user_name: this.user.user_name,
          user_zip: this.user.user_zip,
          user_addr: this.user.user_addr,
          user_detail_addr: this.user.user_detail_addr,
          user_birth: moment(this.user.user_birth).format("YYYY-MM-DD"),
          user_tel: this.user.user_tel,
          user_email: this.user.user_email,
        };

        let result = await axios.put(`/api/user/myPage`, data);
        console.log(result.data.affectedRows === 1);
        if (result.data.affectedRows === 1) {
          console.log("회원 정보 수정이 완료되었습니다.");
          alert("회원 정보 수정이 완료되었습니다.");
          this.$router.push("/main");
        } else {
          console.error("수정에러", result.data);
        }
      } catch (error) {
        console.error(error);
      }
    },

    handleAddressUpdated(updatedAddress) {
      this.user.user_zip = updatedAddress.user_zip;
      this.user.user_addr = updatedAddress.user_addr;
      this.user.user_detail_addr = "";
    },

    toggleEditMode(section) {
      console.log("Toggle edit mode for:", section);
      console.log("Before:", this.initialEmailData);
      if (section === "name") {
        this.isEditingName = !this.isEditingName;
      } else if (section === "tel") {
        this.isEditingTel = !this.isEditingTel;
        if (this.isEditingTel) {
          const telWithoutDash = this.user.user_tel.replace(/-/g, "");
          this.user.user_tel_first = telWithoutDash.substring(0, 3);
          this.user.user_tel_second = telWithoutDash.substring(3, 7);
          this.user.user_tel_third = telWithoutDash.substring(7, 11);
          this.initialTelData = {
            user_tel_first: this.user.user_tel_first,
          };
        } else {
          this.user.user_tel = `${this.user.user_tel_first}${this.user.user_tel_second}${this.user.user_tel_third}`;
        }
      } else if (section === "email") {
        this.isEditingEmail = !this.isEditingEmail;
        if (this.isEditingEmail) {
          const emailWithoutDash = this.user.user_email;
          this.user.user_email_first = emailWithoutDash.split("@")[0];
          this.user.user_email_second = emailWithoutDash.split("@")[1];
          this.initialEmailData = {
            user_email_first: this.user.user_email_first,
            user_email_second: this.user.user_email_second,
          };
          console.log("초기 이메일 데이터:", this.initialEmailData);
        } else {
          this.user.user_email = `${this.user.user_email_first}@${this.user.user_email_second}`;
        }
      }
    },
    openPasswordChangeModal() {
      try {
        if (this.$refs.infoUpdateForm) {
          this.preventFormSubmission();
          this.isPasswordChangeModalOpen = true;
        } else {
          console.error("Form element not found:", this.$refs.infoUpdateForm);
        }
      } catch (error) {
        console.error("Error in openPasswordChangeModal:", error);
      }
    },

    preventFormSubmission() {
      this.$refs.infoUpdateForm.removeEventListener("submit", this.submitForm);
    },
  },
  created() {
    this.loadUserData();
    if (this.isEditingTel && this.initialTelData.user_tel_first) {
      this.user.user_tel_first = this.initialTelData.user_tel_first;
    }
  },
};
</script>

<style scoped>
.isEditingTel {
  width: 250px;
}
.isEditingTel input {
  width: 50px;
}
.password-change-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
