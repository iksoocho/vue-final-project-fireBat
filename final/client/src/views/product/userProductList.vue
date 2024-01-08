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

    <hr />
    <div class="row">
      <div
        v-for="(prod, i) in userProductList.slice(
          pageStartIdx,
          pageStartIdx + ITEM_PER_PAGE
        )"
        :key="i"
        class="col-md-3 mb-4"
        @click="goProdInfo(prod.prod_code)"
      >
        <div class="card">
          <img
            :src="`/api/product/public/uploads/${prod.prodImg}`"
            class="card-img-top"
            alt="이미지가 존재하지 않습니다."
            style="height: 200px"
          />
          <div class="card-body">
            <h5 class="card-title">{{ prod.prod_name }}</h5>
            <p class="card-text">{{ prod.prod_price }}원</p>
            <p class="card-text">{{ prod.prod_state }}</p>
            <a href="#" class="btn btn-primary">상품 상세페이지</a>
          </div>
        </div>
      </div>
    </div>
    <Paginate
      class="justify-content-center"
      :list="userProductList"
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
      userProductList: [],
      prodImgs: {}, // 변경 없음
      word: "",
      ITEM_PER_PAGE: 8,
      PAGE_PER_SECTION: 5,
      curPage: 1,
    };
  },
  created() {
    this.getUserProductList();
  },
  computed: {
    pageStartIdx() {
      return (this.curPage - 1) * this.ITEM_PER_PAGE;
    },
  },
  methods: {
    async getUserProductList() {
      try {
        const productList = (await axios.get(`/api/product/user`)).data;
        this.userProductList = productList;

        // 각 제품에 대한 이미지 데이터 가져오기
        // for (const prod of productList) {
        //   const response = await axios.get(`/api/product/selectImg/${prod.prod_code}`);
        //   const prodImages = response.data;

        //   // Vue.set 대신, JavaScript의 동적 속성 추가 방식으로 데이터 업데이트
        //   this.prodImgs[prod.prod_code] = prodImages;
        // }
      } catch (error) {
        console.error(error);
      }
    },
    async prodSearch() {
      if (this.word.trim() === "") {
        this.getUserProductList();
      } else {
        this.userProductList = (
          await axios.get(`/api/product/search1/${this.word.trim()}`)
        ).data;
      }
    },
    getProdImgUrl(prod_code) {
      const prodImages = this.prodImgs[prod_code];

      if (prodImages) {
        return `/api/product/public/uploads/${prodImages.prod_filename}`;
      }
      return ""; // 이미지가 없을 때 빈 문자열 반환
    },
    goProdInfo(prod_code) {
      this.$router.push({ path: "/userProductInfo", query: { prod_code } });
    },
    onChangePage(data) {
      this.curPage = data;
    },
  },
};
</script>

<style scoped>
/* 스타일링 */
</style>
