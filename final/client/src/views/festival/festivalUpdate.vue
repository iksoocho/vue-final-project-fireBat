<template>
  <div class="container">
    <h2>축제수정</h2>
    <br />
    <form>
      <label for="code">축제코드</label>
      <input type="text" v-model="fesInfo.f_code" readonly />
      <br />
      <label for="name">축제이름</label>
      <input type="text" v-model="fesInfo.f_name" />
      <br />
      <label for="cate">카테고리</label>
      <br />
      <select name="cate" v-model="fesInfo.f_category">
        <option value="culture">문화</option>
        <option value="couple">커플</option>
        <option value="art">예술</option>
        <option value="tourism">관광</option>
        <option value="firework">불빛</option>
      </select>
      <br />
      <br />
      <label for="cate">축제지역</label>
      <select name="cate" v-model="fesInfo.f_reg">
        <!-- <label for="code">축제코드</label> -->
        <option value="Seoul">서울</option>
        <option value="Incheon">인천</option>
        <option value="Daegu">대구</option>
        <option value="Daejeon">대전</option>
        <option value="Gwangju">광주</option>
        <option value="Busan">부산</option>
        <option value="Ulsan">울산</option>
        <option value="Sejong">세종</option>
        <option value="Gyeong-gi">경기</option>
        <option value="Gangwon-do">강원</option>
        <option value="Chungbuk">충북</option>
        <option value="Chungnam">충남</option>
        <option value="Gyeongbuk">경북</option>
        <option value="Gyeongnam">경남</option>
        <option value="Jeonbuk">전북</option>
        <option value="Jeonnam">전남</option>
        <option value="jeju">제주</option>
      </select>
      <br />
      <label for="number">전화번호</label>
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
      <textarea cols="40" v-model="fesInfo.f_content" />
      <br />
      <label for="price">축제금액</label>
      <input type="text" id="count" v-model="fesInfo.f_price" />
      <br />
      <label for="page">홈페이지</label>
      <input type="url" v-model="fesInfo.f_url" />
      <br />
      <div>
        <input
          type="file"
          ref="fileInput"
          @change="handleFileChange"
          multiple
        />
      </div>
      <br />
      <button
        type="button"
        class="btn btn-outline-primary"
        v-on:click="saveInfo(fesInfo.f_code)"
      >
        수정완료
      </button>
      <!-- <button class="btn btn-primary" v-on:click="updateInfo">수정완료</button> -->
      <button type="button" class="btn btn-outline-primary">
        <a href="festivalInfoList" style="text-decoration: none">목록으로</a>
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      f_code: "",
      fesInfo: {},
      bno: "",
      images: [],
    };
  },
  created() {
    this.searchNo = this.$route.query.f_code;
    this.getFesInfo();
  },
  methods: {
    async getFesInfo() {
      let result = await axios
        .get(`/api/festival/${this.searchNo}`)
        .catch((err) => console.log(err));
      this.fesInfo = result.data; // .data 데이터가 보내준 값을 받음
    },
    handleFileChange(event) {
      this.images = Array.from(event.target.files);
    },

    getInfo(f_code) {
      let method = "";
      let url = "";
      let data = null;

      method = "put";
      url = `/api/festival/update/${f_code}`;
      data = {
        param: {
          f_category: this.fesInfo.f_category,
          f_reg: this.fesInfo.f_reg,
          f_name: this.fesInfo.f_name,
          f_number: this.fesInfo.f_number,
          f_loc: this.fesInfo.f_loc,
          f_firstday: this.getDateFormat(this.fesInfo.f_firstday),
          f_lastday: this.getDateFormat(this.fesInfo.f_lastday),
          f_content: this.fesInfo.f_content,
          f_price: this.fesInfo.f_price,
          f_url: this.fesInfo.f_url,
        },
      };
      this.$router.push({ path: "/festivalInfoList" });

      return {
        method,
        data,
        url,
      };
    },
    getDateFormat(date) {
      return this.$dateFormat(date); // 날짜 변환
    },
    async saveInfo(f_code) {
      let formData = new FormData();
      this.images.forEach((file) => {
        formData.append(`files`, file);
      });
      try {
        let info = this.getInfo(f_code);
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
  },
};
</script>
