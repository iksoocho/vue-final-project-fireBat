<template>
  <div>
    <Logo></Logo>
    <Header />
    <router-view />
    <Footer />
  </div>
</template>
<script>
  import Logo from './layouts/Logo.vue'
  import Header from './layouts/Header.vue';
  import Footer from './layouts/Footer.vue';

  export default {
    components  : { Logo,Header, Footer }
  }
</script>
