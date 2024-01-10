<template>
  <div class="container mt-4">
    <form>
      <h3>축제수정</h3>
      <div class="row">
        <table class="table" style="border-collapse: collapse">
          <tr>
            <th>축제이름</th>
            <td class="text-center">
              <input type="text" v-model="fesInfo.f_name" />
            </td>
          </tr>
          <tr>
            <th>테마</th>
            <td class="text-center">
              <select name="cate" v-model="fesInfo.f_category">
                <option value="문화">문화</option>
                <option value="커플">커플</option>
                <option value="예술">예술</option>
                <option value="관광">관광</option>
                <option value="불빛">불빛</option>
              </select>
            </td>
          </tr>
          <tr>
            <th>지역</th>
            <td class="text-center">
              <select name="cateloc" v-model="fesInfo.f_reg">
                <option value="서울">서울</option>
                <option value="인천">인천</option>
                <option value="대전">대전</option>
                <option value="대구">대구</option>
                <option value="광주">광주</option>
                <option value="부산">부산</option>
                <option value="울산">울산</option>
                <option value="세종">세종</option>
                <option value="경기 ">경기</option>
                <option value="강원 ">강원</option>
                <option value="충북">충북</option>
                <option value="충남">충남</option>
                <option value="경북">경북</option>
                <option value="경남">경남</option>
                <option value="전북">전북</option>
                <option value="전남">전남</option>
                <option value="제주">제주</option>
              </select>
            </td>
          </tr>
          <tr>
            <th>공식번호</th>
            <td class="text-center">
              <input type="text" v-model="fesInfo.f_number" />
            </td>
          </tr>
          <tr>
            <th>축제장소</th>
            <td class="text-center">
              <input type="text" v-model="fesInfo.f_loc" />
            </td>
          </tr>
          <tr>
            <th>시작일</th>
            <td class="text-center">
              <input
                type="date"
                v-model="formattedFesFirstDay"
                @input="updateFesFirstDay"
              />
            </td>
          </tr>
          <tr>
            <th>종료일</th>
            <td class="text-center">
              <input
                type="date"
                v-model="formattedFesLastDay"
                @input="updateFesFirstDay"
              />
            </td>
          </tr>
          <tr>
            <th>축제내용</th>
            <td class="text-center">
              <input type="text" v-model="fesInfo.f_content" />
            </td>
          </tr>
          <tr>
            <th>축제금액</th>
            <td class="text-center">
              <input type="text" v-model="fesInfo.f_price" />
            </td>
          </tr>
          <tr>
            <th>홈페이지</th>
            <td class="text-center">
              <input type="text" v-model="fesInfo.f_url" />
            </td>
          </tr>
          <tr>
            <div>
              <input
                type="file"
                ref="fileInput"
                class="mb-3"
                @change="handleFileChange"
                multiple
              />
            </div>
          </tr>
          <tr>
            <td colspan="2">
              <div class="d-grid gap-2">
                <button class="btn" v-on:click="saveInfo(fesInfo.f_code)">
                  수정
                </button>
              </div>
            </td>
          </tr>
        </table>
      </div>
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
      formattedFesFirstDay: "",
      formattedFesLastDay: "",
    };
  },
  created() {
    this.searchNo = this.$route.query.f_code;
    this.getFesInfo();
  },
  methods: {
    updateFesFirstDay() {
      // 변환된 날짜 문자열을 날짜 객체로 변환하여 저장
      this.fesInfo.f_firstday = new Date(this.formattedFesFirstDay);
      this.fesInfo.f_lastday = new Date(this.formattedFesLastDay);
    },
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

  watch: {
    // fesInfo.f_firstday 값이 변경될 때마다 formattedFesFirstDay 업데이트
    "fesInfo.f_firstday"(newVal) {
      this.formattedFesFirstDay = this.getDateFormat(newVal);
    },
    // fesInfo.f_lastday값이 변경될 때마다 formattedFesLastDay 업데이트
    "fesInfo.f_lastday"(newVal) {
      this.formattedFesLastDay = this.getDateFormat(newVal);
    },
  },
};
</script>

<style scoped>
.table td,
.table th {
  vertical-align: middle;
  text-align: center;
  font-family: "Nanum Gothic", sans-serif;
}
.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 5px;
}

h3 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.row {
  margin-bottom: 10px;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th {
  background-color: #f2f2f2;
  padding: 10px;
  text-align: left;
  width: 100px;
}

td {
  padding: 10px;
  text-align: center;
}

.title {
  font-weight: bold;
}

img {
  display: block;
  margin: 10px auto;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  background-color: #88a3fa;
  color: #fff;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
  margin-right: 10px;
}

.btn:hover {
  background-color: #88a3fa;
}
</style>
