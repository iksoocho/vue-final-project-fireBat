<template>
  <div class="container">
    <div class="row">
        <table class="table" style="border-collapse: collapse">
            <tr>
                <th>상품코드</th>
                <td class="text-center">{{prodInfo.prod_code}}</td>
            </tr>
            <tr>
                <th>상품이름</th>
                <td class="text-center">{{prodInfo.prod_name}}</td>
            </tr>
            <tr>
                <th>상품가격</th>
                <td class="text-center">{{prodInfo.prod_price}}</td>
            </tr>
            <tr>
                <th>상품내용</th>
                <td class="text-center">{{prodInfo.prod_content}}</td>
            </tr>
            <tr>
                <th>상품재고</th>
                <td class="text-center">{{prodInfo.prod_count}}</td>
            </tr>
            <tr>
                <th>지역분류</th>
                <td class="text-center">{{prodInfo.prod_loc}}</td>
            </tr>
            <tr>
                <th>상품분류</th>
                <td class="text-center">{{prodInfo.prod_cate}}</td>
            </tr>
          
        </table>
    </div>
    <div class="row">
            <button class="btn" v-on:click="moveProdUpdate(prodInfo.prod_code)">수정</button>
            <router-link to="/productList" class="btn">목록</router-link> 
            <button class="btn" @click="deleteInfo(prodInfo.prod_code)">삭제</button>
        </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return{
            searchProd : '',
            prodInfo : {}
            
        }
    },
    created(){
        this.searchProd = this.$route.query.prod_code;
        this.getProdInfo();
        
    },
    methods : {
        async getProdInfo(){
            let result = await axios.get(`/api/product/${this.searchProd}`)
                                    .catch(err => console.log(err));
            
            this.prodInfo = result.data;
        },
        moveProdUpdate(prod_code){
            this.$router.push({path: '/productUpdate', query :{ prod_code : prod_code}})
        }
    }
}
</script>

<style>

</style>