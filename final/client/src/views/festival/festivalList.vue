<template>
    <fieldset>
        <legend class="search">
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

            <div class="searchLoc">
                <!-- 지역 카테고리 -->
                <select name="searchLoc" id="searchLoc" title="지역"></select>
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
                </div>

            <div class="searchCate">
                <!-- 테마 카테고리 -->
                <select name="searchCate" id="searchCate"></select>
                <option value="불빛">불빛</option>
                <option value="문화예술">문화예술</option>
                <option value="연인">연인</option>
                <option value="관광">관광</option>
            </div>
        </legend>
    </fieldset>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return{
            festlvalList : []
        };
    },
    created() {
        this.getfestlvalList();
    },
    methods : {
        async getfestlvalList(){
            this.festlvalList = (await axios.get('/festival')
                                .catch(err => console.log(err))).data; 
    }
}
}
</script>

