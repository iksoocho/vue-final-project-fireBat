<template>
  <div class="container mt-4">
    <h3>상품등록</h3>
    <form @submit.prevent="saveInfo" class="product-form">
      <div class="form-group">
        <label for="name">상품이름</label>
        <input type="text" v-model="product.prod_name" />
      </div>
      <div class="form-group">
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
      </div>
      <div class="form-group">
        <label for="cate">상품분류</label>

        <select name="cate" v-model="product.prod_cate">
          <option value="과일">과일</option>
          <option value="채소">채소</option>
          <option value="곡물">곡물</option>
          <option value="주류">주류</option>
        </select>
      </div>

      <div class="form-group">
        <label for="price">상품가격</label>
        <input type="text" v-model="product.prod_price" />
      </div>

      <div class="form-group">
        <label for="content">상품내용</label>
        <textarea type="content" v-model="product.prod_content" />
      </div>
      <div class="form-group">
        <label for="prodcount">상품재고</label>
        <input type="number" v-model="product.prod_count" />
      </div>
      <label for="prodstate">상품상태</label>
      <div class="row">
        <div class="col">
          <input
            style="width: 20px"
            type="radio"
            v-model="product.prod_state"
            name="prodstate"
            value="1"
          />
          <span>주문가능</span>
        </div>
        <div class="col">
          <input
            style="width: 20px"
            type="radio"
            v-model="product.prod_state"
            name="prodstate"
            value="2"
          />
          <span>품절</span>
        </div>
      </div>
      <input type="file" ref="fileInput" @change="handleFileChange" multiple />

      <button
        style="margin-top: 30px"
        class="custom-button"
        @click="saveInfo"
        type="button"
      >
        등록
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
      product: {
        prod_name: "",
        prod_price: 0,
        prod_content: "",
        prod_count: 0,
        prod_loc: "",
        prod_cate: "",
        prod_state: 0,
      },
      bno: "",
      images: [],
    };
  },
  methods: {
    handleFileChange(event) {
      this.images = Array.from(event.target.files);
    },
    mounted() {
      saveInfo();
    },
    getInfo(comCode) {
      let method = "";
      let url = "";
      let data = null;

      method = "post";
      url = `/api/product/insert`;
      let info = this.product;
      console.log(info);
      // info.from_date = this.comInfo.write_date;
      data = {
        param: this.product,
      };
      this.$router.push({ path: "/productList" });

      return {
        method,
        data,
        url,
      };
    },
    async saveInfo() {
      if (!this.validation()) return;

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
            text: "정상적으로 등록이 되었습니다.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "처리 실패",
            text: "정상적으로 등록되지 않았습니다.",
          });
        }
        this.bno = result.data.insertId;
        formData.append("bno", this.bno);
      } catch (err) {
        console.error(err);
      } finally {
        let res = await axios.post(`/api/product/prodPhoto`, formData);
        let uploadedImages = res.data.filenames;
        console.log(uploadedImages);

        this.images = uploadedImages;
      }
    },
    validation() {
      if (
        this.product.prod_name == "" ||
        this.product.prod_loc == "" ||
        this.product.prod_cate == "" ||
        this.product.prod_price == 0 ||
        this.product.prod_content == "" ||
        this.product.prod_count == 0 ||
        this.product.prod_state == 0
      ) {
        Swal.fire({
          icon: "warning",
          title: "등록실패!",
          text: "값을 모두 입력해주세요.",
          conriemButtonText: "확인",
        });
        return false;
      }
      return true;
    },
    prodCate(data) {
      if (data == 1) {
        return "주문가능";
      } else if (data == 2) {
        return "품절";
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  height: 800px;
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

.product-form {
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
</style>
