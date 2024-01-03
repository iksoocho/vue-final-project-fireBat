<template>


   <div class="container">
        <div class="row">
        <div v-for="(prod, i) in userProductList" :key="i" class="col-md-3 mb-4" @click="goProdInfo(prod.prod_code)">
            <div class="card">
                <img src="../../image/logo/로고.png" class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title">{{ prod.prod_name }} </h5>
                <p class="card-text">{{prod.prod_price}}원</p>
                <p calss="card-text">{{prod.prod_state}}</p>
                <a href="#" class="btn btn-primary">축제 상세페이지</a>
                

            </div>
            </div>
        </div>
        </div>
    </div>
    
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return{
            userProductList : [],
        }
    },
    created(){
        this.getUserProductList();
    },
    methods : {
        async getUserProductList(){
            this.userProductList = (await axios.get(`/api/product/user`)
                                            .catch(err => console.log(err))).data;
        },
        goProdInfo(prod_code){
            this.$router.push({path: '/userProductInfo', query:{prod_code : prod_code}}) // 얘는 손봐야함 userProductInfo 로 바꾸고 다시 작업
        }
    }
}
</script>

<style>

</style>