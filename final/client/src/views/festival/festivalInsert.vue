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
              <option value="culture">문화</option>
              <option value="couple">커플</option>
              <option value="art">예술</option>
              <option value="tourism">관광</option>
              <option value="light">불빛</option>
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
      <textarea cols="40" v-model="fesInfo.f_content"></textarea>
      <br>
      <label for="price">축제금액</label>
      <input type="text" id="count" v-model="fesInfo.f_price">
      <br>
      <label for="page">홈페이지</label>
      <input type="url" v-model="fesInfo.f_url">
      <br>
      <br>
      <button v-on:click.prevent="insertInfo">등록</button>
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
    //   async insertInfo() {
    //   if (!this.fesInfo.f_code || !this.fesInfo.f_category || !this.fesInfo.f_reg || !this.fesInfo.f_name || !this.fesInfo.f_number || !this.fesInfo.f_loc
    //   || !this.fesInfo.f_firstday || !this.fesInfo.f_lastday || !this.fesInfo.f_content || !this.fesInfo.f_price || !this.fesInfo.f_url) {
    //       Swal.fire({
    //       icon: 'warning',
    //       title: '등록실패!',
    //       text: '값 입력해',
    //       confirmButtonText: '확인',
    //    })
    //   } 

    //   let data = {
    //     param : this.fesInfo,
    //   };
    //   let result = await axios.post(`/api/festival/insert`, data)
    //                           .catch(err => console.log(err))
    //   console.log(result.data)
    // },
    async insertInfo() {
      console.log('Data to be sent:', this.fesInfo);
    if (!this.fesInfo.f_code || !this.fesInfo.f_category || !this.fesInfo.f_reg || !this.fesInfo.f_name || !this.fesInfo.f_number || !this.fesInfo.f_loc
        || !this.fesInfo.f_firstday || !this.fesInfo.f_lastday || !this.fesInfo.f_content || !this.fesInfo.f_price || !this.fesInfo.f_url) {
        Swal.fire({
            icon: 'warning',
            title: '등록실패!',
            text: '값을 모두 입력해주세요.',
            confirmButtonText: '확인',
        });
        return;
    } else {
        Swal.fire({
            icon: 'success',
                title: '등록 성공!',
                text: '축제가 성공적으로 등록되었습니다.',
                confirmButtonText: '확인',
            });
    }

    let data = {
        param: this.fesInfo,
    };

    try {
        let result = await axios.post(`/api/festival/insert`, data);
        console.log(result.data);

        if (result.data.affectRows === 1) {
            Swal.fire({
                icon: 'success',
                title: '등록 성공!',
                text: '축제가 성공적으로 등록되었습니다.',
                confirmButtonText: '확인',
            });
        } else {
            Swal.fire({
                icon: 'warning',
                title: '등록 실패!!',
                text: '축제등록을 실패했습니다.',
                confirmButtonText: '확인',
            });
        }
    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: '등록 실패!',
            text: '등록 중 오류가 발생하였습니다.',
            confirmButtonText: '확인',
        });
    }
},


  }
}
</script>

<style>

</style>