<template>
  <div id="users" class="container">
    <div id="app">
      <input
        type="text"
        v-model="word"
        @keyup.enter="prodSearch"
        @input="onSearchInput"
        placeholder="이름을 검색하세요"
      />
      <button @click="prodSearch">검색</button>
    </div>

    <h3>회원정보</h3>
    <table class="table table-hover">
      <thead>
        <tr>
          <th>회원 ID</th>
          <th>회원 PW</th>
          <th>이메일</th>
          <th>이름</th>
          <th>휴대폰 번호</th>
          <th>거주지</th>
          <th>주민번호</th>
          <!--<th>카운트</th> -->
        </tr>
      </thead>
      <tbody>
        <tr
          :key="i"
          v-for="(users, i) in adminUserList.slice(
            pageStartIdx,
            pageStartIdx + ITEM_PER_PAGE
          )"
        >
          <th class="id">{{ users.user_id }}</th>
          <th class="pw">{{ users.user_pw }}</th>
          <th class="email">{{ users.user_email }}</th>
          <th class="name">{{ users.user_name }}</th>
          <th class="tel">{{ users.user_tel }}</th>
          <th class="addr">{{ users.user_addr }}</th>
          <th class="date">{{ $dateFormat(users.user_birth, "yy-MM-dd") }}</th>
          <!-- <th class="count">{{ users.sellcount }}</th> -->
        </tr>
      </tbody>
    </table>
    <Paginate
      class="justify-content-center"
      :list="adminUserList"
      :ITEM_PER_PAGE="ITEM_PER_PAGE"
      :PAGE_PER_SECTION="PAGE_PER_SECTION"
      :curPage="curPage"
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
      adminUserList: [],
      word: "",
      ITEM_PER_PAGE: 10,
      PAGE_PER_SECTION: 5,
      curPage: 1,
    };
  },
  created() {
    this.getAdminUserList();
  },
  computed: {
    pageStartIdx() {
      return (this.curPage - 1) * this.ITEM_PER_PAGE;
    },
  },
  methods: {
    async getAdminUserList() {
      this.adminUserList = (
        await axios
          .get("/api/product/adminUser/user")
          .catch((err) => console.log(err))
      ).data;
    },
    onChangePage(data) {
      this.curPage = data;
    },
    async prodSearch() {
      if (this.word.trim() === "") {
        this.getAdminUserList();
      } else {
        this.adminUserList = (
          await axios.get(`/api/product/search2/${this.word.trim()}`)
        ).data;
      }
    },
  },
};
</script>

<style scoped>
.container {
  padding: 30px;
}
.count {
  text-align: center;
}
</style>
