<template>
  <div class="container">
    <div id="app">
      <input
        type="text"
        v-model="word"
        @keyup.enter="prodSearch"
        @input="onSearchInput"
        placeholder="검색하세요"
      />
      <button @click="prodSearch">검색</button>
    </div>

    <h3>재고관리 페이지</h3>
    <table class="table table-hover">
      <thead>
        <tr>
          <th>상품코드</th>
          <th>상품명</th>
          <th>상품가격</th>
          <th>총입고량</th>
          <th>현재재고</th>
          <th>상품상태</th>

          <th>상품상태 변경</th>
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
          <th class="current">{{ prod.current_stock }}</th>

          <th class="inven">{{ prod.sold_stock }}</th>
          <th class="state">{{ prodState(prod.prod_state) }}</th>

          <th>
            <input
              type="checkbox"
              v-model="prod.prod_state"
              true-value="1"
              false-value="0"
              @change="ChangeState(prod)"
            />상태
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
      word: "",
      ITEM_PER_PAGE: 10,
      PAGE_PER_SECTION: 5,
      curPage: 1,
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
      } else if (data == 0) {
        return "품절";
      }
    },
    // async ChangeState(prod) {
    //   try {
    //     this.prodInvenList = await axios.put(
    //       `/api/product/state/${prod.prod_state}/${prod.prod_code}`
    //     ).data;
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
    async ChangeState(item) {
      // 체크상태 변경 DB저장
      if (item.prod_state === "1") {
        try {
          console.log("선택상태 : ", item.prod_state);
          await axios.put(
            `/api/product/state/${item.prod_state}/${item.prod_code}`
          );
        } catch (err) {
          console.log(err);
        }
      } else if (item.prod_state === "0") {
        try {
          console.log("선택상태 : ", item.prod_state);
          await axios.put(
            `/api/product/state/${item.prod_state}/${item.prod_code}`
          );
        } catch (err) {
          console.log(err);
        }
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
