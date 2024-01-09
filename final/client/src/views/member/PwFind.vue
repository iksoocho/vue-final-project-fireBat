<template>
  <div class="container">
    <h1>비밀번호찾기</h1>
    <input type="text" placeholder="ID를 입력해주세요." />
    <button @click="sendId">다음</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user_id: '',
    };
  },
  methods: {
    async sendId() {
      try {
        const checkId = await axios.get(`api/user/pwFind`, {
          user_id: this.user_id,
        });
        console.log(checkId);
        if (checkId) {
          console.log(checkId);
        }
      } catch (error) {
        console.error('아이디 확인 실패:', error);
      }
    },
  },
};
</script>
