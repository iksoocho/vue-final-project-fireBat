<template>
   <div class="container">
      <table class="table">
         <tr>
            <th>상품정보</th>
            <th>구매갯수</th>
            <th>상품금액</th>
            
         </tr>
         <tr>
            <td><input type="checkbox"><p>상품정보</p></td>
            <td><input type="number">갯수</td>
            <td>상품금액</td>
            
         </tr>
         <tr>
            <th>결제하기</th>
            <th>총 상품금액</th>
         </tr>

      </table>
   </div>
</template>

<script>
import axios from 'axios';
export default {
   data() {
      return {
            userId: '',
            cartList: {}
      };
   },
   
   created() {
      this.userId = '';
      this.getCartList();
   },
   methods: {
      async getCartList() {
         let result = 
            await axios.get(`/api/cart/${this.userId}`)
                     .catch(err => console.log(err));
         this.cartList = result.data;           
      },
      
   }
}
</script>