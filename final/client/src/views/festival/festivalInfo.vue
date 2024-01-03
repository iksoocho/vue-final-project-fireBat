<template>
    <div class="container">
  
        <div class="row">
            <div class="container text-center">
                <div class="row">
                    <div class="col-sm-8">상품이미지 들어갈 곳</div>  
                        <div class="col-sm-4">
                            <tr>
                                <th>📅 {{ getDateFormat(fesInfo.f_firstday) }} ~ {{ getDateFormat(fesInfo.f_lastday) }}</th>
                            </tr>
                            <br>
  
                            <tr>
                                <th>📢 {{ fesInfo.f_loc }}</th>
                            </tr>
                            <br>
  
                            <tr>
                                <th>🎫 {{ fesInfo.f_price }}</th>
                            </tr>
                            <br>
  
                            <tr>
                                <th>📞 {{ fesInfo.f_number }}</th>
                            </tr>
                            <br>
                            
                            <tr>
                              <a :href="fesInfo.f_url">공식홈페이지</a>
                            </tr>
                        </div>    
                </div>
            </div>
        </div>
        <br>
        <br>
        <div>
            <tr>
                <th>{{ fesInfo.f_content }}</th>
            </tr>
        </div>
        <hr>
        <h2>길찾기</h2>
        <a :href="kakaoMapLink" target="_blank">길찾기</a>
        <a :href="a" target="_blank">로드뷰</a>
        <div>
      <!-- 이 곳에 지도가 표시될 영역 -->
      <div id="map" style="width: 100%; height: 400px;"></div>
    </div>
        <hr>
   
    </div>
    <!-- 얘들은 나중에 관리자페이지 상품전체리스트 게시판으로 갈 예정 -->
  
  </template>
  <script>
  import axios from 'axios';
  
  export default {
    data() {       
        return {
            searchNo : '',
            fesInfo: {
                f_loc: '35.8285058585979,128.621168696627',
            },
        }
    },
    computed: {
    kakaoMapLink() {
    //   const destinationCoordinates = '35.8285058585979,128.621168696627';
    //   return `https://map.kakao.com/link/to/${encodeURIComponent(this.fesInfo.f_loc)},${destinationCoordinates}`
    const f_loc = this.fesInfo.f_loc;
    const encodedFloc = encodeURIComponent(f_loc);

const kakaoLink = `https://map.kakao.com/link/search/${encodedFloc}`;

    console.log(kakaoLink); // 생성된 카카오 링크 출력

    return kakaoLink; // 생성된 카카오 링크 반환

    },
  },
    mounted() {

    },

    created() {
    this.searchNo = this.$route.query.f_code;   // 페이지요청은 router  페이지가 열릴때는 route
    this.getFesInfo();
   },
    methods : {
        async getFesInfo() {
          //   let result = await axios.get(`/api/festival/${this.searchNo}`) 
          //                     .catch(err => console.log(err));
          //   this.fesInfo = result.data;    // .data 데이터가 보내준 값을 받음
            try {
              let response = await axios.get(`/api/festival/${this.searchNo}`);
              this.fesInfo = response.data;
              this.initializeMap();
           } catch (err) {
              console.log(err);
           }
            
        },
        goFesUpdate(f_code){
                this.$router.push({path : '/festivalUpdate', query:{f_code : f_code}})
    },
    async fesDelete(f_code){
                let result = await axios.delete(`/api/festival/delete/${f_code}`)
                                      .catch(err=>console.log(err));
                console.log(result.data);
                let count = result.data.affectedRows;   
                if(count == 0){
                    alert('정상적으로 삭제되지 않았습니다.')
                }else{
                    alert('정상적으로 삭제 되었습니다.')
                    this.$router.push({name : 'festivalList'});
                }
            },
            getDateFormat(date){
            return this.$dateFormat(date);   // 날짜 변환
        },
        
        // 카카오맵 API 지도
        initializeMap() {
            // ID가 'map'인 HTML 요소를 검색하여 변수에 할당 mapContainer.
           const mapContainer = document.getElementById('map');
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
                 const coords = new kakao.maps.LatLng(result[0].y, result[0].x);  // 지오코딩 조건문 값을 위도 경도 좌표 출력
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
 
  },
    }
  

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
  </style>