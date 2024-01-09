<template>
  <div id="delivery" class="container">
    <div id="app">
      <input
        type="text"
        v-model="word"
        @keyup.enter="prodSearch"
        @input="onSearchInput"
        placeholder="검색하세요"
      />
      <button @click="prodSearch">검색</button>
    </div>
    <h3>배송정보</h3>
    <table class="table table-hover">
      <thead>
        <tr>
          <th>주문번호</th>
          <th>이름</th>
          <!-- <th>송장번호</th> -->
          <th>배송메세지</th>
          <th>수령인주소</th>
          <th>배송상태</th>
          <th>배송상태 변경</th>
        </tr>
      </thead>
      <tbody>
        <tr
          :key="i"
          v-for="(del, i) in deliveryInformationList.slice(
            pageStartIdx,
            pageStartIdx + ITEM_PER_PAGE
          )"
        >
          <th>{{ del.order_detail_no }}</th>
          <th>{{ del.user_name }}</th>
          <!-- <th>{{}}</th> -->
          <th>{{ del.delivery_req }}</th>
          <th>{{ del.sumAddr }}</th>
          <th>{{ deliveryState(del.delivery_state) }}</th>
          <th>
            <input
              type="checkbox"
              v-model="del.delivery_state"
              true-value="1"
              false-value="0"
              @change="ChangeState(del)"
            />
          </th>
        </tr>
      </tbody>
    </table>
    <Paginate
      class="justify-content-center"
      :list="deliveryInformationList"
      :ITEM_PER_PAGE="ITEM_PER_PAGE"
      :PAGE_PER_SECTION="PAGE_PER_SECTION"
      :curPage="curPage"
      @change-page="onChangePage"
    />
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import Paginate from "../../components/Pagination.vue";

export default {
  components: {
    Paginate,
  },
  data() {
    return {
      deliveryInformationList: [],
      word: "",
      ITEM_PER_PAGE: 10,
      PAGE_PER_SECTION: 5,
      curPage: 1,
    };
  },
  created() {
    this.getDeliveryInformationList();
  },
  computed: {
    pageStartIdx() {
      return (this.curPage - 1) * this.ITEM_PER_PAGE;
    },
  },
  methods: {
    async getDeliveryInformationList() {
      this.deliveryInformationList = (
        await axios
          .get(`/api/product/delivery/delList`)
          .catch((err) => console.log(err))
      ).data;
    },
    async prodSearch() {
      if (this.word.trim() === "") {
        this.getDeliveryInformationList();
      } else {
        this.deliveryInformationList = (
          await axios.get(`/api/product/search3/${this.word.trim()}`)
        ).data;
      }
    },
    onChangePage(data) {
      this.curPage = data;
    },
    deliveryState(data) {
      if (data == 1) {
        return "배송완료";
      } else if (data == 0) {
        return "배송중";
      }
    },
    async ChangeState(item) {
      // 체크상태 변경 DB저장
      if (item.delivery_state === "1") {
        try {
          console.log("선택상태 : ", item.delivery_state);
          await axios.put(
            `/api/product/state1/${item.delivery_state}/${item.delivery_no}`
          );
        } catch (err) {
          console.log(err);
        }
      } else if (item.delivery_state === "0") {
        try {
          console.log("선택상태 : ", item.delivery_state);
          await axios.put(
            `/api/product/state1/${item.delivery_state}/${item.delivery_no}`
          );
        } catch (err) {
          console.log(err);
        }
      }
    },
  },
};
</script>

<style scoped>
.pagination-frame {
  height: 10%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
  margin: 1vh 0vw 0vh 0vw;
  padding: 0px;

  /* 드래그 막기 */
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}
/* 페이지 이동 버튼 */
.pagination-frame > li {
  width: 1.55vw;
  height: 3vh;
  background-color: #fff;
  border: 1px solid rgb(211, 210, 211);
  text-align: center;
  padding: 3px 0vw;
  cursor: pointer;
}
.page-btn {
  margin: 0px 1px;
}
.page-left-btn {
  margin-right: 5px;
}
.page-right-btn {
  margin-left: 5px;
}
.container {
  padding: 30px;
}
</style>
