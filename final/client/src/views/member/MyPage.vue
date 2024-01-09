<template>
  <div>
    <h1>마이페이지</h1>

    <a class="container-two" href="/userCheck"><b>회원정보수정</b></a
    ><br />
    <a class="container-two" href="/userQuit"><b>회원탈퇴</b></a><br />
    <a href="/orderList">주문내역</a>

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
<style>
.container-two {
  text-decoration: none; /* 밑줄 제거 */
  color: inherit; /* 부모 요소의 색상 상속 */
}
</style>
