<template>
  <div class="container">
    <div class="row">
      <div>
        <tr>
          <h1 id="content" itemid="name">
            <th>{{ fesInfo.f_name }}</th>
          </h1>
        </tr>
        <tr>
          <h3>
            <th>
              {{ getDateFormat(fesInfo.f_firstday) }} ~
              {{ getDateFormat(fesInfo.f_lastday) }}
            </th>
          </h3>
        </tr>
      </div>
      <div class="row align-items-end" id="subImg">
        <template v-for="(img, idx) in fesImgs" :key="idx">
          <img
            :src="`http://localhost:3000/festival/public/uploads/${img.f_filename}`"
            class="card-img-top sub-img"
            alt=""
          />
        </template>
      </div>

      <div>
        <tr>
          <h4 id="content">
            <th>{{ fesInfo.f_content }}</th>
          </h4>
        </tr>
      </div>
      <div class="container text-center">
        <div class="row">
          <div class="col-8 col-sm-6" v-if="fesImgs.length > 0">
            <img
              :src="`http://localhost:3000/festival/public/uploads/${fesImgs[0].f_filename}`"
              class="card-img-top"
              alt="이미지가 없습니다."
              style="width: 500px; height: 600px"
            />
          </div>
          <div class="col-sm-4" id="text">
            <tr>
              <th>
                📅 일정 : {{ getDateFormat(fesInfo.f_firstday) }} ~
                {{ getDateFormat(fesInfo.f_lastday) }}
              </th>
            </tr>
            <br />
            <br />
            <br />

            <tr>
              <th>📢 위치 : {{ fesInfo.f_loc }}</th>
            </tr>
            <br />
            <br />
            <br />

            <tr>
              <th>🎫 금액 : {{ fesInfo.f_price }}</th>
            </tr>
            <br />
            <br />
            <br />

            <tr>
              <th>📞 전화번호 : {{ fesInfo.f_number }}</th>
            </tr>
            <br />
            <br />
            <br />
            <tr>
              <div class="button_container">
                <a :href="fesInfo.f_url">
                  <p class="description">공식홈페이지</p>
                  <button class="btn"><span>Click!</span></button>
                </a>
              </div>
            </tr>
            <!-- <tr class="homepage">
              <a :href="fesInfo.f_url">공식홈페이지</a>
            </tr> -->
          </div>
        </div>
      </div>
    </div>
    <br />
    <br />

    <hr />
    <h5>길찾기 <a :href="kakaoMapLink" target="_blank" class="car">🚘</a></h5>
    <div>
      <!-- 이 곳에 지도가 표시될 영역 -->
      <div id="map" style="width: 100%; height: 400px"></div>
    </div>
    <hr />
    <br />
    <h2>함께하기 좋은 특산물</h2>
    <br />
    <br />
    <div calss="row align-items-end" style="display: flex">
      <div
        v-for="(prd, i) in fesProduct"
        :key="i"
        class="col-4 col-sm-3"
        style="margin: 10px"
        @click="goProdInfo(prd.prod_code)"
      >
        <div class="single_destination">
          <div class="thumb">
            <img
              :src="`/api/product/public/uploads/${prd.prodImg}`"
              alt=""
              width="300px"
              height="250px"
            />
          </div>
          <div class="content">
            <p class="d-flex align-items-center"></p>
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
      searchNo: "",
      fesInfo: {},
      roadview: null,
      roadviewClient: null,
      fesImgs: [],
      fesProduct: [],
    };
  },
  computed: {
    // 길찾기
    kakaoMapLink() {
      const f_loc = this.fesInfo.f_loc;
      const encodedFloc = encodeURIComponent(f_loc);
      const kakaoLink = `https://map.kakao.com/link/search/${encodedFloc}`;
      console.log(kakaoLink); // 생성된 카카오 링크 출력
      return kakaoLink; // 생성된 카카오 링크 반환
    },
  },
  mounted() {},

  created() {
    this.searchNo = this.$route.query.f_code; // 페이지요청은 router  페이지가 열릴때는 route
    this.getFesInfo();
    this.getFesImg();
  },
  methods: {
    goProdInfo(prod_loc) {
      this.$router.push({
        path: "/userProductInfo",
        query: { prod_code: prod_loc },
      });
    },
    async getFesInfo() {
      //   let result = await axios.get(`/api/festival/${this.searchNo}`)
      //                     .catch(err => console.log(err));
      //   this.fesInfo = result.data;    // .data 데이터가 보내준 값을 받음
      try {
        let response = await axios.get(`/api/festival/${this.searchNo}`);
        this.fesInfo = response.data;
        console.log("this.fesInfo.f_regggggg : ", this.fesInfo.f_reg);
        this.initializeMap();
        this.getFesProdlList(this.fesInfo.f_reg);
      } catch (err) {
        console.log(err);
      }
    },
    goFesUpdate(f_code) {
      this.$router.push({ path: "/festivalUpdate", query: { f_code: f_code } });
    },
    async fesDelete(f_code) {
      let result = await axios
        .delete(`/api/festival/delete/${f_code}`)
        .catch((err) => console.log(err));
      console.log(result.data);
      let count = result.data.affectedRows;
    },
    getDateFormat(date) {
      return this.$dateFormat(date); // 날짜 변환
    },

    // 카카오맵 API 지도
    initializeMap() {
      // ID가 'map'인 HTML 요소를 검색하여 변수에 할당 mapContainer.
      const mapContainer = document.getElementById("map");
      // 위도 경도 기본 초기값
      const mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 5,
      };
      // 지정된 컨테이너랑 옵션 사용해서 새로운 카카오맵 API지도 객체 생성
      const map = new kakao.maps.Map(mapContainer, mapOption);
      // 축제 장소의 주소를 위도 경도가 아닌 좌표로 변환하려고 지오코더 객체 만듬
      const geocoder = new kakao.maps.services.Geocoder();
      const address = this.fesInfo.f_loc;
      // 지오코더 이용해서 주소검색
      geocoder.addressSearch(address, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x); // 지오코딩 조건문 값을 위도 경도 좌표 출력
          // 지정된 좌표에 마커 표시
          const marker = new kakao.maps.Marker({
            map: map,
            position: coords,
          });
          // 좌표에 데이터(축제이름) 받아와서 마커에 표시
          const infowindow = new kakao.maps.InfoWindow({
            content: `<div style="width:150px;text-align:center;padding:6px 0;">${this.fesInfo.f_name}</div>`,
          });
          // 지도의 마커 위치에 정보창을 열고 지도 중심을 축제 장소 좌표로 설정합니다
          infowindow.open(map, marker);

          map.setCenter(coords);
        }
      });
    },
    async getFesImg() {
      let result = await axios
        .get(`/api/festival/selectAllImg/${this.searchNo}`)
        .catch((err) => console.log(err));

      this.fesImgs = result.data;
    },

    async getFesProdlList(prod_code) {
      const result = await axios
        .get(`/api/festival/fesInProduct/${prod_code}`)
        .catch((err) => console.log(err));
      this.fesProduct = result.data;
    },
  },
};
</script>

<style scoped>
#map {
  width: 1300px;
  height: 400px;
}

.button-group {
  margin: 10px 0px;
}

button {
  margin: 0 3px;
}

#content {
  margin-bottom: 100px;
}

#prod {
  display: flex;
  margin: 10px;
}

#text {
  margin-top: 30px;
  margin-left: 50px;
  font-size: 18px;
}

#subImg {
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  margin: 10px;
  margin-bottom: 100px;
}

#subImg img {
  flex: 0 0 auto;
  margin-right: 10px;
  max-width: 300px;
  max-height: 300px;
}

body {
  margin: 0;
  height: 100%;
  background-image: linear-gradient(to top, #d9afd9 0%, #97d9e1 100%);
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}

.link {
  font-family: "Amatic SC", cursive;
  text-align: center;
}

.description {
  font-size: 20px;
}

.btn {
  border: none;
  display: block;
  text-align: center;
  cursor: pointer;
  text-transform: uppercase;
  outline: none;
  overflow: hidden;
  position: relative;
  color: #fff;
  font-weight: 700;
  font-size: 10px;
  background-color: #222;
  padding: 17px 60px;
  margin: 0 auto;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.btn span {
  position: relative;
  z-index: 1;
}

.btn:after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  height: 490%;
  width: 140%;
  background: #78c7d2;
  -webkit-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-transform: translateX(-98%) translateY(-25%) rotate(45deg);
  transform: translateX(-98%) translateY(-25%) rotate(45deg);
}

.btn:hover:after {
  -webkit-transform: translateX(-9%) translateY(-25%) rotate(45deg);
  transform: translateX(-9%) translateY(-25%) rotate(45deg);
}

.link {
  font-size: 20px;
  margin-top: 30px;
}

.link a {
  color: #000;
  font-size: 25px;
}

a {
  text-decoration: none;
  font-size: 5px;
}
</style>
