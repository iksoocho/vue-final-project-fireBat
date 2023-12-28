<template>
    <div class="container">
    <form>
        <br>
        <label for="name">상품이름</label>
        <input type="text" v-model="product.prod_name">
        <br>
        <label for="cateloc">지역분류</label>
        
            <select name="cateloc" v-model="product.prod_loc">
                <option value="서울">서울</option>
                    <option value="인천">인천</option>
                    <option value="대전">대전</option>
                    <option value="대구">대구</option>
                    <option value="광주">광주</option>
                    <option value="부산">부산</option>
                    <option value="울산">울산</option>
                    <option value="세종">세종</option>
                    <option value="경기">경기</option>
                    <option value="강원">강원</option>
                    <option value="충북">충북</option>
                    <option value="충남">충남</option>
                    <option value="경북">경북</option>
                    <option value="경남">경남</option>
                    <option value="전북">전북</option>
                    <option value="전남">전남</option>
                    <option value="제주">제주</option>
            </select>
        <br>
        <label for="cate">상품분류</label>
       
            <select name="cate" v-model="product.prod_cate">
            <option value="과일">과일</option>
            <option value="채소">채소</option>
            <option value="곡물">곡물</option>
            <option value="주류">주류</option>
            </select>
        <br>
        
        <br>
        
        <label for="price">상품가격</label>
        <input type="text" v-model="product.prod_price">
        <br>
        <label for="content">상품내용</label>
        <textarea type="content" v-model="product.prod_content" />
        <br>
        <label for="prodDate">상품등록일</label>
        <input type="date" v-model="product.prod_date">
        <br>
        <label for="prodcount">상품재고</label>
        <input type="number" v-model="product.prod_count">
        <br>
        <label for="prodstate">상품상태</label>
        <input type="text" id="count" v-model="product.prod_state">
        <br>
        <button v-on:click="insertInfo">등록</button>
    </form>
</div>
</template>



<script>
import axios from 'axios';

export default {
      data(){
      return{
        product : {
          prod_name : '',
          prod_price : '',
          prod_content : '',
          prod_date : '',
          prod_count : '',
          prod_loc : '',
          prod_cate : '',
          prod_state: ''
        },
        

        // productImage : {
        //   prod_code : "",
        //   prod_filename : "",
        //   prod_db_name : "",
        //   prod_sequence : "",
        // }
      }
    },
    methods : {
      async insertInfo(){
        let data = {
          param : this.product,
        };
        let result = await axios.post(`/api/product/insert`, data , {
            headers: {
                'Content-Type': 'application/json',
            }
        }).catch((err) => console.log(err));
        
        console.log(result.data);
        
      }
    }
}
</script>

<style>

</style>