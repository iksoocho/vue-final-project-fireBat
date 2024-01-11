<template>
  <div class="container mt-4">
    <h2>축제등록</h2>
    <br />
    <form @submit.prevent="saveInfo" class="festival-form">
      <div class="form-group">
        <label for="name">축제이름</label>
        <input type="text" v-model="fesInfo.f_name" />
      </div>
      <div class="form-group">
        <label for="cate">카테고리</label>
        <select name="cate" v-model="fesInfo.f_category">
          <option value="문화">문화</option>
          <option value="커플">커플</option>
          <option value="예술">예술</option>
          <option value="관광">관광</option>
          <option value="불빛">불빛</option>
        </select>
      </div>
      <div class="form-group">
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
      </div>
      <div class="form-group">
        <label for="number">공식번호</label>
        <input type="text" v-model="fesInfo.f_number" />
      </div>
      <div class="form-group">
        <label for="loc">축제장소</label>
        <input type="text" v-model="fesInfo.f_loc" />
      </div>
      <div class="form-group">
        <label for="fday">축제시작일</label>
        <input type="date" v-model="fesInfo.f_firstday" />
      </div>
      <div class="form-group">
        <label for="lday">축제종료일</label>
        <input type="date" v-model="fesInfo.f_lastday" />
      </div>
      <div class="form-group">
        <label for="con">축제내용</label>
        <textarea cols="40" v-model="fesInfo.f_content"></textarea>
      </div>
      <div class="form-group">
        <label for="price">축제금액</label>
        <input type="text" id="count" v-model="fesInfo.f_price" />
      </div>
      <div class="form-group">
        <label for="page">홈페이지</label>
        <input type="url" v-model="fesInfo.f_url" />
      </div>
      <div>
        <input
          type="file"
          ref="fileInput"
          @change="handleFileChange"
          multiple
        />
      </div>
      <button class="custom-button" v-on:click="saveInfo">등록</button>
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
            title: "등록 완료",
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
      if (
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
      // url이 https:// 로 시작 안하면 등록 실패
      if (!this.fesInfo.f_url.startsWith("https://")) {
        Swal.fire({
          icon: "warning",
          title: "등록실패!",
          text: "올바른 URL을 입력해주세요. URL은 'https://'로 시작해야 합니다.",
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

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  margin-bottom: 40px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

h2 {
  text-align: center;
  color: #333;
}

.festival-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

input,
select,
textarea {
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
}

input[type="date"] {
  /* Customize date input appearance */
}

.custom-button {
  background-color: #4caf50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.custom-button:hover {
  background-color: #45a049;
}

/* Add more styling as needed */
</style>
