<template>
  <div>
    <div calss="row">
      <template v-for="(img, idx) in prodImgs">
        <div
          v-if="idx < 5 && img.prod_filename"
          :key="idx"
          class="row-4 row-sm-3 mb-5"
          style="margin: 10px"
        >
          <img
            :src="`http://localhost:3000/product/public/uploads/${img.prod_filename}`"
            class="card-img-top"
            alt=""
            style="display: block; margin: 0 auto; width: 50%;r"
          />
          <a class="" style="text-align: center"></a>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  components: {},
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

<style></style>
