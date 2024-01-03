<template>
    <div class="container">
  
        <div class="row">
            <div class="container text-center">
                <div class="row">
                    <div class="col-sm-8">상품이미지 들어갈 곳</div>  
                        <div class="col-sm-4">
                            <tr>
                                <th>상품이름: {{userProdInfo.prod_name}}</th>
                            </tr>
                            <br>
  
                            <tr>
                                <th>상품가격: {{ userProdInfo.prod_price }}</th>
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
            </div>
        </div>
        <br>
        <br>
        <div>
            <tr>
                <th>{{ userProdInfo.prod_content }}</th>
            </tr>
        </div>
        <hr>
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

<style scoped>

</style>