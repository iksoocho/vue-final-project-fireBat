<template>
  <div id="delivery" class="container">
    <div id="app">
      <input
        type="text"
        v-model="word"
        @keyup.enter="prodSearch"
        @input="onSearchInput"
        placeholder="상품 이름을 검색하세요"
      />
      <button @click="search">검색</button>
    </div>
    <h3>배송정보</h3>
    <table class="table table-hover">
      <thead>
        <tr>
          <th>주문번호</th>
          <th>이름</th>
          <th>송장번호</th>
          <th>배송메세지</th>
          <th>수령인주소</th>
          <th>배송상태</th>
        </tr>
      </thead>
      <tbody>
        <tr
          :key="i"
          v-for="(del, i) in deliveryInformationList.slice(
            pageStartIdx,
            pageStartIdx + ITEM_PER_PAGE
          )"
        >
          <th>{{ del.order_no }}</th>
          <th>{{ del.user_name }}</th>
          <th>{{}}</th>
          <th>{{}}</th>
          <th>{{}}</th>
          <th>{{}}</th>
        </tr>
      </tbody>
    </table>
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
      deliveryInformationList: [],
      word: "",
      ITEM_PER_PAGE: 10,
      PAGE_PER_SECTION: 5,
      curPage: 1,
    };
  },
  created() {
    this.getDeliveryInformationList();
  },
  computed: {
    pageStartIdx() {
      return (this.curPage - 1) * this.ITEM_PER_PAGE;
    },
  },
  methods: {
    async getDeliveryInformationList() {
      this.deliveryInformationList = (
        await axios.get(`/api/product`).catch((err) => console.log(err))
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
    onChangePage(data) {
      this.curPage = data;
    },
  },
};
</script>

<style scoped>
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
.container {
  padding: 30px;
}
</style>
