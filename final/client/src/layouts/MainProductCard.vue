<template>
    <div class="popular_destination_area">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-6">
                    <div class="section_title text-center mb_70">
                        <h3><img width="280" height="47" src="../image/logo/이런축제어때요.png" ></h3>
                        <p>Suffered alteration in some form, by injected humour or good day randomised booth anim 8-bit hella wolf moon beard words.</p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div v-for="(prod, i) in prodRandomList" :key="i" class="col-lg-4 col-md-6">
                    <div class="single_destination">
                        <div class="thumb">
                            <img src="img/destination/1.png" alt="">
                        </div>
                        <div class="content">
                            <p class="d-flex align-items-center">{{prod.prod_name}} <a>{{prod.prod_price}}</a> </p>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="more_place_btn text-center">
                        <a class="boxed-btn4" href="#">More product</a>
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
            prodRandomList: []
        }
    },
    created(){
            this.getProdRandomList();
    },
    methods : {
        async getProdRandomList(){
            this.prodRandomList = (await axios.get(`/api/product/random`)
                                .catch(err => console.log(err))).data;

            console.log(this.prodRandomList);
            
        }
    }
}
</script>
