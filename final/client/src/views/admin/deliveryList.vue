<template>
  <div id="deliveryInfo" class="container">
    <div id="app">
      <input
        type="text"
        v-model="word"
        @keyup.enter="prodSearch"
        @input="onSearchInput"
        placeholder="상품 이름을 검색하세요"
      />
      <button @click="prodSearch">검색</button>
    </div>
    <h3>주문정보</h3>
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
          <th>{{ order.order_detail_no }}</th>
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
</style>
