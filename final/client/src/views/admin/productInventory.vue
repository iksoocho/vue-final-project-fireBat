<template>
  <div class="container">
    <h3>재고관리 페이지</h3>
    <table class="table table-hover">
      <thead>
        <tr>
          <th>상품코드</th>
          <th>상품명</th>
          <th>상품가격</th>
          <th>현재재고</th>
          <th>남은재고</th>
          <th>상품상태</th>

          <th id="state">
            <label for="state"></label>
            <select name="state">
              <option value="1">판매가능</option>
              <option value="2">품절</option>
            </select>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr :key="i" v-for="(prod, i) in prodInvenList">
          <th class="code">{{ prod.prod_code }}</th>
          <th class="name">{{ prod.prod_name }}</th>
          <th calss="price">{{ prod.prod_price }}</th>
          <th class="count">{{ prod.prod_count }}</th>
          <th class="inven">{{ prod.count }}</th>
          <th class="state">{{ prod.prod_state }}</th>
          <th></th>
          <th>
            <input type="checkbox" id="chk" class="chkGrp" value="상태 체크" />
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      prodInvenList: [],
    };
  },
  created() {
    this.getProdInvenList();
  },
  methods: {
    async getProdInvenList() {
      this.prodInvenList = (
        await axios
          .get("/api/product/prodInven/Inventory")
          .catch((err) => console.log(err))
      ).data;
    },
  },
};
</script>

<style scoped>
.container {
  padding: 30px;
}
#state {
  text-align: center;
}
</style>
