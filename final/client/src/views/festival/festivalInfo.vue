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
            <div id="map" style="width: 100%; height: 400px;"></div>
        </div>
        <hr>

    </div>
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
        initializeMap() {
           const mapContainer = document.getElementById('map');
           const mapOption = {
              center: new kakao.maps.LatLng(33.450701, 126.570667),
              level: 5,
           };
           const map = new kakao.maps.Map(mapContainer, mapOption);
  
           const geocoder = new kakao.maps.services.Geocoder();
           const address = this.fesInfo.f_loc;
  
           geocoder.addressSearch(address, (result, status) => {
              if (status === kakao.maps.services.Status.OK) {
                 const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
  
                 const marker = new kakao.maps.Marker({
                    map: map,
                    position: coords,
                 });
  
                 const infowindow = new kakao.maps.InfoWindow({
                    content: `<div style="width:150px;text-align:center;padding:6px 0;">${this.fesInfo.f_name}</div>`,
                 });
  
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