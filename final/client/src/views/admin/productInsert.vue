<template>
    <div class="container">
      <h3>상품등록</h3>
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
        <label for="prodcount">상품재고</label>
        <input type="number" v-model="product.prod_count">
        <br>
        <label for="prodstate">상품상태</label>
        
          <input type="radio" v-model="product.prod_state" name="prodstate" value="1">주문가능
          <input type="radio" v-model="product.prod_state" name="prodstate" value="2">품절
        
        <br>
        <div>
          <input type="file" ref="fileInput" @change="handleFileChange" />
        </div>
        <button @click="uploadFile()" type="button">Upload File</button>
        <br>
    </form>
</div>
</template>



<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
      data(){
      return{
        product : {
          prod_name : '',
          prod_price : '',
          prod_content : '',
          prod_count : '',
          prod_loc : '',
          prod_cate : '',
          prod_state: '',
          img : null
        },
      }
    },
    methods : {
      handleFileChange(event){
          this.product.img = event.target.files[0];
      },
      

      async uploadFile(){
            const formData = new FormData();
            if(this.product.img){
              formData.append(`files`, this.product.img);
            }

            let obj1 = {
               prod_name : this.product.prod_name,
               prod_price : this.product.prod_price,
               prod_content : this.product.prod_content,
               prod_count : this.product.prod_count,
               prod_loc : this.product.prod_loc,
               prod_cate : this.product.prod_cate,
               prod_state: this.product.prod_state,
               prod_img : this.product.img,
            };
            const rsobj = JSON.stringify(obj1);
            formData.append(`rsobj`, rsobj);

            for(let key of formData.keys()){
              console.log(key, ':', formData.get(key));
            }

            try{
              let result = await axios.post(`/api/product/rsphotos`, formData);
              console.log(result);
              if(result.status === 200 && result.data.success){
                  Swal.fire({
                    title:'등록 성공',
                    icon: 'success',
                    confirmButtonText: 'OK',
                  });
              }
            } catch(error){
              console.error(error);
              Swal.fire({
                title: '등록 실패',
				      	text: 'An error occurred during registration.',
					      icon: 'error',
					      confirmButtonText: 'OK',
              })
            }

            
      }

     


      
    }
}
</script>

<style scoped>
.container{
  padding : 40px;
}
</style>