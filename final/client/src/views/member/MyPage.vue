<template>
  <div>
    <h3>회원 정보 수정</h3>
    <form @submit.prevent="submitForm">
      <div>
        <label>아이디</label><br>
        <input type="text" v-model="user.user_id" readonly />
      </div>

      <div>
        <label>새로운 비밀번호</label><br>
        <input type="password" v-model="user.user_pw" />
      </div>

      <div>
        <label>기존 비밀번호 확인</label><br>
        <input type="password" v-model="user.user_recpw" />
      </div>

      <!-- 기타 필드들도 유사하게 추가 -->

      <button type="submit">정보 수정</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    async submitForm() {
      try {
        if (this.user.user_pw !== this.user.user_recpw) {
          window.alert('새로운 비밀번호와 기존 비밀번호 확인이 일치하지 않습니다.');
          return;
        }

        let data = {
          user_id: this.user.user_id,
          user_pw: this.user.user_pw,
          // 기타 필요한 정보들도 추가
        };

        let result = await axios.put(`/api/user/update/${this.user.user_id}`, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log(result.data);

        if (result.data.affectedRows === 1) {
          window.alert('회원 정보가 수정되었습니다.');
        } else {
          window.alert('회원 정보 수정에 실패했습니다. 다시 시도해주세요.');
        }
      } catch (error) {
        console.error(error);
        window.alert('회원 정보 수정에 실패했습니다. 다시 시도해주세요.');
      }
    },
  },
};
</script>