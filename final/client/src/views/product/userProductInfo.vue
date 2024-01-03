<template>
  <div class="container">
    <div class="row">
        <div class="container text-center">
            <div class="row">
                <div class="col-sm-8">상품이미지 들어갈 곳</div>
                  
                <div class="col-sm-4">
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
        </div>
    </div>
    <br>
    <br>
    <div>
        <tr>
            <th>{{userProdInfo.prod_content}}</th>
        </tr>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Admin from '../Admin.vue';

export default {
  components: { Admin },
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