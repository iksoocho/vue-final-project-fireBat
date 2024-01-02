<template>
  <div>
    <banner></banner>
    <random></random>
    <product></product>

  </div>
</template>

<script>
import banner from '../layouts/MainCarousel.vue'
import where from '../layouts/MainWhere.vue'
import random from '../layouts/MainRandomCard.vue'
import product from '../layouts/MainProductCard.vue'

export default {
    components: {
        banner,where,random,product
    }
}
</script>

<style>

</style>