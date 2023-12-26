<template>
  <div class="container">
    <form>
        <label for="code">상품코드</label>
        <input type="text" id="code" v-model="not" readonly>

        <label for="name">상품이름</label>
        <input type="text" id="name" v-model="not">

        <label for="content">상품내용</label>
        <textarea id="content" style="height:200px" v-model="not"></textarea>

        <label for="image">상품이미지</label>
        <input type="text" id="image" v-model="not">

        <label for="price">상품가격</label>
        <input type="text" id="price" v-model="not">

        <label for="count">상품재고</label>
        <input type="text" id="count" v-model="not">

        <label for="local">지역 분류</label>
        <input type="text" id="local" v-model="not">

        <label for="cate">상품 분류</label>
        <input type="text" id="cate" v-model="not">
        
    </form>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>