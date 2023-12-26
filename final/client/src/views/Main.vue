<template>
  <div>
    <Logo></Logo>
    <Header></Header>
    <Footer></Footer>
  </div>
</template>


<script>
  import Logo from '../layouts/MainLogo.vue'
  import Header from '../layouts/MainHeader.vue';
  import Footer from '../layouts/MainFooter.vue';

  export default {
    components  : { Logo, Header, Footer }
  }
</script>


<style>

</style>