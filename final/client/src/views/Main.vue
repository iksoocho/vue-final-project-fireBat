<template>
  <div>
    <Logo></Logo>
    <Header></Header>

    <Carousel></Carousel>
    <Where></Where>

    <router-view />
    <Footer></Footer>
  </div>
</template>

<script>

  import Logo from '../layouts/MainLogo.vue'
  import Header from '../layouts/MainHeader.vue';
  import Footer from '../layouts/MainFooter.vue';
  import Carousel from '../layouts/MainCarousel.vue'
  import Where from '../layouts/MainWhere.vue'

  export default {
    components  : { Logo, Header, Footer,Carousel, Where }
  }

</script>

<style></style>
