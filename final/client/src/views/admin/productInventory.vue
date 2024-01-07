<template>
  <div class="container">
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

    <h3>재고관리 페이지</h3>
    <table class="table table-hover">
      <thead>
        <tr>
          <th>상품코드</th>
          <th>상품명</th>
          <th>상품가격</th>
          <th>현재재고</th>
          <th>남은재고</th>
          <th>상품상태</th>
          <th></th>
          <th></th>

          <th id="state">
            <label for="state"></label>
            <select name="state">
              <option value="1">주문가능</option>
              <option value="2">품절</option>
            </select>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          :key="i"
          v-for="(prod, i) in prodInvenList.slice(
            pageStartIdx,
            pageStartIdx + ITEM_PER_PAGE
          )"
        >
          <th class="code">{{ prod.prod_code }}</th>
          <th class="name">{{ prod.prod_name }}</th>
          <th calss="price">{{ prod.prod_price }}</th>
          <th class="count">{{ prod.prod_count }}</th>
          <th class="inven">{{ prod.count }}</th>
          <th class="state">{{ prodState(prod.prod_state) }}</th>
          <th></th>

          <th><input type="checkbox" @click="selectAllItems" />{{ status }}</th>
          <!-- <th>
            <input type="checkbox" id="chk" class="chkGrp" value="상태 체크" />
          </th> -->

          <th>
            <button @click="saveData">저장</button>
          </th>
        </tr>
      </tbody>
    </table>
    <Paginate
      class="justify-content-center"
      :list="prodInvenList"
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
      prodInvenList: [],
      ITEM_PER_PAGE: 10,
      PAGE_PER_SECTION: 5,
      curPage: 1,
      selectAll: true,
    };
  },
  created() {
    this.getProdInvenList();
  },
  computed: {
    pageStartIdx() {
      return (this.curPage - 1) * this.ITEM_PER_PAGE;
    },
  },
  methods: {
    async getProdInvenList() {
      this.prodInvenList = (
        await axios
          .get("/api/product/prodInven/Inventory")
          .catch((err) => console.log(err))
      ).data;
    },
    async prodSearch() {
      if (this.word.trim() === "") {
        this.getProdInvenList();
      } else {
        this.prodInvenList = (
          await axios.get(`/api/product/search/${this.word.trim()}`)
        ).data;
      }
    },
    prodState(data) {
      if (data == 1) {
        return "주문가능";
      } else if (data == 2) {
        return "품절";
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
#state {
  text-align: center;
}
</style>
