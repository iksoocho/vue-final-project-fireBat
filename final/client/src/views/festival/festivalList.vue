<template>
  <div class="container text-center">
    <div class="row row-cols-auto">
      <form
        action="/api/festival/fesReg/${this.selectedLoc}"
        method="GET"
        @submit.prevent="cateSearch"
      >
        <!-- 지역 카테고리 -->
        <select title="지역" v-model="selectedLoc">
          <option value>지역</option>
          <option value="서울">서울</option>
          <option value="인천">인천</option>
          <option value="대전">대전</option>
          <option value="대구">대구</option>
          <option value="광주">광주</option>
          <option value="부산">부산</option>
          <option value="울산">울산</option>
          <option value="세종">세종</option>
          <option value="경기">경기</option>
          <option value="강원">강원</option>
          <option value="충북">충북</option>
          <option value="충남">충남</option>
          <option value="경북">경북</option>
          <option value="경남">경남</option>
          <option value="전북">전북</option>
          <option value="전남">전남</option>
          <option value="제주">제주</option>
        </select>

        <!-- 테마 카테고리 -->
        <select title="테마별" v-model="selectedCate">
          <option value>테마별</option>
          <option value="불빛">불빛</option>
          <option value="문화예술">문화예술</option>
          <option value="연인">연인</option>
          <option value="관광">관광</option>
        </select>
        <button
          type="button"
          class="btn btn-outline-danger me-2"
          @click="cateSearch"
        >
          search
        </button>
        <button type="button" class="btn btn-danger" @click="List">
          reset
        </button>
        <!-- <button type="submit" @click="cateSearch">검색</button>
        <button type="button" @click="List">초기화</button> -->
      </form>
    </div>
    <br />
    <br />
    <br />

    <!-- 축제 리스트 -->

    <div class="container">
      <div class="row">
        <div
          v-for="(fes, i) in festivalList"
          :key="i"
          class="col-md-3 mb-4"
          @click="goFesInfo(fes.f_code)"
        >
          <div class="card">
            <img
              :src="`/api/festival/public/uploads/${fes.fesImg}`"
              class="card-img-top"
              alt="이미지가 존재하지 않습니다."
              style="height: 250px"
            />
            <div class="card-body">
              <h5 class="card-title">{{ fes.f_name }}</h5>
              <p class="card-text">
                {{ getDateFormat(fes.f_firstday) }} ~
                {{ getDateFormat(fes.f_lastday) }}
              </p>
              <p class="card-text">{{ fes.f_reg }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      festivalList: [],
      fesImgs: {},
      selectedLoc: "", // 선택한 지역 값
      selectedCate: "", // 선택한 카테고리 값
    };
  },
  created() {
    this.getFestivalList();
    // this.cateSearch();
  },
  methods: {
    // 초기화 버튼 클릭 시 다시 기본 리스트로
    async List() {
      this.getFestivalList();
    },

    async cateSearch() {
      console.log("this.selectedLoc : ", this.selectedLoc);
      if (this.selectedLoc && !this.selectedCate) {
        let list = await axios
          .get(`/api/festival/fesReg/${this.selectedLoc}`)
          .catch((err) => console.log(err));
        let result = list.data;
        this.festivalList = result;
      } else if (this.selectedLoc && this.selectedCate) {
        let list = await axios
          .get(
            `/api/festival/fesRegCate/${this.selectedLoc}/${this.selectedCate}`
          )
          .catch((err) => console.log(err));
        let result = list.data;
        this.festivalList = result;
      } else if (!this.selectedLoc && this.selectedCate) {
        let list = await axios
          .get(`/api/festival/fesCate/${this.selectedCate}`)
          .catch((err) => console.log(err));
        let result = list.data;
        this.festivalList = result;
      } else {
        this.getFestivalList();
      }
    },

    // 축제 전체 리스트
    async getFestivalList() {
      try {
        const festivalList = (await axios.get(`/api/festival`)).data;
        this.festivalList = festivalList;
      } catch (error) {
        console.error(error);
      }
    },

    // 날짜 변환
    getDateFormat(date) {
      return this.$dateFormat(date);
    },

    // 축제 수정
    goToUpdate(f_code) {
      this.$router.push({ path: "/festivalUpdate", query: { f_code: f_code } });
    },

    // 축제 상세페이지
    goFesInfo(f_code) {
      this.$router.push({ path: "/festivalInfo", query: { f_code: f_code } });
    },

    // 관리자페이지 축제목록
    goFesInfoList(f_code) {
      this.$router.push({
        path: "/festivalInfoList",
        query: { f_code: f_code },
      });
    },

    // 축제삭제
    async fesDelete(f_code) {
      let result = await axios
        .delete(`/api/festival/delete/${f_code}`)
        .catch((err) => console.log(err));
      console.log(result.data);
      let count = result.data.affectedRows;
      if (count == 0) {
        alert("정상적으로 삭제되지 않았습니다.");
      } else {
        alert("정상적으로 삭제 되었습니다.");
        this.$router.push({ name: "festivalList" });
      }
    },

    // 이미지
    getFesImgUrl(f_code) {
      const fesImages = this.fesImgs[f_code];

      if (prodImages) {
        return `/api/product/festival/uploads/${fesImages.f_filename}`;
      }
      return ""; // 이미지가 없을 때 빈 문자열 반환
    },
  },
};
</script>

<style scoped>
.row-cols-auto {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

form {
  display: flex;
  gap: 10px;
  align-items: center;
}

select,
button {
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
}
</style>
