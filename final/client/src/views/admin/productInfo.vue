<template>
  <div class="container">
    <h3>상품상세 페이지</h3>
    <div class="row">
      <table class="table" style="border-collapse: collapse">
        <tr>
          <th>상품코드</th>
          <td class="text-center">{{ prodInfo.prod_code }}</td>
        </tr>
        <tr>
          <th>상품이름</th>
          <td class="text-center">{{ prodInfo.prod_name }}</td>
        </tr>
        <tr>
          <th>상품가격</th>
          <td class="text-center">{{ prodInfo.prod_price }}</td>
        </tr>
        <tr>
          <th>상품내용</th>
          <td class="text-center">{{ prodInfo.prod_content }}</td>
        </tr>
        <tr>
          <th>상품재고</th>
          <td class="text-center">{{ prodInfo.prod_count }}</td>
        </tr>
        <tr>
          <th>지역분류</th>
          <td class="text-center">{{ prodInfo.prod_loc }}</td>
        </tr>
        <tr>
          <th>상품분류</th>
          <td class="text-center">{{ prodInfo.prod_cate }}</td>
        </tr>
        <tr>
          <td class="title"><p>상품 이미지</p></td>
          <td>
            <span v-for="(img, idx) in prodImgs" :key="idx" colspan="2">
              <img
                :src="`http://localhost:3000/product/public/uploads/${img.prod_filename}`"
                width="150px"
                height="150px"
                style="display: inline-block"
              />
            </span>
          </td>
        </tr>
      </table>
    </div>
    <div class="row">
      <button class="btn mb-3" v-on:click="moveProdUpdate(prodInfo.prod_code)">
        수정
      </button>
      <router-link to="/productList" class="btn">목록</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      searchProd: "",
      prodInfo: {},
      prodImgs: [],
    };
  },
  created() {
    this.searchProd = this.$route.query.prod_code;
    this.getProdInfo();
    this.getProdImg();
  },
  methods: {
    async getProdInfo() {
      let result = await axios
        .get(`/api/product/${this.searchProd}`)
        .catch((err) => console.log(err));

      this.prodInfo = result.data;
    },
    async moveProdUpdate(prod_code) {
      let response = await axios
        .delete(`/api/product/deleteImg/${prod_code}`)
        .catch((err) => console.log(err));

      this.$router.push({
        path: "/productUpdate",
        query: { prod_code: prod_code },
      });
    },
    async getProdImg() {
      console.log(this.searchProd);

      let result = await axios
        .get(`/api/product/selectAllImg/${this.searchProd}`)
        .catch((err) => console.log(err));

      this.prodImgs = result.data;
    },
  },
};
</script>

<style scoped>
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
