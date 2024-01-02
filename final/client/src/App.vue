<template>
    <router-view />  
</template>

<script>
import KakaoMap from "../src/views/festival/festivalCalender.vue";

export default {
  name: "App",
  components: {
    KakaoMap,
  },
  
};
</script>