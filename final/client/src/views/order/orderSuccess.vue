<template>
   <div class="container">
      <table class="table w-50 text-center">
         <tr><th colspan="2">주문완료</th></tr>
         <tr><td colspan="2">주문/결제가 정상적으로 완료되었습니다.</td></tr>
         <tr><td colspan="2">주문번호 : {{ orderList.MER_UID }}</td></tr>
         <tr><td colspan="2">결제정보</td></tr>
         <tr><th>총 상품금액</th><th>{{ orderList.order_prod_amount}}원</th></tr>
         <tr><th>총 결제금액</th><th>{{ orderList.order_total_amount }}원</th></tr>
         <tr><th>배송비</th><th>{{ orderList.delivery_pay }}원</th></tr>
         

      </table>
      <button>쇼핑계속하기</button>
   </div>

</template>

<script>
import axios from "axios";
export default {
   data() {
      return {
         mer_uid : '',
         orderList : {},
         orderDetailList : [],
      };
   },
   methods : {
      async getOrderList() {
         console.log('주문번호 : ', this.mer_uid);
         try {
         let result = await axios
            .get(`/api/pay/orderList/${this.mer_uid}`)
            .catch((err) => console.log(err));
         this.orderList = result.data;
         console.log('주문정보orederList : ', this.orderList);
         
         } catch (err) {
         console.log(err);
         }
      },
      async getOrderDetailList() {
         try {
         let result = await axios
            .get(`/api/pay/orderDetailList/${this.mer_uid}`)
            .catch((err) => console.log(err));
         this.orderDetailList = result.data;
         console.log('주문상세정보detailList : ', this.orderDetailList);
         
         } catch (err) {
         console.log(err);
         }
      },
   },
   async created() {
      this.mer_uid = this.$route.query.mer_uid;
      await this.getOrderList();
      await this.getOrderDetailList();
   },
}
</script>