<template>
  <div>
    <h2 id="flist">축제목록</h2>
    <br />
    <div class="scroll-container">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>축제코드</th>
            <th>카테고리</th>
            <th>지역</th>
            <th>축제이름</th>
            <th>전화번호</th>
            <th>축제일정</th>
            <th>금액</th>
            <th>홈페이지</th>
            <th>삭제</th>
          </tr>
        </thead>

        <tbody>
          <tr
            :key="i"
            v-for="(fes, i) in festivalList.slice(
              pageStartIdx,
              pageStartIdx + ITEM_PER_PAGE
            )"
            @click="goToUpdate(fes.f_code)"
          >
            <td>{{ fes.f_code }}</td>
            <td>{{ fes.f_category }}</td>
            <td>{{ fes.f_reg }}</td>
            <td>{{ fes.f_name }}</td>
            <td>{{ fes.f_number }}</td>
            <td>
              {{ getDateFormat(fes.f_firstday) }} ~
              {{ getDateFormat(fes.f_lastday) }}
            </td>
            <td>{{ fes.f_price }}</td>
            <td>{{ fes.f_url }}</td>
            <div class="row">
              <!-- <button class="btn btn-info" v-on:click="goToUpdate(fes.f_code)">수정</button> -->
              <button
                class="btn btn-outline-danger"
                @click="fesDelete(fes.f_code)"
              >
                X
              </button>
            </div>
          </tr>
        </tbody>
      </table>
    </div>
    <div id="fapp">
      <!-- Search input and button -->
      <input
        type="text"
        v-model="word"
        @input="onSearchInput"
        @keyup.enter="fesSearch"
        placeholder="축제 이름을 검색하세요"
      />
      <!-- <button @click="onSearchInput">검색</button> -->
      <br />
      <br />
      <button><a href="festivalList">리스트로</a></button>
    </div>
    <Paginate
      class="justify-content-center"
      :list="festivalList"
      v-bind="{ ITEM_PER_PAGE, PAGE_PER_SECTION, curPage }"
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
      festivalList: [],
      word: "",
      ITEM_PER_PAGE: 10,
      PAGE_PER_SECTION: 5,
      curPage: 1,
    };
  },
  created() {
    this.getFestivalList();
  },
  computed: {
    pageStartIdx() {
      return (this.curPage - 1) * this.ITEM_PER_PAGE;
    },
  },
  methods: {
    async getFestivalList() {
      this.festivalList = (
        await axios.get("/api/festival").catch((err) => console.log(err))
      ).data;
    },
    async getFestivalList() {
      this.festivalList = (
        await axios.get("/api/festival").catch((err) => console.log(err))
      ).data;
    },
    async fesSearch() {
      if (this.word.trim() === "") {
        // If the search text is empty, reset the festivalList to the original list
        this.getFestivalList();
      } else {
        // Otherwise, perform the search
        this.festivalList = (
          await axios.get(`/api/festival/search/${this.word.trim()}`)
        ).data;
      }
      console.log(this.festivalList);
    },
    onSearchInput() {
      // Reset the festivalList when the search input is cleared
      if (this.word.trim() === "") {
        this.getFestivalList();
      }
    },
    getDateFormat(date) {
      return this.$dateFormat(date); // 날짜 변환
    },
    async goToUpdate(f_code) {
      let response = await axios
        .delete(`/api/festival/deleteImg/${f_code}`)
        .catch((err) => console.log(err));

      this.$router.push({ path: "/festivalUpdate", query: { f_code: f_code } });
    },
    goFesInfo(f_code) {
      this.$router.push({ path: "/festivalInfo", query: { f_code: f_code } });
    },
    goFesInfoList(f_code) {
      this.$router.push({
        path: "/festivalInfoList",
        query: { f_code: f_code },
      });
    },
    async fesDelete(f_code) {
      let response = await axios
        .delete(`/api/festival/deleteImg/${f_code}`)
        .catch((err) => console.log(err));
      let count2 = response.data.affectedRows;

      let result = await axios
        .delete(`/api/festival/delete/${f_code}`)
        .catch((err) => console.log(err));
      console.log(result.data);
      let count = result.data.affectedRows;

      if (count + count2 == 0) {
        Swal.fire({
          icon: "warning",
          title: "삭제실패!",
          confirmButtonText: "확인",
        });
      } else {
        Swal.fire({
          icon: "warning",
          title: "삭제성공!!",
          confirmButtonText: "확인",
        });
        this.$router.push({ name: "festivalInfoList" });
      }
    },
    onChangePage(data) {
      this.curPage = data;
    },
  },
};
</script>

<style scoped>
#flist {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
}

.scroll-container {
  /* max-height: 400px;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 5px; */
}

.table {
  width: 100%;
  margin-bottom: 0;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 15px;
  text-align: center;
  border: 1px solid #ddd;
}

.table th {
  background-color: #f5f5f5;
  font-weight: bold;
}

.table tbody tr:hover {
  background-color: #f9f9f9;
}

#fapp {
  text-align: center;
  margin-top: 20px;
}

#fapp input {
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

#fapp button {
  padding: 10px 20px;
  background-color: wheat;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

#fapp button:hover {
  background-color: powderblue;
}

#fapp a {
  color: honeydew;
  text-decoration: none;
}

#fapp a:hover {
  text-decoration: underline;
}

.btn btn-outline-danger {
  padding: 8px 16px;
}
</style>
