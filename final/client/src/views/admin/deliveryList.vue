<template>
  <div id="deliveryInfo" class="container">
    <div class="row">
      <div class="col mb-2">
        <h3>주문정보</h3>
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
          <th>주문번호</th>
          <th>아이디</th>
          <th>이름</th>
          <th>휴대폰</th>
          <th>상품명</th>
          <th>주문날짜</th>
          <th>주문금액</th>
        </tr>
      </thead>
      <tbody>
        <tr
          :key="i"
          v-for="(order, i) in deliveryList.slice(
            pageStartIdx,
            pageStartIdx + ITEM_PER_PAGE
          )"
        >
          <th>{{ order.mer_uid }}</th>
          <th>{{ order.user_id }}</th>
          <th>{{ order.user_name }}</th>
          <th>{{ order.user_tel }}</th>
          <th>{{ order.prod_name }}</th>
          <th>{{ $dateFormat(order.order_date, "yy-MM-dd") }}</th>
          <th>{{ order.order_total_amount }}</th>
        </tr>
      </tbody>
    </table>
    <Paginate
      class="justify-content-center"
      :list="deliveryList"
      :ITEM_PER_PAGE="ITEM_PER_PAGE"
      :PAGE_PER_SECTION="PAGE_PER_SECTION"
      :curPage="curPage"
      @change-page="onChangePage"
    />
  </div>
</template>

<script>
import axios from "axios";
import Paginate from "../../components/Pagination.vue";

export default {
  components: {
    Paginate,
  },
  data() {
    return {
      deliveryList: [],
      word: "",
      ITEM_PER_PAGE: 10,
      PAGE_PER_SECTION: 5,
      curPage: 1,
    };
  },
  created() {
    this.getDeliveryList();
  },
  computed: {
    pageStartIdx() {
      return (this.curPage - 1) * this.ITEM_PER_PAGE;
    },
  },
  methods: {
    async getDeliveryList() {
      this.deliveryList = (
        await axios
          .get("/api/product/deliveryList/delInfoList")
          .catch((err) => console.log(err))
      ).data;
    },
    async prodSearch() {
      if (this.word.trim() === "") {
        this.getDeliveryList();
      } else {
        this.deliveryList = (
          await axios.get(`/api/product/search4/${this.word.trim()}`)
        ).data;
      }
    },
    onChangePage(data) {
      this.curPage = data;
    },
  },
};
</script>

<style scoped>
.container {
  padding: 30px;
}
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
