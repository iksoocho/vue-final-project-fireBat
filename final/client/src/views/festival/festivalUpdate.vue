<template>
    <div class="container">
        <h2>축제수정</h2>
        <br>
    <form>
        <label for="code">축제코드</label>
        <input type="text" v-model="fesInfo.f_code" readonly>
        <br>
        <label for="name">축제이름</label>
        <input type="text" v-model="fesInfo.f_name">
        <br>
        <label for="cate">카테고리</label>
        <br>
            <select name="cate" v-model="fesInfo.f_category">
                <option value="culture">문화</option>
                <option value="couple">커플</option>
                <option value="art">예술</option>
                <option value="tourism">관광</option>
                <option value="firework">불빛</option>
            </select>
        <br>
        <br>
        <label for="reg">축제지역</label>
        <input type="text" v-model="fesInfo.f_reg">
        <br>
        <label for="number">전화번호</label>
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
        <button type="button" class="btn btn-outline-primary" v-on:click="updateInfo">수정완료</button>
        <!-- <button class="btn btn-primary" v-on:click="updateInfo">수정완료</button> -->
        <button type="button" class="btn btn-outline-primary"><a href="festivalInfoList" style="text-decoration: none;">목록으로</a></button>

    </form>
</div>
</template>
  
<script>
import axios from 'axios';
import Swal from 'sweetalert2'

export default {

  data() {
  return {
      f_code : '',  
      fesInfo : {}
  }
},
created() {
      this.searchNo = this.$route.query.f_code;
      this.getFesInfo();
  },
  methods: {
    async getFesInfo() {
      let result = await axios.get(`/api/festival/${this.searchNo}`) 
                            .catch(err => console.log(err));
      this.fesInfo = result.data;    // .data 데이터가 보내준 값을 받음
  },
  async updateInfo() {
    let data = {
              param : {      
              f_category : this.fesInfo.f_category,
              f_reg : this.fesInfo.f_reg,
              f_name : this.fesInfo.f_name,
              f_number : this.fesInfo.f_number,
              f_loc : this.fesInfo.f_loc,
              f_firstday : this.getDateFormat(this.fesInfo.f_firstday),
              f_lastday : this.getDateFormat(this.fesInfo.f_lastday),
              f_content : this.fesInfo.f_content,
              f_price : this.fesInfo.f_price,
              f_url : this.fesInfo.f_url
              }
          };
    let result = await axios   // 보낼 정보 경로와 데이터
          .put(`/api/festival/update/${this.fesInfo.f_code}`, data)
          .catch((err) => console.log(err));

          console.log(result);
            // if(result.data.changedRows == 0) {
            //     Swal.fire(`수정되지 않았습니다.\n메세지를 확인해주세요.\n${result.data.message}`);
            // } else {
            //     Swal.fire(`정상적으로 수정되었습니다.`);     
            // }
            if(result.data.changedRows == 0) {
                Swal.fire({
                    icon: 'warning',
                    title: '수정 실패!!',
                    text: '축제수정을 실패했습니다.',
                    confirmButtonText: '확인',
                });
            } else {
                Swal.fire({
                icon: 'success',
                title: '수정 성공!',
                text: '축제가 성공적으로 수정 되었습니다.',
                confirmButtonText: '확인',
                });
            }

            this.$router.push({ path: '/festivalInfoList', query: {f_code: this.fesInfo.f_code} })
  },
  getDateFormat(date){
          return this.$dateFormat(date);   // 날짜 변환
      },
  }

}
</script>
