<template>
    <div>
      <!-- <div v-for="(orderItems, orderNo) in groupedOrders" :key="orderNo">
        <h2>주문번호: {{ orderNo }}</h2>
        <ul>
          <li v-for="item in orderItems" :key="item.prod_code">
            Order Date: {{ item.order_date }}, Product Code: {{ item.prod_code }}, Product Name: {{ item.prod_name }}, Order Count: {{ item.order_count }}, Total Price: {{ item.total_price }}
          </li>
        </ul> -->
        <section class="notice">
  <div class="page-title">
    <div class="container">
      <h3>주문내역</h3>
    </div>
  </div>

  <div id="board-list">
    <div class="container" v-for="(orderItems, orderNo) in displayedOrders" :key="orderNo">
      <h2>주문번호: {{ orderNo }}   </h2><br>
      <table class="board-table">
        <thead>
          <tr>
            <th scope="col" class="th-num">상품 이미지</th>
            <th scope="col" class="th-title">상품 이름</th>
            <th scope="col" class="th-title">수량</th>
            <th scope="col" class="th-date">주문 일자</th>
            <th scope="col" class="th-num">금액</th>
            <th scope="col" class="th-num">리뷰</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in orderItems" :key="item.prod_code">
            <td>
              <img
                :src="`/api/qna/public/uploads/${item.prodImg}`"
                class="card-img-top"
                alt="이미지가 존재하지 않습니다."
                width="100px"
                height="100px"
              />
            </td>
            <td>{{ item.prod_name }}</td>
            <td>{{ item.order_count }}</td>
            <td>{{ getDateFormat(item.order_date) }}</td>
            <td>{{ item.total_price }}원</td>
            <td><button @click="goReviewInsert(item.prod_code,item.order_no)">리뷰 쓰기</button></td>
          </tr>
        </tbody>
      </table>
      <br /><br /><br />
    </div>
  </div>
</section>
<Paginate
      class="justify-content-center"
      :list="Object.keys(groupedOrders)"
      v-bind="{ ITEM_PER_PAGE, PAGE_PER_SECTION, curPage }"
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
        orderList:[],
        ITEM_PER_PAGE: 3,
      PAGE_PER_SECTION: 5,
      curPage: 1,
      };
    },
    computed: {
      // groupedOrders() {
      //   const grouped = {};
      //   for (const item of this.orderList) {
      //     if (!grouped[item.MER_UID]) {
      //       grouped[item.MER_UID] = [];
      //     }
      //     grouped[item.MER_UID].push(item);
      //   }
      //   return grouped;
      // },
      groupedOrders() {
  const grouped = {};

  for (const item of this.orderList) {
    const key = `${item.MER_UID}\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0총 결제 금액 : ${item.order_total_amount}원`;

    if (!grouped[key]) {
      grouped[key] = [];
    }

    grouped[key].push(item);
  }

  return grouped;
},
      userId() {
        const userData = JSON.parse(sessionStorage.getItem('user'));
        console.log('userData:', userData); // 확인용 로그 추가
        return userData ? userData : null;
        },
        pageStartIdx() {
      return (this.curPage - 1) * this.ITEM_PER_PAGE;
    },
    displayedOrders() {
    const keys = Object.keys(this.groupedOrders);
    const startIdx = (this.curPage - 1) * this.ITEM_PER_PAGE;
    const endIdx = startIdx + this.ITEM_PER_PAGE;

    return keys.slice(startIdx, endIdx).reduce((result, key) => {
      result[key] = this.groupedOrders[key];
      return result;
    }, {});
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
        },
        getDateFormat(date) {
                return this.$dateFormat(date); // 날짜 변환
        },
        goReviewInsert(prod_code,order_no){
            this.$router.push({ path: "/reviewInsert", query: { prod_code: prod_code,  order_no:order_no} })
        },
        onChangePage(data) {
      this.curPage = data;
    },
       
    }
  };
  </script>
  
  <style scoped>
table {
  border-collapse: collapse;
  border-spacing: 0;
}
section.notice {
  padding: 80px 0;
}

.page-title {
  margin-bottom: 60px;
}
.page-title h3 {
  font-size: 28px;
  color: #333333;
  font-weight: 400;
  text-align: center;
}

#board-search .search-window {
  padding: 15px 0;
  background-color: #f9f7f9;
}
#board-search .search-window .search-wrap {
  position: relative;
  /*   padding-right: 124px; */
  margin: 0 auto;
  width: 80%;
  max-width: 564px;
}
#board-search .search-window .search-wrap input {
  height: 40px;
  width: 100%;
  font-size: 14px;
  padding: 7px 14px;
  border: 1px solid #ccc;
}

#board-search .search-window .search-wrap input:focus {
  border-color: #333;
  outline: 0;
  border-width: 1px;
}
#board-search .search-window .search-wrap .btn {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 108px;
  padding: 0;
  font-size: 16px;
}

.board-table {
  font-size: 13px;
  width: 100%;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}

.board-table a {
  color: #333;
  display: inline-block;
  line-height: 1.4;
  word-break: break-all;
  vertical-align: middle;
}
.board-table a:hover {
  text-decoration: underline;
}
.board-table th {
  text-align: center;
}

.board-table .th-num {
  width: 100px;
  text-align: center;
}

.board-table .th-date {
  width: 200px;
}

.board-table th,
.board-table td {
  padding: 14px 0;
}

.board-table tbody td {
  border-top: 1px solid #e7e7e7;
  text-align: center;
}

.board-table tbody th {
  padding-left: 28px;
  padding-right: 14px;
  border-top: 1px solid #e7e7e7;
  text-align: left;
}

.board-table tbody th p {
  display: none;
}

.btn {
  display: inline-block;
  padding: 0 30px;
  font-size: 15px;
  font-weight: 400;
  background: transparent;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  text-transform: uppercase;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  border-radius: 0;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
}

.btn-dark {
  background: #555;
  color: #fff;
}

.btn-dark:hover,
.btn-dark:focus {
  background: #373737;
  border-color: #373737;
  color: #fff;
}

.btn-dark {
  background: #555;
  color: #fff;
}

.btn-dark:hover,
.btn-dark:focus {
  background: #373737;
  border-color: #373737;
  color: #fff;
}

/* reset */

* {
  list-style: none;
  text-decoration: none;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.clearfix:after {
  content: "";
  display: block;
  clear: both;
}
.container {
  width: 1100px;
  margin: 0 auto;
}
.blind {
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  margin: -1px;
  width: 1px;
  height: 1px;
}
</style>