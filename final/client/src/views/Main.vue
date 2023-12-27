<template>
  <div>
    <Header></Header>
    <router-view />
    <Footer></Footer>
  </div>
</template>

<script>


  import Header from '../layouts/MainHeader.vue';
  import Footer from '../layouts/MainFooter.vue';
  

  export default {
    components  : {Header, Footer }
  }

</script>

<style></style>
