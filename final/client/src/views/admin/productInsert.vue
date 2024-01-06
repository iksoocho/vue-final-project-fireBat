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
          <input type="file" ref="fileInput" @change="handleFileChange" multiple/>
        </div>
        <button @click="saveInfo" type="button">Upload File</button>
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
          
        },
        bno:'',
        images:[]
      }
    },
    methods : {
      handleFileChange(event) {
            this.images = Array.from(event.target.files);
        },
      getInfo(comCode) {
            let method = '';
            let url = '';
            let data = null;

        
            method = 'post';
            url = `/api/product/insert`;
            let info = this.product;
            console.log(info);
            // info.from_date = this.comInfo.write_date;
            data = {
                param : this.product
            };
            this.$router.push({path : '/productList'});
            
            return {
                method,
                data,
                url
            }
        },
        async saveInfo() {
            let formData = new FormData();
            this.images.forEach((file) => {
				formData.append(`files`, file);
			});
            try {
                let info = this.getInfo();
                let result = await axios(info);
                if(result.data.affectedRows > 0) {
                    Swal.fire({
                        icon: "success",
                        title: "정상 처리",
                        text: "정상적으로 처리되었습니다.",
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "처리 실패",
                        text: "정상적으로 처리되지 않았습니다.",
                    });
                }
                this.bno = result.data.insertId;
				formData.append('bno', this.bno);
            } catch(err) {
                console.error(err);
            } finally {
                let res = await axios.post(`/api/product/prodPhoto`, formData);
                let uploadedImages = res.data.filenames;
				console.log(uploadedImages);

				this.images = uploadedImages;
            }
        },
       
      

     


      
    }
}
</script>

<style scoped>
.container{
  padding : 40px;
}
</style>