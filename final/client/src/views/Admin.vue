<template>
  <div>
    <Header></Header>
    <AdminSideBar></AdminSideBar>
    <router-view :key="$route.fullPath"/>
    <Footer></Footer>

  </div>
</template>

<script>
import AdminSideBar from '../layouts/AdminSidebar.vue';
import Header from '../layouts/MainHeader.vue';
import Footer from '../layouts/MainFooter.vue';

export default {
    components : {
        AdminSideBar,Header,Footer
    }
}
</script>

<style>

</style>