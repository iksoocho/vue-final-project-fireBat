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
                      <select name="cateloc" v-model="prodInfo.prod_loc">
                        <option value="서울">서울</option>
                        <option value="인천">인천</option>
                        <option value="대전">대전</option>
                        <option value="대구">대구</option>
                        <option value="광주">광주</option>
                        <option value="부산">부산</option>
                        <option value="울산">울산</option>
                        <option value="세종">세종</option>
                        <option value="경기 ">경기</option>
                        <option value="강원 ">강원</option>
                        <option value="충북">충북</option>
                        <option value="충남">충남</option>
                        <option value="경북">경북</option>
                        <option value="경남">경남</option>
                        <option value="전북">전북</option>
                        <option value="전남">전남</option>
                        <option value="제주">제주</option>
            </select>
                </td>
            </tr>
            <tr>
                <th>상품분류</th>
                <td class="text-center">
                  <select name="cate" v-model="prodInfo.prod_cate">
                     <option value="과일">과일</option>
                     <option value="채소">채소</option>
                     <option value="곡물">곡물</option>
                     <option value="주류">주류</option>
                  </select>
                </td>
            </tr>
          <button v-on:click="updateInfo">수정</button>
        </table>
    </div>
   
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    data(){
        return{
            prod_code : '',
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
        async updateInfo(){
            let data = {
                param : {
                    prod_code : this.prodInfo.prod_code,
                    prod_name : this.prodInfo.prod_name,
                    prod_price : this.prodInfo.prod_price,
                    prod_content : this.prodInfo.prod_content,
                    prod_count : this.prodInfo.prod_count,
                    prod_loc : this.prodInfo.prod_loc,
                    prod_cate : this.prodInfo.prod_cate
                }
            };
            let result = await axios.put(`/api/product/update/${this.prodInfo.prod_code}`, data)
                                    .catch(err => console.log(err));


            // let result = await axios(`/api/product/update/${this.prodInfo.prod_code}` ,{
            //     methods : 'put',
            //     headers : {
            //         'Content-Type' : 'application/json'
            //     },
            //     data : JSON.stringify(data)
            // })
            // .catch(err => console.log(err))


           console.log(result);
            if(result.data.changedRows == 0){
                Swal.fire(`수정되지 않았습니다.\n메세지를 확인해주세요.\n${result.data.message}`);
            } else {
                Swal.fire(`정상적으로 수정되었습니다.`);
                this.$router.push({ path: '/productList', query: {prod_code: this.prodInfo.prod_code} })
            }
            
        },
    }
}
</script>

<style>

</style>