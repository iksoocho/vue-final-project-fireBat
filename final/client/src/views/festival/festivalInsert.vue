<template>
  <div class="container">
    <h2>축제등록</h2>
    <br />
    <form @submit.prevent="saveInfo">
      <label for="name">축제코드</label>
      <input type="text" v-model="fesInfo.f_code" />
      <br />
      <label for="name">축제이름</label>
      <input type="text" v-model="fesInfo.f_name" />
      <br />
      <label for="cate">카테고리</label>
      <select name="cate" v-model="fesInfo.f_category">
        <label for="code">축제코드</label>
        <option value="culture">문화</option>
        <option value="couple">커플</option>
        <option value="art">예술</option>
        <option value="tourism">관광</option>
        <option value="light">불빛</option>
      </select>
      <br />
      <br />
      <label for="reg">축제지역</label>
      <input type="text" v-model="fesInfo.f_reg" />
      <br />
      <label for="number">공식번호</label>
      <input type="text" v-model="fesInfo.f_number" />
      <br />
      <label for="loc">축제장소</label>
      <input type="text" v-model="fesInfo.f_loc" />
      <br />
      <label for="fday">축제시작일</label>
      <input type="date" v-model="fesInfo.f_firstday" />
      <br />
      <label for="lday">축제종료일</label>
      <input type="date" v-model="fesInfo.f_lastday" />
      <br />
      <label for="con">축제내용</label>
      <textarea cols="40" v-model="fesInfo.f_content"></textarea>
      <br />
      <label for="price">축제금액</label>
      <input type="text" id="count" v-model="fesInfo.f_price" />
      <br />
      <label for="page">홈페이지</label>
      <input type="url" v-model="fesInfo.f_url" />
      <br />
      <br />
      <div>
        <input
          type="file"
          ref="fileInput"
          @change="handleFileChange"
          multiple
        />
      </div>
      <button v-on:click="saveInfo">등록</button>
    </form>
  </div>
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      fesInfo: {
        f_code: "",
        f_category: "",
        f_reg: "",
        f_name: "",
        f_number: "",
        f_loc: "",
        f_firstday: "",
        f_lastday: "",
        f_content: "",
        f_price: "",
        f_url: "",
      },
      bno: "",
      images: [],
      checkNum: 0,
    };
  },
  methods: {
    handleFileChange(event) {
      this.images = Array.from(event.target.files);
    },
    async saveInfo() {
      let resolve = await axios
        .get(`/api/festival/fesCheckCode/${this.fesInfo.f_code}`)
        .catch((err) => console.log(err));
      this.checkNum = resolve.data.count;
      console.log("checkNum : ", this.checkNum);

      if (!this.validation()) return;
      console.log("돌아가지나");

      let formData = new FormData();
      this.images.forEach((file) => {
        formData.append(`files`, file);
      });
      try {
        let info = this.getInfo();
        let result = await axios(info);
        if (result.data.affectedRows > 0) {
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
        this.bno = this.fesInfo.f_code;
        console.log("bno :", this.bno);
        formData.append("bno", this.bno);
      } catch (err) {
        console.error(err);
      } finally {
        let res = await axios.post(`/api/festival/fesPhoto`, formData);
        let uploadedImages = res.data.filenames;
        console.log(uploadedImages);
        this.images = uploadedImages;
      }
    },

    validation() {
      // console.log("f_code = ", this.fesInfo.f_code);
      // this.getCheck(this.fesInfo.f_code);

      // console.log("num : ", this.getCheck(this.fesInfo.f_code));

      if (
        !this.fesInfo.f_code ||
        !this.fesInfo.f_category ||
        !this.fesInfo.f_reg ||
        !this.fesInfo.f_name ||
        !this.fesInfo.f_number ||
        !this.fesInfo.f_loc ||
        !this.fesInfo.f_firstday ||
        !this.fesInfo.f_lastday ||
        !this.fesInfo.f_content ||
        !this.fesInfo.f_price ||
        !this.fesInfo.f_url
      ) {
        Swal.fire({
          icon: "warning",
          title: "등록실패!",
          text: "값을 모두 입력해주세요.",
          confirmButtonText: "확인",
        });
        return false;
      }

      if (this.checkNum == 1) {
        Swal.fire({
          icon: "warning",
          title: "등록실패!",
          text: "중복된 축제 코드 입니다..",
          confirmButtonText: "확인",
        });
        return false;
      }

      return true;
    },
    getInfo() {
      let method = "";
      let url = "";
      let data = null;
      method = "post";
      url = `/api/festival/insert`;
      let info = this.fesInfo;
      console.log(info);
      // info.from_date = this.comInfo.write_date;
      data = {
        param: this.fesInfo,
      };
      this.$router.push({ path: "/festivalInfoList" });
      return {
        method,
        data,
        url,
      };
    },
  },
};
</script>
<style></style>
