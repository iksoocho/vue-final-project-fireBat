<template>
  <div class="container">
    <div class="row">
      <div class="col mb-2">
        <h3>상품목록</h3>
      </div>
      <div class="col text-end input-group mb-3" id="app">
        <input
          type="text"
          v-model="word"
          @keyup.enter="prodSearch"
          @input="onSearchInput"
          class="form-control"
          placeholder="상품 이름을 검색하세요"
        />
        <button @click="prodSearch" class="btn btn-outline-secondary">
          검색
        </button>
      </div>
    </div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th>상품코드</th>
          <th>상품명</th>
          <th>가격</th>
          <th>상품지역</th>
          <th>상품분류</th>
          <th>등록날짜</th>
          <th></th>
          <th>삭제</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(prod, idx) in productList.slice(
            pageStartIdx,
            pageStartIdx + ITEM_PER_PAGE
          )"
          :key="idx"
          @click="moveProductInfo(prod.prod_code)"
        >
          <td>{{ prod.prod_code }}</td>
          <td>{{ prod.prod_name }}</td>
          <td>{{ prod.prod_price }}</td>
          <td>{{ prod.prod_loc }}</td>
          <td>{{ prod.prod_cate }}</td>

          <td>{{ $dateFormat(prod.prod_date, "yyyy-MM-dd") }}</td>
          <td type="radio"></td>
          <td>
            <button
              type="button"
              class="btn btn-danger"
              @click="deleteProduct(prod.prod_code)"
            >
              삭제
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <Paginate
      class="justify-content-center"
      :list="productList"
      :ITEM_PER_PAGE="ITEM_PER_PAGE"
      :PAGE_PER_SECTION="PAGE_PER_SECTION"
      :curPage="curPage"
      @change-page="onChangePage"
    />
  </div>
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";
import Paginate from "../../components/Pagination.vue";

export default {
  components: {
    Paginate,
  },
  data() {
    return {
      productList: [],
      word: "",
      ITEM_PER_PAGE: 10,
      PAGE_PER_SECTION: 5,
      curPage: 1,
    };
  },
  created() {
    this.getProductList();
  },
  computed: {
    pageStartIdx() {
      return (this.curPage - 1) * this.ITEM_PER_PAGE;
    },
  },
  methods: {
    async getProductList() {
      this.productList = (
        await axios.get("/api/product").catch((err) => console.log(err))
      ).data;
    },

    async prodSearch() {
      if (this.word.trim() === "") {
        this.getProductList();
      } else {
        this.productList = (
          await axios.get(`/api/product/search/${this.word.trim()}`)
        ).data;
      }
    },

    moveProductInfo(prod_code) {
      this.$router.push({
        path: "/productInfo",
        query: { prod_code: prod_code },
      });
    },

    async deleteProduct(prod_code) {
      let response = await axios
        .delete(`/api/product/deleteImg/${prod_code}`)
        .catch((err) => console.log(err));
      let count2 = response.data.affectedRows;

      let result = await axios
        .delete(`/api/product/delete/${prod_code}`)
        .catch((err) => console.log(err));

      console.log(result.data);
      let count = result.data.affectedRows;

      if (count + count2 == 0) {
        Swal.fire("정상적으로 삭제 되지 않았습니다.");
      } else {
        Swal.fire("정상적으로 삭제 되었습니다.");
        this.$router.push({ name: "productList" });
      }
    },
    onChangePage(data) {
      this.curPage = data;
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
.review-toolbar {
  display: flex;
  justify-content: space-between;
  background-color: #363636;
  padding: 10px;
  color: white;
  margin: 10px;
}

.total-reviews {
  font-weight: bold;
}

.search-bar {
  display: flex;
}

.search-bar input {
  margin-right: 10px;
  border-radius: 8px;
}

.display-options {
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.reviews-per-page {
  margin-left: 10px;
}

.Name {
  width: 100px;
}

.pName {
  width: 200px;
}

.likecnt {
  width: 150px;
}

.Del {
  width: 200px;
}
.pagination-frame {
  height: 10%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
  margin: 1vh 0vw 0vh 0vw;
  padding: 0px;

  /* 드래그 막기 */
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}
/* 페이지 이동 버튼 */
.pagination-frame > li {
  width: 1.55vw;
  height: 3vh;
  background-color: #fff;
  border: 1px solid rgb(211, 210, 211);
  text-align: center;
  padding: 3px 0vw;
  cursor: pointer;
}
.page-btn {
  margin: 0px 1px;
}
.page-left-btn {
  margin-right: 5px;
}
.page-right-btn {
  margin-left: 5px;
}

li:hover:not(.selected-page) {
  background-color: rgba(222, 222, 222, 0.3);
}
li.selected-page {
  background-color: rgb(222, 222, 222);
}

.page-text {
  text-decoration: none;
  cursor: pointer;
}
.page-text:hover {
  color: #000;
}
.container {
  padding: 30px;
}
.btn-danger {
  display: inline-block;
  padding: 10px 20px;
  background-color: rgb(248, 113, 113);
  color: #fff;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
  margin-right: 10px;
}

.btn-danger:hover {
  background-color: white;
  color: rgb(248, 113, 113);
}
</style>
