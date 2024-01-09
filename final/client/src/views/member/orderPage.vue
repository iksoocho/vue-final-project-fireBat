<template>
    <div>
      <div v-for="(orderItems, orderNo) in groupedOrders" :key="orderNo">
        <h2>Order No: {{ orderNo }}</h2>
        <ul>
          <li v-for="item in orderItems" :key="item.prod_code">
            Order Date: {{ item.order_date }}, Product Code: {{ item.prod_code }}, Product Name: {{ item.prod_name }}, Order Count: {{ item.order_count }}, Total Price: {{ item.total_price }}
          </li>
        </ul>
        <hr />
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  export default {
    data() {
      return {
        orderList:[]
      };
    },
    computed: {
      groupedOrders() {
        const grouped = {};
        for (const item of this.orderList) {
          if (!grouped[item.order_no]) {
            grouped[item.order_no] = [];
          }
          grouped[item.order_no].push(item);
        }
        return grouped;
      },
      userId() {
        const userData = JSON.parse(sessionStorage.getItem('user'));
        console.log('userData:', userData); // 확인용 로그 추가
        return userData ? userData : null;
        },
    },
    created(){
        this.getOrderList()
    },
    methods:{
        async getOrderList(){
            this.orderList =(
            await axios.get(`/api/qna/order/${this.userId}`).catch((err) => console.log(err))
            ).data;
        }
    }
  };
  </script>
  
  <style>
  /* 스타일링 */
  </style>