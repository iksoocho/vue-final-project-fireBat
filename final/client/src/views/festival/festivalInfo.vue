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
      <a href="https://map.kakao.com/link/to/수성빛예술제,35.8285058585979,128.621168696627" target="_blank">길찾기</a>
      <div>
          <div id="map"></div>
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

          },
      }
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=915cffed372954b7b44804ed422b9cf0";
      document.head.appendChild(script);
    }
  },
  

  created() {
  this.searchNo = this.$route.query.f_code;   // 페이지요청은 router  페이지가 열릴때는 route
  this.getFesInfo();
 },
  methods : {
    
      async getFesInfo() {
          let result = await axios.get(`/api/festival/${this.searchNo}`) 
                            .catch(err => console.log(err));
          this.fesInfo = result.data;    // .data 데이터가 보내준 값을 받음
          
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
      //  methods 안에서 카카오 지도 api 부분
      initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(35.8690295, 128.5932375),
        level: 5,
      };

      this.map = new kakao.maps.Map(container, options);
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