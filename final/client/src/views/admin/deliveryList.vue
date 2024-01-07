<template>
  <div id="deliveryInfo" class="container">
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
        <tr>
          <th>{{}}</th>
          <th>{{}}</th>
          <th>{{}}</th>
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
import Paginate from "../../components/Pagination.vue";

export default {
  components: {
    Paginate,
  },
  data() {
    return {
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
