<template>
   <div class="container">
        <div class="row">
        <div v-for="(prod, i) in productList" :key="i" class="col-md-3 mb-4" @click="goFesInfo(prod.prod_code)">
            <div class="card">
                <img src="../../image/logo/로고.png" class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title">{{ prod.prod_name }} </h5>
                <p class="card-text">{{prod.prod_price}} </p>dfdfdgdtghyr
                <a href="#" class="btn btn-primary">축제 상세페이지</a>
                <!-- <button class="btn btn-xs btn-info" @click="goToUpdate(fes.f_code)">수정</button> -->

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
            productList : [],
        }
    },
    created(){
        this.getProductList();
    },
    methods : {
        async getProductList(){
            this.productList = (await axios.get(`api/product`)
                                            .catch(err => console.log(err))).data;
        },
        goProdInfo(prod_code){
            this.$router.push({path: '/productInfo', query:{prod_code : prod_code}})
        }
    }
}
</script>

<style>

</style>