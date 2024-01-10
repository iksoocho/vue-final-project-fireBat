<template>
  <div class="container">
    <div class="row">
      <div class="col-8 col-sm-6" v-if="prodImgs.length > 0">
        <img
          :src="`http://localhost:3000/product/public/uploads/${prodImgs[0].prod_filename}`"
          class="card-img-top"
          alt=""
          style="width: 660px; height: 660px"
        />
      </div>
      <div class="col-4" style="padding: 50px">
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
        <tr>
          <th>상품 상태: {{ prodState(userProdInfo.prod_state) }}</th>
        </tr>
        <br />

        <div class="prod-onetime-order" style="display: flex">
          <button class="prod-cart-btn" @click="cartInsert">
            장바구니추가
          </button>
          <br />

          <div>
            <button>바로결제</button>
          </div>
        </div>
      </div>
      <br />
      <br />

      <div>
        <tr>
          <h4 id="content">
            <th style="margin: 20px; font-size: 20px">
              {{ userProdInfo.prod_content }}
            </th>
          </h4>
        </tr>
      </div>
      <hr />
      <h3>함께하면 좋은 축제들</h3>
    </div>
    <div calss="row align-items-end" style="display: flex">
      <div
        v-for="(fes, i) in prodFeslList"
        :key="i"
        class="col-4 col-sm-3"
        style="margin: 10px"
        @click="goFesInfo(fes.f_code)"
      >
        <div class="single_destination">
          <div class="thumb">
            <img
              :src="`/api/festival/public/uploads/${fes.fesImg}`"
              alt=""
              width="300px"
              height="250px"
            />
          </div>
          <div class="content">
            <p class="d-flex align-items-center"></p>
          </div>
        </div>
      </div>
    </div>

    <!-- <div calss="row align-items-end" style="display: flex">
      <template v-for="(img, idx) in prodImgs">
        <div
          v-if="idx < 4 && img.prod_filename"
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
    </div> -->

    <div class="container">
      <table class="table table-hover" style="text-align: center">
        <tr class="top">
          <th @click="scrollToSection('section1')">상품상세</th>
          <th @click="scrollToSection('section2')">상품평</th>
          <th @click="scrollToSection('section3')">상품문의</th>
          <!-- <th @click="scrollToSection('section4')">QnA</th> -->
        </tr>
      </table>
      <Section1 ref="section1" />

      <Section2 ref="section2" v-bind="{ searchProd }" />
      <Section3 ref="section3" v-bind="{ searchProd }" />

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

    <div class="up_down_area">
      <button class="btn">
        <span><a href="#top">↑위로</a></span>
      </button>
    </div>
    <br />
  </div>
</template>

<script>
import axios from "axios";
import Admin from "../Admin.vue";
import Section1 from "../../components/Section1.vue";
import Section2 from "../../components/productReview.vue";
import Section3 from "../../components/productQna.vue";
// import Section4 from "../../components/Section4.vue";
import Paginate from "../../components/Pagination.vue";

export default {
  components: {
    Admin,
    Paginate,
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
      prodFeslList: [],
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
      this.getProdFeslList(this.userProdInfo.prod_loc);
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
      let response = await axios
        .get(`/api/pay/cart/${this.userNo}/${this.searchProd}`)
        .catch((err) => console.log(err));
      let cartItems = response.data;

      if (cartItems.length > 0) {
        alert("장바구니에 이미 같은 상품이 담겨 있습니다.");
        return; // 작업이 안되도록 종료
      }

      await axios.post(`/api/pay/cart`, obj).catch((err) => console.log(err));
      console.log(obj);
      alert("장바구니에 추가되었습니다.");
    },
    scrollToSection(refName) {
      this.$refs[refName].$el.scrollIntoView({ behavior: "smooth" });
    },
    prodState(data) {
      if (data == 1) {
        return "주문가능";
      } else if (data == 0) {
        return "품절";
      }
    },
    async getProdFeslList(f_reg) {
      const result = await axios
        .get(`/api/product/prodInFes/${f_reg}`)
        .catch((err) => console.log(err));

      this.prodFeslList = result.data;
    },
    goFesInfo(f_code) {
      this.$router.push({
        path: "/festivalInfo",
        query: { f_code },
      });
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
  color: rgb(0, 0, 0);
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
#map {
  width: 1300px;
  height: 400px;
}

.button-group {
  margin: 10px 0px;
}

button {
  margin: 0 3px;
}

#content {
  margin-bottom: 100px;
}

#prod {
  display: flex;
  margin: 10px;
}

#subImg {
  display: flex;
  margin: 10px;
  margin-bottom: 100px;
}

#text {
  margin-top: 30px;
  margin-left: 50px;
  font-size: 12px;
}

#subImg {
  display: flex;
  overflow-x: auto; /* Enable horizontal scrolling */
  white-space: nowrap; /* Prevent line breaks between images */
}

#subImg img {
  flex: 0 0 auto;
  margin-right: 10px;
  max-width: 500px; /* Limit image width to its container */
  max-height: 250px; /* Limit image height to 250 pixels */
}
#content {
  margin: 20px;
}

.button_container {
  position: absolute;
  left: 0;
  right: 0;
  top: 30%;
}

.description,
.link {
  font-family: "Amatic SC", cursive;
  text-align: center;
}

.description {
  font-size: 35px;
}

.btn {
  border: none;
  display: block;
  text-align: center;
  cursor: pointer;
  text-transform: uppercase;
  outline: none;
  overflow: hidden;
  position: relative;
  color: #fff;
  font-weight: 700;
  font-size: 15px;
  background-color: #222;
  padding: 17px 60px;
  margin: 0 auto;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.btn span {
  position: relative;
  z-index: 1;
}

.btn:after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  height: 490%;
  width: 140%;
  background: #78c7d2;
  -webkit-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-transform: translateX(-98%) translateY(-25%) rotate(45deg);
  transform: translateX(-98%) translateY(-25%) rotate(45deg);
}

.btn:hover:after {
  -webkit-transform: translateX(-9%) translateY(-25%) rotate(45deg);
  transform: translateX(-9%) translateY(-25%) rotate(45deg);
}
body {
  margin: 0;
  height: 100%;
  background-image: linear-gradient(to top, #d9afd9 0%, #97d9e1 100%);
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}
</style>
