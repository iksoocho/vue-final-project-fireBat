<template>
  <div class="container">
    <router-link to="/adminForm">편하게 관리자페이지</router-link>
    <div class="row">
      <div class="col-8 col-sm-6" v-if="prodImgs.length > 0">
        <img
          :src="`http://localhost:3000/product/public/uploads/${prodImgs[0].prod_filename}`"
          class="card-img-top"
          alt=""
        />
      </div>
      <div class="col-4">
        <br />
        <tr>
          <h3>
            <th>상품이름: {{ userProdInfo.prod_name }}</th>
          </h3>
        </tr>
        <br />

        <tr>
          <h3>
            <th>상품가격: {{ userProdInfo.prod_price }}</th>
          </h3>
        </tr>
        <br />

        <tr>
          <th>지역: {{ userProdInfo.prod_loc }}</th>
        </tr>
        <br />

        <tr>
          <th>분류: {{ userProdInfo.prod_cate }}</th>
        </tr>
        <br />

        <tr>
          <th>상품남은 수량: {{ userProdInfo.prod_count }}</th>
        </tr>
        <br />

        <div class="prod-onetime-order">
          <button class="prod-cart-btn" @click="cartInsert">
            장바구니추가
          </button>
        </div>

        <br />

        <div>
          <button>바로결제</button>
        </div>
      </div>
      <br />
      <br />

      <div>
        <tr>
          <h4 id="content">
            <th>{{ userProdInfo.prod_content }}</th>
          </h4>
        </tr>
      </div>

      <h3>함께하면 좋은 축제들</h3>
    </div>
    <div calss="row align-items-end" style="display: flex">
      <template v-for="(img, idx) in prodImgs">
        <div
          v-if="idx < 3 && img.prod_filename"
          :key="idx"
          class="col-4 col-sm-3"
          style="margin: 10px"
        >
          <img
            :src="`http://localhost:3000/product/public/uploads/${img.prod_filename}`"
            class="card-img-top"
            alt=""
            style="width: 300px; height: 250px"
          />
          <h3 class="" style="text-align: center"></h3>
        </div>
      </template>
    </div>
    <hr />

    <div class="container">
      <table class="table table-hover">
        <tr class="top">
          <th @click="scrollToSection('section1')">상품상세</th>
          <th @click="scrollToSection('section2')">상품평</th>
          <th @click="scrollToSection('section3')">상품문의</th>
          <!-- <th @click="scrollToSection('section4')">QnA</th> -->
        </tr>
      </table>
      <Section1 ref="section1" />
      <Section2 ref="section2" />
      <Section3 ref="section3" />
      <!-- <Section4 ref="section4" /> -->
    </div>

    <!-- <div calss="row">
      <template v-for="(img, idx) in prodImgs">
        <div
          v-if="idx < 5 && img.prod_filename"
          :key="idx"
          class="row-4 row-sm-3"
          style="margin: 10px"
        >
          <img
            :src="`http://localhost:3000/product/public/uploads/${img.prod_filename}`"
            class="card-img-top"
            alt=""
            style="display: block; margin: 0 auto; width: 50%;r"
          />
          <a class="" style="text-align: center">{{ idx }}번 사진 입니다</a>
        </div>
      </template>
    </div> -->

    <div class="up_down_area" style="">
      <button class="link_top"><a href="#top">맨위로</a></button>
    </div>
    <br />
  </div>
</template>

<script>
import axios from "axios";
import Admin from "../Admin.vue";
import Section1 from "../../components/Section1.vue";
import Section2 from "../../components/Section2.vue";
import Section3 from "../../components/Section3.vue";
// import Section4 from "../../components/Section4.vue";

export default {
  components: {
    Admin,
    Section1,
    Section2,
    Section3,
    // Section4,
  },
  data() {
    return {
      searchProd: "",
      userProdInfo: {},
      prodImgs: [],
      userNo: "",
      isScrollDown: false,
      scrollTop: 0,
      target: null,
    };
  },
  created() {
    this.searchProd = this.$route.query.prod_code;
    this.getUserProdInfo();
    this.getProdImg();
    this.getUserNo();
  },
  methods: {
    async getUserProdInfo() {
      let result = await axios
        .get(`/api/product/user/${this.searchProd}`)
        .catch((err) => console.log(err));

      this.userProdInfo = result.data;
    },
    async getProdImg() {
      console.log(this.searchProd);

      let result = await axios
        .get(`/api/product/selectAllImg/${this.searchProd}`)
        .catch((err) => console.log(err));

      this.prodImgs = result.data;
    },
    async getUserNo() {
      this.userNo = (
        await axios
          .get(`/api/qna/userNo/${this.userId}`)
          .catch((err) => console.log(err))
      ).data.user_no;
      console.log("user_no :", this.userNo);
    },
    async cartInsert() {
      let obj = {
        param: {
          prod_code: this.searchProd,
          user_no: this.userNo,
          prod_order_count: 1,
        },
      };
      await axios.post(`/api/pay/cart`, obj).catch((err) => console.log(err));
      console.log(obj);
      alert("장바구니에 등록되었습니다.");
    },
    scrollToSection(refName) {
      this.$refs[refName].$el.scrollIntoView({ behavior: "smooth" });
    },
  },
  computed: {
    userId() {
      const userData = JSON.parse(sessionStorage.getItem("user"));
      console.log("userData:", userData); // 확인용 로그 추가
      return userData ? userData : null;
    },
  },
};
</script>

<style scoped>
#content {
  color: olivedrab;
}
.tab .tab-titles {
  border-top: 2px solid #555;
  border-bottom: 1px solid #ccc;
  border-left: 1px solid #ccc;
  list-style-type: none;
  font-size: 0;
  position: absolute;
  top: 0;
  width: 100%;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.prod-buy-footer .prod-cart-btn {
  margin-right: 7px;
  color: #346aff;
}
.prod-buy-footer button {
  display: block;
  float: left;
  cursor: pointer;
  position: relative;
  line-height: 40px;
  width: 191px;
  height: 42px;
  background: transparent;
  text-align: center;
  font-weight: bold;
  font-size: 16px;
  border: 1px solid #346aff;
}
.menu {
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  list-style: none;
  justify-content: space-around;
  align-items: center;
  padding: 20px 0;
  background-color: aqua;
  padding-left: 0;
}
.up_down_area {
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  bottom: 30px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  position: fixed;
  right: 30px;
  z-index: 3000;
}
</style>
