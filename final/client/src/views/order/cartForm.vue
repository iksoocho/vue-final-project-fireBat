<template>
  <div class="container">
    <table class="table">
      <tr>
        <th>상품정보</th>
        <th>구매갯수</th>
        <th>상품금액</th>
      </tr>
      <tr v-for="item in cartList" :key="item.productId">
        <td>
          <input type="checkbox" />
          <p>{{ item.prod_name }}</p>
        </td>
        <td>
          <input
            type="number"
            v-model="item.prod_order_count"
            @input="updateTotalPrice"
          />갯수
        </td>
        <td>{{ item.prod_price * item.prod_order_count }}</td>
      </tr>
      <tr>
        <th>결제하기</th>
        <th>총 상품금액</th>
        <th>{{ calTotalPrice() }}</th>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      cartList: [],
    };
  },

  created() {
    this.getCartList();
  },
  methods: {
    async getCartList() {
      try {
        let result = await axios
          .get(`/api/pay/cart/${this.userId}`)
          .catch((err) => console.log(err));
        this.cartList = result.data;
        console.log(this.cartList);
      } catch (err) {
        console.log(err);
      }
    },
    calTotalPrice() {
      let totalPrice = 0;
      for (let item of this.cartList) {
        totalPrice += item.prod_price * item.prod_order_count;
      }
      return totalPrice;
    },
    updateTotalPrice() {
      // 구매수량이 변경될 때마다 총 상품금액을 업데이트합니다.
      // v-model로 바인딩된 prod_order_count가 변경되면 이 메서드가 호출됩니다.
      // calculateTotalPrice를 호출하여 총 상품금액을 다시 계산합니다.
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
