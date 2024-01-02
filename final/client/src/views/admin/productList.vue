<template>
  <div>
    <table class="table table-hover">
        <thead>
            <tr>
                <th>상품코드</th>
                <th>상품명</th>
                <th>가격</th>
                <th>상품재고</th>
                <th>지역분류</th>
                <th>상품분류</th>
                <th>등록날짜</th>
                <!-- <th></th> -->
            </tr>
        </thead>
        <tbody>
          <tr :key="i" v-for="(prod, i) in productList" @click="moveProductInfo(prod.prod_code)">
            <td>{{ prod.prod_code }}</td>
            <td>{{ prod.prod_name }}</td>
            <td>{{ prod.prod_price }}</td>
            <td>{{ prod.prod_count}}</td>
            <td>{{ prod.prod_loc}}</td>
            <td>{{ prod.prod_cate}}</td>
            <td>{{ $dateFormat(prod.prod_date, 'yyyy-MM-dd')}}</td>
            <td>
              <!-- <button type="button" calss="btn btn-info me-1" @click="deleteProduct(prod.prod_code)">삭제</button> -->
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
    moveProductInfo(prod_code){
        this.$router.push({ path: '/productInfo', query : { prod_code : prod_code}})
    },
    // async deleteProduct(prodNo){
      
    //   let result = (await axios.delete(`/api/product/delete/${prodNo}`, {data : data})
    //                                   .catch(err => console.log(err)))

    //   let count = result.data.affectedRows;
    //   console.log(count);
    //   if(count == 0){
    //         alert('정상적으로 삭제 되지 않음')
    //     } else{
    //         alert('정상적으로 삭제')
            
    //     }
    //  }
  },
}
</script>

<style>

</style>