<template>
  <div class="container w-70" style="display:inline-block;">
    <table class="table table-hover">
        <thead>
            <tr>
                <th>상품코드</th>
                <th>상품명</th>
                <th>가격</th>
                <th>상품재고</th>
                <th>지역분류</th>
                <th>상품분류</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
          <tr :key="i" v-for="(prod, i) in productList">
            <td>{{ prod.prod_code }}</td>
            <td>{{ prod.prod_name }}</td>
            <td>{{ prod.prod_price }}</td>
            <td>{{ prod.prod_count}}</td>
            <td>{{ prod.prod_loc}}</td>
            <td>{{ prod.prod_cate}}</td>
            <td>
              <button type="button" calss="btn btn-info me-1" @click="deleteProduct(prod_code)">삭제</button>
            </td>
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
      productList: [],
    };
  },
  created(){
    this.getProductList();
  },
  methods : {
    async getProductList(){
      this.productList = (await axios.get('/api/product')
                                      .catch(err => console.log(err))).data;
    },
  },
  deleteProduct(){
    
  }
}
</script>

<style>

</style>