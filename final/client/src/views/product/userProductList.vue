<template>
  <div class="container">
    <div class="col-sm-3 text-end input-group mb-3" id="app">
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

    <hr />
    <div class="row">
      <div
        v-for="(prod, i) in userProductList.slice(
          pageStartIdx,
          pageStartIdx + ITEM_PER_PAGE
        )"
        :key="i"
        class="col-md-3 mb-4"
        :class="{ 'out-of-stock': prod.prod_state === 0 }"
        @click="
          prod.prod_state === 0 || prod.prod_count === 0
            ? null
            : goProdInfo(prod.prod_code)
        "
      >
        <div class="card">
          <div
            class="out-of-stock-overlay"
            v-if="prod.prod_state === 0 || prod.prod_count === 0"
          >
            <img src="./품절-removebg-preview.png" alt="품절" />
          </div>
          <img
            :src="`/api/product/public/uploads/${prod.prodImg}`"
            class="card-img-top"
            alt="이미지가 존재하지 않습니다."
            style="height: 200px"
          />
          <div class="card-body">
            <h5 class="card-title" style="height: 38.38px;">{{ prod.prod_name }}</h5>
            <p class="card-text">{{ prod.prod_price }}원</p>
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
      ITEM_PER_PAGE: 16,
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
.out-of-stock-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 투명도 조정 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.out-of-stock-overlay img {
  width: 50%; /* 이미지 크기 조정 */
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.input-group {
  justify-content: flex-end;
}

.form-control {
  width: 70%;
}

.btn {
  margin-left: 10px;
}

.card {
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: box-shadow 0.3s;
}

.card:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.card-img-top {
  object-fit: cover;
}

.card-body {
  padding: 10px;
}

.card-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
}

.card-text {
  font-size: 14px;
  color: #333;
}

.out-of-stock {
  opacity: 0.5;
}

.out-of-stock-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
}

.out-of-stock-overlay img {
  max-width: 50%;
}

hr {
  margin: 20px 0;
}

.Paginate {
  margin-top: 20px;
}
</style>
