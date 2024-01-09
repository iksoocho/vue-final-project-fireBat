<template>
  <div class="container text-center">
    <div class="row row-cols-auto">
      <form action="/api/festival/fesReg/${this.selectedLoc}" method="GET" @submit.prevent="cateSearch">
          <!-- 지역 카테고리 -->
          <select title="지역" v-model="selectedLoc"
          > <option value>지역</option>
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
        <button type="submit" @click="cateSearch">검색</button>
      </form>
    </div>
    

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
            <p class="card-text">{{ getDateFormat(fes.f_firstday) }} ~ {{ getDateFormat(fes.f_lastday) }}</p>
            <p class="card-text">{{ fes.f_reg }}</p>
            <a href="#" class="btn btn-primary">상품 상세페이지</a>
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
    async cateSearch() {
        console.log("this.selectedLoc : " , this.selectedLoc);
      if(this.selectedLoc && !this.selectedCate) {
        let list = await axios.get(`/api/festival/fesReg/${this.selectedLoc}`).catch((err) => console.log(err));
        let result = list.data;
        this.festivalList = result;  
      } else if (this.selectedLoc && this.selectedCate) {
        let list = await axios.get(`/api/festival/fesRegCate/${this.selectedLoc}/${this.selectedCate}`).catch((err) => console.log(err));
        let result = list.data;
        this.festivalList = result;  
      } else if( !this.selectedLoc && this.selectedCate) {
        let list = await axios.get(`/api/festival/fesCate/${this.selectedCate}`).catch((err) => console.log(err));
        let result = list.data;
        this.festivalList = result;
      } else {
        this.getFestivalList();
      }
    },

    async getFestivalList() {
      try {
        const festivalList = (await axios.get(`/api/festival`)).data;
        this.festivalList = festivalList;

        // 각 제품에 대한 이미지 데이터 가져오기
        // for (const prod of productList) {
        //   const response = await axios.get(`/api/product/selectImg/${prod.prod_code}`);
        //   const prodImages = response.data;

        //   // Vue.set 대신, JavaScript의 동적 속성 추가 방식으로 데이터 업데이트
        //   this.prodImgs[prod.prod_code] = prodImages;
        // }
      } catch (error) {
        console.error(error);
      }
    },
    getDateFormat(date) {
      return this.$dateFormat(date); // 날짜 변환
    },
    goToUpdate(f_code) {
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

<style></style>