<template>
  <div>


     <div>
    <input v-model="inputword"> 
     <p :key="i" v-for="(product, i) in productList"></p>
  </div>



    <h3>상품목록</h3>
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
                <th></th>
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
            <td type="radio"></td>
            <td>
              <button type="button" calss="btn btn-info me-1" @click="deleteProduct(prod.prod_code)">삭제</button>
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
      inputword: '',
    };
  },
  created(){
    this.getProductList();
  },
  computed: {
    findProductList(){
      if(this.inputword){
        return this.productList.filter(productList => productList.includes(this.inputword));
      } else {
        return this.productList
      }
    }
  },
  methods : {
    async getProductList(){
      this.productList = (await axios.get('/api/product')
                                      .catch(err => console.log(err))).data;
    }, 
    moveProductInfo(prod_code){
        this.$router.push({ path: '/productInfo', query : { prod_code : prod_code}})
    },

    async deleteProduct(prod_code){
      
      let result = await axios.delete(`/api/product/delete/${prod_code}`)
                              .catch(err => console.log(err));
      
      console.log(result.data);
      let count = result.data.affectedRows;

      if(count == 0){
            alert('정상적으로 삭제 되지 않았습니다.')
        } else{
            alert('정상적으로 삭제 되었습니다.')
            this.$router.push({name: 'productList' })            
        }
     },
            
  }
}
</script>

<style>
  .review-toolbar {
        display: flex;
        justify-content: space-between;
        background-color: #363636;
        padding: 10px;
        color: white;
        margin: 10px;
    }

    .total-reviews {
        font-weight: bold;
    }

    .search-bar {
        display: flex;
    }

    .search-bar input {
        margin-right: 10px;
        border-radius: 8px;
    }


    .sellerReview {}

    .display-options {
        display: flex;
        align-items: center;
        margin-right: 10px;
    }

    .reviews-per-page {
        margin-left: 10px;
    }

    .Name {
        width: 100px;
    }

    .pName {
        width: 200px;
    }

    .likecnt {
        width: 150px;
    }

    .Del {
        width: 200px;
    }
</style>