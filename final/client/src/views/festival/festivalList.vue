<template>
    <div class="container text-center">
        <div class="row row-cols-auto">
            <div class="col">
                <div class="searchDate">
                
                <!-- 월별 카테고리 -->
                    <select name="searchDate" id="searchDate" title="시기">
                        <option value>시기</option>
                        <option value="01">1월</option>
                        <option value="02">2월</option>
                        <option value="03">3월</option>
                        <option value="04">4월</option>
                        <option value="05">5월</option>
                        <option value="06">6월</option>
                        <option value="07">7월</option>
                        <option value="08">8월</option>
                        <option value="09">9월</option>
                        <option value="10">10월</option>
                        <option value="11">11월</option>
                        <option value="12">12월</option>
                    </select>
                </div>
            </div>

            <div class="col">
                <div class="searchLoc">
                <!-- 지역 카테고리 -->
                    <select name="searchLoc" id="searchLoc" title="지역">
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
                </div>
            </div>

            <div class="col">
                <div class="searchCate">
                <!-- 테마 카테고리 -->
                    <select name="searchCate" id="searchCate">
                        <option value="불빛">불빛</option>
                        <option value="문화예술">문화예술</option>
                        <option value="연인">연인</option>
                        <option value="관광">관광</option>
                    </select>
                </div>
            </div> 
        </div>

        
        <!-- 축제 리스트 -->
        
    <div class="container">
        <div class="row">
        <div v-for="(fes, i) in festivalList" :key="i" class="col-md-3 mb-4" @click="goFesInfo(fes.f_code)">
            <div class="card">
                <img src="../../image/logo/로고.png" class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title">{{ fes.f_name }} </h5>
                <!-- <p class="card-text">{{ fes.f_content }}</p> -->
                <p class="card-date">{{ getDateFormat(fes.f_firstday) }} ~ {{ getDateFormat(fes.f_lastday) }}</p>
                <p class="card-reg">{{ fes.f_reg }}</p>
                <!-- <a href="#" class="btn btn-primary">축제 상세페이지</a>
                <button class="btn btn-xs btn-info" @click="goToUpdate(fes.f_code)">수정</button> -->

            </div>
            </div>
        </div>
        </div>
    </div>
    </div>

</template>

<script>
import axios from 'axios';

export default {
    data(){
        return {
            festivalList : [],
        }
    },
    created(){
        this.getFestivalList(); 
    },
    methods : {
        async getFestivalList(){
            this.festivalList = (await axios.get('/api/festival')
                                .catch(err => console.log(err))).data; 
        },
        getDateFormat(date){
            return this.$dateFormat(date);   // 날짜 변환
        },
        goToUpdate(f_code) {
            this.$router.push({path : '/festivalUpdate', query:{f_code : f_code}})
        },
        goFesInfo(f_code){
            this.$router.push({path : '/festivalInfo', query:{f_code : f_code}})
        },
        goFesInfoList(f_code){
            this.$router.push({path : '/festivalInfoList', query:{f_code : f_code}})
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
    }
}
</script>

<style>

</style>
