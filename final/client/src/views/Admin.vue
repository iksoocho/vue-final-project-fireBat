<template>
  <div>
    <Header></Header>
    <div class="container">
      <div class="row">
        <div class="col-2">
      <AdminSideBar></AdminSideBar>
        </div>

        <div class="col-8">
      <router-view />
        </div>
      </div>
    </div>
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