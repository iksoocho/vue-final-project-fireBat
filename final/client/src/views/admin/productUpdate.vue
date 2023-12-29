<template>
  <div class="container">
    
       <div class="row">
        <table class="table" style="border-collapse: collapse">
            <tr>
                <th>상품코드</th>
                <td class="text-center">
                    <input type="text" v-model="prodInfo.prod_code" readonly>
                </td>
            </tr>
            <tr>
                <th>상품이름</th>
                <td class="text-center">
                    <input type="text" v-model="prodInfo.prod_name">
                </td>
                
            </tr>
            <tr>
                <th>상품가격</th>
                <td class="text-center">
                    <input type="text" v-model="prodInfo.prod_price">
                </td>
            </tr>
            <tr>
                <th>상품내용</th>
                <td class="text-center">
                    <input type="text" v-model="prodInfo.prod_content">
                </td>
            </tr>
            <tr>
                <th>상품재고</th>
                <td class="text-center">
                    <input type="number" v-model="prodInfo.prod_count">
                </td>
            </tr>
            <tr>
                <th>지역분류</th>
                <td class="text-center">
                    <input type="text" v-model="prodInfo.prod_loc">
                </td>
            </tr>
            <tr>
                <th>상품분류</th>
                <td class="text-center">
                    <input type="text" v-model="prodInfo.prod_cate">
                </td>
            </tr>
          <button v-on:click="updateInfo">수정</button>
        </table>
    </div>
   
  </div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return{
            prodInfo : {}
        }
    },
    created(){
        this.getProdInfo(this.$route.query.prod_code);
    },
    methods : {
        async getProdInfo(prod_code){
            let result = await axios.get(`api/product/` + prod_code)
            this.prodInfo = result.data
            console.log(result);
        },
        async updateInfo(){
            let data = {
                "param" : this.prodInfo,
            };
            let result = await axios.put(`api/product/update/${this.prodInfo.prod_code}`, data)
                                    .catch(err => console.log(err));

            console.log(result.data);
            if(result.data.changedRows == 0){
                alert(`수정되지 않았습니다.${result.data.message}`)
            } else {
                alert(`정삭적으로 수정되었습니다.`)
                this.$router.push({path: '/productInfo', query:{prod_code : this.prodInfo.prod_code}})
            }
        },
    }
}
</script>

<style>

</style>