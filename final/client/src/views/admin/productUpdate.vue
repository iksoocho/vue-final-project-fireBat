<template>
  <div class="container mt-4">
    <form>
      <h3>상품수정</h3>
      <div class="row">
        <table class="table" style="border-collapse: collapse">
          <tr>
            <th>상품코드</th>
            <td class="text-center">
              <input type="text" v-model="prodInfo.prod_code" readonly />
            </td>
          </tr>
          <tr>
            <th>상품이름</th>
            <td class="text-center">
              <input type="text" v-model="prodInfo.prod_name" />
            </td>
          </tr>
          <tr>
            <th>상품가격</th>
            <td class="text-center">
              <input type="text" v-model="prodInfo.prod_price" />
            </td>
          </tr>
          <tr>
            <th>상품내용</th>
            <td class="text-center">
              <input type="text" v-model="prodInfo.prod_content" />
            </td>
          </tr>
          <tr>
            <th>상품재고</th>
            <td class="text-center">
              <input type="number" v-model="prodInfo.prod_count" />
            </td>
          </tr>
          <tr>
            <th>지역분류</th>
            <td class="text-center">
              <select name="cateloc" v-model="prodInfo.prod_loc">
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
            <th>상품분류</th>
            <td class="text-center">
              <select name="cate" v-model="prodInfo.prod_cate">
                <option value="과일">과일</option>
                <option value="채소">채소</option>
                <option value="곡물">곡물</option>
                <option value="주류">주류</option>
              </select>
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
                <button class="btn" v-on:click="saveInfo(prodInfo.prod_code)">
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
      searchProd: "",
      prodInfo: {},
      bno: "",
      images: [],
    };
  },
  created() {
    this.searchProd = this.$route.query.prod_code;
    this.getProdInfo();
  },
  methods: {
    async getProdInfo() {
      let result = await axios
        .get(`/api/product/${this.searchProd}`)
        .catch((err) => console.log(err));
      console.log(result.data);
      this.prodInfo = result.data;
    },
    // async updateInfo(){
    //     let data = {
    //         param : {
    //             prod_code : this.prodInfo.prod_code,
    //             prod_name : this.prodInfo.prod_name,
    //             prod_price : this.prodInfo.prod_price,
    //             prod_content : this.prodInfo.prod_content,
    //             prod_count : this.prodInfo.prod_count,
    //             prod_loc : this.prodInfo.prod_loc,
    //             prod_cate : this.prodInfo.prod_cate
    //         }
    //     };
    //     let result = await axios.put(`/api/product/update/${this.prodInfo.prod_code}`, data)
    //                             .catch(err => console.log(err));

    //    console.log(result);
    //     if(result.data.changedRows == 0){
    //         Swal.fire(`수정되지 않았습니다.\n메세지를 확인해주세요.\n${result.data.message}`);
    //     } else {
    //         Swal.fire(`정상적으로 수정되었습니다.`);
    //         this.$router.push({ path: '/productList', query: {prod_code: this.prodInfo.prod_code} })
    //     }

    // },
    handleFileChange(event) {
      this.images = Array.from(event.target.files);
    },
    getInfo(prod_code) {
      let method = "";
      let url = "";
      let data = null;

      method = "put";
      url = `/api/product/update/${prod_code}`;
      data = {
        param: {
          prod_name: this.prodInfo.prod_name,
          prod_price: this.prodInfo.prod_price,
          prod_content: this.prodInfo.prod_content,
          prod_count: this.prodInfo.prod_count,
          prod_loc: this.prodInfo.prod_loc,
          prod_cate: this.prodInfo.prod_cate,
        },
      };
      this.$router.push({ path: "/productList" });

      return {
        method,
        data,
        url,
      };
    },
    async saveInfo(prod_code) {
      let formData = new FormData();
      this.images.forEach((file) => {
        formData.append(`files`, file);
      });
      try {
        let info = this.getInfo(prod_code);
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
        this.bno = result.data.insertId;
        formData.append("bno", prod_code);
      } catch (err) {
        console.error(err);
      } finally {
        let res = await axios.post(`/api/product/prodPhoto`, formData);
        let uploadedImages = res.data.filenames;
        console.log(uploadedImages);

        this.images = uploadedImages;
      }
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
