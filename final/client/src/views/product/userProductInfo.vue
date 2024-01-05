<template>

    <div class="container">
        <div class="row">
            
            <div class="col-8 col-sm-6" v-if="prodImgs.length > 0 "><img
                    :src="`http://localhost:3000/product/public/uploads/${prodImgs[0].prod_filename}`"
                    class="card-img-top" alt=""></div>

            <div class="col-4">

                <br>

                <tr>
                    <h3><th>상품가격: {{ userProdInfo.prod_price }}</th></h3>
                </tr>
                <br>

                <tr>
                    <th>지역: {{ userProdInfo.prod_loc }}</th>
                </tr>
                <br>

                <tr>
                    <th>분류: {{ userProdInfo.prod_cate }}</th>
                </tr>
                <br>

                <tr>
                    <th>상태: {{ userProdInfo.prod_state }}</th>
                </tr>
                <br>
            </div>




        </div>
        <div calss="row align-items-end" style="display: flex;">

                 <template  v-for="(img, idx) in prodImgs">              
                    <div  v-if="idx < 3 && img.prod_filename"  :key="idx" class="col-4 col-sm-3" style="margin: 10px;">                   
                        <img :src="`http://localhost:3000/product/public/uploads/${img.prod_filename}`" class="card-img-top"
                        alt="">
                        <h3 class="" style="text-align: center;">{{ idx }}번 사진 입니다</h3>                    
                    </div>
                </template>

        </div> 

        <tr>
            <th>{{ userProdInfo.prod_content }}</th>
        </tr>
    </div>




</template>

<script>
    import axios from 'axios';
    import Admin from '../Admin.vue';

    export default {
        components: {
            Admin
        },
        data() {
            return {
                searchProd: '',
                userProdInfo: {},
                prodImgs: []
            }
        },
        created() {
            this.searchProd = this.$route.query.prod_code;
            this.getUserProdInfo();
            this.getProdImg()
        },
        methods: {
            async getUserProdInfo() {
                let result = await axios.get(`/api/product/user/${this.searchProd}`)
                    .catch(err => console.log(err));


                this.userProdInfo = result.data;

            },
            async getProdImg() {
                console.log(this.searchProd);

                let result = await axios.get(`/api/product/selectAllImg/${this.searchProd}`)
                    .catch(err => console.log(err));


                this.prodImgs = result.data;
                console.log(this.prodImgs);
                console.log(this.prodImgs[0].prod_filename);
            }
        }
    }
</script>

<style scoped>

</style>