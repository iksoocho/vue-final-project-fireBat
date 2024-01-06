<template>
  <div class="container">
    <table class="table">
      <colgroup>
        <col width="10%" />
        <col width="60%" />
        <col width="10%" />
        <col width="20%" />
      </colgroup>
      <tr>
        <th>
          <input
            type="checkbox"
            v-model="selectAll"
            @change="selectAllItems"
          />전체선택
        </th>
        <th>상품정보</th>
        <th>구매갯수</th>
        <th>상품금액</th>
      </tr>
      <tr v-for="item in cartList" :key="item.productId">
        <td>
          <input type="checkbox" v-model="item.selected" />
        </td>
        <td>
          <p>{{ item.prod_name }}</p>
        </td>
        <td>
          <input
            type="number"
            min="1"
            :max="item.prod_count"
            v-model="item.prod_order_count"
            @input="updateTotalPrice(item)"
          />개
        </td>
        <td>{{ item.prod_price * item.prod_order_count }}</td>
      </tr>
      <tr>
        <th><button @click="submitOrder">주문하기</button></th>
        <th></th>
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
      selectAll: true,
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
    selectAllItems() {
      // 전체 선택 여부 업데이트
      const selectAllValue = !this.selectAll;

      this.cartList.forEach((item) => {
        item.selected = selectAllValue;
      });

      // 총 상품금액 업데이트
      this.updateTotalPrice();

      // 전체 선택 여부를 true 또는 false로 설정
      this.selectAll = selectAllValue;
    },
    calTotalPrice() {
      let totalPrice = 0;
      for (let item of this.cartList) {
        if (item.selected) {
          totalPrice += item.prod_price * item.prod_order_count;
        }
      }
      return totalPrice;
    },
    async updateTotalPrice(item) {
      // 구매수량이 변경될 때마다 총 상품금액과 DB에 저장된 수량을 업데이트.
      try {
        await axios.put(
          `/api/pay/cart/${item.prod_order_count}/${item.cart_no}`
        );
      } catch (err) {
        console.log(err);
      }
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
