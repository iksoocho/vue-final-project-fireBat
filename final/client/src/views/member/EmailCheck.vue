<template>
  <div class="container">
    <h1>Email 확인 페이지</h1>
    <p>이메일: {{ userEmail }}</p>
    <!-- 이후의 로직 추가 -->
  </div>
</template>

<script>
export default {
  computed: {
    userEmail() {
      return this.$route.params.userEmail;
    },
  },
  // 이후의 메서드나 라이프사이클 훅 추가
};
</script>
