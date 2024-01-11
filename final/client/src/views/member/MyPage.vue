<template>
  <div class="container">
    <SideBar />
  </div>
</template>
<script>
import SideBar from '../../layouts/SideBar.vue';
export default {
  computed: {
    userId() {
      const userData = JSON.parse(sessionStorage.getItem('user'));
      console.log('userData:', userData); // 확인용 로그 추가
      return userData ? userData : null;
    },
  },
  name: 'sideBar',
  components: {
    SideBar,
  },
};
</script>
<style>
.container {
  margin-bottom: 50px;
}
.container-two {
  text-decoration: none; /* 밑줄 제거 */
  color: inherit; /* 부모 요소의 색상 상속 */
}
</style>
