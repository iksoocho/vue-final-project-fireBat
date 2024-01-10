<template>
  <div class="container">
    <table class="table w-75" style="margin: auto; table-layout:fixed;">
      <colgroup>
        <col width="10%" />
        <col width="10%" />
        <col width="55%" />
        <col width="15%" />
        <col width="10%" />
      </colgroup>
      <tr>
        <th>
          <input
            type="checkbox"
            @change="selectAllItems"
            true-value="1"
            false-value="0"
            class="form-check-input"
          />전체선택
        </th>
        <th colspan="2">상품</th>
        <th>구매갯수</th>
        <th style="text-align: center;">상품금액</th>
      </tr>
      <tr v-for="item in cartList" :key="item.prod_code">
        <td>
          <input
            type="checkbox"
            v-model="item.prod_select"
            true-value="1"
            false-value="0"
            @change="updateCheckboxStatus(item)"
            class="form-check-input"
          />{{ item.prod_select }}
        </td>
        <td>
          <img
            :src="`/api/product/public/uploads/${item.prodImg}`"
            class="card-img-top"
            alt="이미지가 존재하지 않습니다."
            style="width: 100px; height: 100px;"
          />
        </td>
        <td style="text-align : left;">
          <p>{{ item.prod_name }}</p>
        </td>
        <td>
          <!-- <input
            type="number"
            min="1"
            :max="item.prod_count"
            v-model="item.prod_order_count"
            @input="updateTotalPrice(item)"
            class="form-control"
          />개 -->
          <div style="display: flex; align-items: center;">
            <input
              type="number"
              min="1"
              :max="item.prod_count"
              v-model="item.prod_order_count"
              @input="updateTotalPrice(item)"
              class="form-control"
              style="margin-right: 5px;"
            />
            <span>개</span>
          </div>
        </td>
        <td style="text-align: center;">{{ item.prod_price * item.prod_order_count }}</td>
      </tr>
      <tr>
        <th><button @click="cartSelectDel" class="btn btn-danger btn-ghost">선택삭제</button></th>
        <th><button @click="submitOrder" class="btn btn-success btn-jittery">주문하기</button></th>
        <th> </th>
        <th class="textbig">총 상품금액</th>
        <th class="textbig" style="text-align: center;">{{ calTotalPrice() }}</th>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      selectAll: 0,
      cartList: [],
      totalPrice : 0,
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
      } catch (err) {
        console.log(err);
      }
    },
    selectAllItems() {
      // 전체 선택 여부 업데이트
      const selectAllValue = !this.selectAll;
      console.log("selectAllvalue : ", selectAllValue);
      let status = "";
      if (selectAllValue) {
        status = 1;
      } else {
        status = 0;
      }
      this.cartList.forEach((item) => {
        item.prod_select = status;
        this.updateCheckboxStatus(item); // 체크박스 상태를 업데이트하는 메서드 호출
      });
      // 총 상품금액 업데이트
      this.updateTotalPrice();
      // 전체 선택 여부를 true 또는 false로 설정
      this.selectAll = selectAllValue;
    },
    calTotalPrice() {
      let totalPrice = 0;
      for (let item of this.cartList) {
        if (item.prod_select) {
          totalPrice += item.prod_price * item.prod_order_count;
        }
      }
      return this.totalPrice=totalPrice;
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
    async updateCheckboxStatus(item) {
      // 체크상태 변경 DB저장
      if (item.prod_select === '1') {
        try {
          console.log("선택상태 : ", item.prod_select);
          await axios.put(`/api/pay/cartSelect/1/${item.cart_no}`);
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          console.log("선택상태 : ", item.prod_select);
          await axios.put(`/api/pay/cartSelect/0/${item.cart_no}`);
        } catch (err) {
          console.log(err);
        }
      }
      this.calTotalPrice();
    },
    async cartSelectDel() {
      try {
        await axios.delete(`/api/pay/cart/${this.userId}`);
        console.log("삭제되었습니다.");
        Swal.fire({
          title : '삭제되었습니다.',
          icon : 'success'
        });
        // 삭제 후 장바구니 리스트 갱신
        this.getCartList();
      } catch (err) {
        console.log(err);
      }
    },
    submitOrder() {
      this.$router.replace({
        path: '/payment',
        query: { 
          totalPrice: this.totalPrice,
        },
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
@import url('https://fonts.googleapis.com/css2?family=Do+Hyeon&family=Jua&family=Nanum+Gothic:wght@700&family=Orbit&display=swap');

.table td, .table th {
  vertical-align: middle;
  text-align: center;
  font-family: 'Nanum Gothic', sans-serif;
}
.textbig {
  font-size: large;
  color: rgb(4, 4, 83);
}
.btn {
  margin: 1rem;
  font-family: 'Do Hyeon', sans-serif;
  font-size: large;
  border: none;
}
.btn-success{
  color: white;
  background-color: rgb(77, 194, 248); 
  
}
.btn-danger {
  background-color: rgb(248, 113, 113);
  color: white;
  transition: 0.3s;
}
.btn-danger:hover {
    background-color: white;
    color: rgb(248, 113, 113);
  }

.btn-jittery {
  animation: jittery 4s infinite;
}
@keyframes jittery {
  5%,
  50% {
    transform: scale(1);
  }

  10% {
    transform: scale(0.9);
  }

  15% {
    transform: scale(1.15);
  }

  20% {
    transform: scale(1.15) rotate(-5deg);
  }

  25% {
    transform: scale(1.15) rotate(5deg);
  }

  30% {
    transform: scale(1.15) rotate(-3deg);
  }

  35% {
    transform: scale(1.15) rotate(2deg);
  }

  40% {
    transform: scale(1.15) rotate(0);
  }
}

</style>
