<template>
  <div>
    <banner></banner>
    <where></where>
    <random></random>

  </div>
</template>

<script>
import banner from '../layouts/MainCarousel.vue'
import where from '../layouts/MainWhere.vue'
import random from '../layouts/MainRandomCard.vue'

export default {
    components: {
        banner,where,random
    }
}
</script>

<style>

</style>