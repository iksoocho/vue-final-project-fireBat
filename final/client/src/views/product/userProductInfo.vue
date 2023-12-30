<template>
  <div class="container">
    <div class="table">
        <tr>
            <th>상품이름</th>
            <td>{{userProdInfo.prod_name}}</td>
        </tr>
        <tr>
            <th>상품가격</th>
            <td>{{userProdInfo.prod_price}}</td>
        </tr>
        <tr>
            <th>상품코드</th>
            <td>{{userProdInfo.prod_code}}</td>
        </tr>
        <tr>
            <th>지역</th>
            <td>{{userProdInfo.prod_loc}}</td>
        </tr>
        <tr>
            <th>분류</th>
            <td>{{userProdInfo.prod_cate}}</td>
        </tr>
        <tr>
            <th>상태</th>
            <td>{{userProdInfo.prod_state}}</td>
        </tr>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return{
            searchProd : '',
            userProdInfo: {}
        }
    },
    created(){
        this.searchProd = this.$route.query.prod_code;
        this.getUserProdInfo();
    },
    methods : {
        async getUserProdInfo(){
            let result = await axios.get(`/api/product/user/${this.searchProd}`)
                                    .catch(err => console.log(err));

            console.log(result);
            this.userProdInfo = result.data;
            
        }
    }
}
</script>

<style>

</style>