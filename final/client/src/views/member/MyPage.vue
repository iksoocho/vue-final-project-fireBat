<template>
  <div>
    <h1>마이페이지</h1>
    <a href="/userCheck">회원정보수정</a><br />
    <a href="#">회원탈퇴</a>
  </div>
</template>
<script>
export default {
  computed: {
    userId() {
      const userData = JSON.parse(sessionStorage.getItem('user'));
      console.log('userData:', userData); // 확인용 로그 추가
      return userData ? userData : null;
    },
  },
};
</script>
