<template>
  <div class="container">
    <h2>축제수정</h2>
    <br />
    <form class="festival-form">
      <label for="name">축제이름</label>
      <input type="text" v-model="fesInfo.f_name" />
      <br />
      <label for="cate">카테고리</label>
      <select name="cate" v-model="fesInfo.f_category">
        <option value="문화">문화</option>
        <option value="커플">커플</option>
        <option value="예술">예술</option>
        <option value="관광">관광</option>
        <option value="불빛">불빛</option>
      </select>
      <br />
      <br />
      <label for="cate">축제지역</label>
      <select name="cate" v-model="fesInfo.f_reg">
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
      <br />
      <label for="number">공식번호</label>
      <input type="text" v-model="fesInfo.f_number" />
      <br />
      <label for="loc">축제장소</label>
      <input type="text" v-model="fesInfo.f_loc" />
      <br />
      <label for="fday">축제시작일</label>
      <input type="text" v-model="fesInfo.f_firstday" />
      <br />
      <label for="lday">축제종료일</label>
      <input type="text" v-model="fesInfo.f_lastday" />
      <br />
      <label for="con">축제내용</label>
      <textarea cols="40" v-model="fesInfo.f_content"> </textarea>
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
      if (!(date instanceof Date)) {
        date = new Date(date);
      }

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
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

<style scoped>
#container {
  max-width: 600px;
  margin: 0 auto;
  margin-bottom: 40px;
}

#festival-form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
}

input,
select,
textarea {
  margin-bottom: 10px;
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
}

#custom-button {
  background-color: #4caf50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

#custom-button:hover {
  background-color: #45a049;
}
</style>
