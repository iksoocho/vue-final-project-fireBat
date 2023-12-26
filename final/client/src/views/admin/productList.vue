<template>
  <div class="container">
    <table class="table table-hover">
        <thead>
            <tr>
                <th>상품코드</th>
                <th>상품명</th>
                <th>가격</th>
                <th>상품재고</th>
                <th>상품분류</th>
            </tr>
        </thead>
        <tbody>
          <tr :key="i" v-for="(prod,i) in productList">
            <td>{{ prod.product_code }}</td>
            <td>{{ prod.product_name }}</td>
            <td>{{ prod.product_price }}</td>
            <td>{{ prod.product_count}}</td>
            <td>{{ prod.product_cate}}</td>
          </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data(){
    return {
      productList: []
    };
  },
  created(){
    this.getProductList();
  },
  methods : {
    async getProductList(){
      this.productList = (await axios.get('api/product')
                                      .catch(err => console.log(err)).data);
    },
    goToDetail(prodNo){
      this.$router.push({path : '/' , query : {prodNo : prodNo}});
    },
  }
}
</script>

<style>

</style>