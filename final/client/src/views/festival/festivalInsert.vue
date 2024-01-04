<template>
  <div class="container">
      <h2>축제등록</h2>
      <br>
  <form>
      <label for="code">축제코드</label>
      <input type="text" v-model="fesInfo.f_code">
      <br>
      <label for="name">축제이름</label>
      <input type="text" v-model="fesInfo.f_name">
      <br>
      <label for="cate">카테고리</label>
          <select name="cate" v-model="fesInfo.f_category">
              <option value="문화">문화</option>
              <option value="커플">커플</option>
              <option value="예술">예술</option>
              <option value="관광">관광</option>
              <option value="불빛">불빛</option>
          </select>
      <br>
      <br>
      <label for="reg">축제지역</label>
      <input type="text" v-model="fesInfo.f_reg">
      <br>
      <label for="number">공식번호</label>
      <input type="text" v-model="fesInfo.f_number">
      <br>
      <label for="loc">축제장소</label>
      <input type="text" v-model="fesInfo.f_loc">
      <br>
      <label for="fday">축제시작일</label>
      <input type="date" v-model="fesInfo.f_firstday">
      <br>
      <label for="lday">축제종료일</label>
      <input type="date" v-model="fesInfo.f_lastday">
      <br>
      <label for="con">축제내용</label>
      <textarea cols="40" v-model="fesInfo.f_content"/>
      <br>
      <label for="price">축제금액</label>
      <input type="text" id="count" v-model="fesInfo.f_price">
      <br>
      <label for="page">홈페이지</label>
      <input type="url" v-model="fesInfo.f_url">
      <br>
      <br>
      <button v-on:click="insertInfo">등록</button>
  </form>
</div>
</template>




<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    data(){
    return{
      fesInfo: {
      f_code: '',
      f_category: '',
      f_reg: '',
      f_name: '',
      f_number: '',
      f_loc: '',
      f_firstday: '',
      f_lastday: '',
      f_content: '',
      f_price: '',
      f_url: '',

  },
    }
  },
  methods : {
      async insertInfo() {
      if (!this.fesInfo.f_code || !this.fesInfo.f_category || !this.fesInfo.f_reg || !this.fesInfo.f_name || !this.fesInfo.f_number || !this.fesInfo.f_loc
      || !this.fesInfo.f_firstday || !this.fesInfo.f_lastday || !this.fesInfo.f_content || !this.fesInfo.f_price || !this.fesInfo.f_url) {
          Swal.fire({
          icon: 'warning',
          title: '등록실패!',
          text: '값 입력해',
          confirmButtonText: '확인',
       })
      }

      let data = {
        param : this.fesInfo,
      };
      let result = await axios.post(`/api/festival/insert`, data)
                              .catch(err => console.log(err))
      console.log(result.data)
    },
    
  }
}
</script>

<style>

</style>